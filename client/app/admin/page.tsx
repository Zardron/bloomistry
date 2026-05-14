"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import { apiRequest, toFormData } from "@/src/lib/api";
import type {
  ApiItemResponse,
  ApiListResponse,
  Category,
  Flower,
  Testimonial,
  User,
} from "@/src/types/api";
import { adminSections, adminTokenKey, rememberedAdminLoginKey } from "./adminConfig";
import type { Section } from "./adminTypes";
import {
  getFlowerCategorySlug,
  getServerRememberedLoginSnapshot,
  getServerTokenSnapshot,
  getStoredRememberedLoginSnapshot,
  getStoredToken,
  notifyRememberedLoginChange,
  notifyTokenChange,
  subscribeToRememberedLoginChange,
  subscribeToTokenChange,
} from "./adminUtils";
import { AdminSidebar } from "./components/AdminSidebar";
import {
  CategoryRows,
  FeaturedRows,
  FlowerRows,
  ListHeader,
  TestimonialRows,
} from "./components/AdminLists";
import { CategoryForm, FlowerForm, TestimonialForm } from "./components/AdminForms";
import { DashboardHeader } from "./components/DashboardHeader";
import { FeaturedSummary } from "./components/FeaturedSummary";
import { LoginScreen } from "./components/LoginScreen";

type LoginResponse = {
  success: true;
  data: {
    token: string;
    user: User;
  };
};

type RememberedAdminLogin = {
  email: string;
  password: string;
  remember: boolean;
};

function AdminDashboardLoading() {
  return (
    <div className="mt-5 grid gap-5 lg:mt-7 xl:grid-cols-[360px_minmax(0,1fr)] 2xl:grid-cols-[380px_minmax(0,1fr)]">
      <div className="border border-[#d9c385]/55 bg-white p-4 sm:p-5">
        <div className="h-8 w-40 animate-pulse bg-[#f4eefb]" />
        <div className="mt-6 grid gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="grid gap-2">
              <div className="h-4 w-24 animate-pulse bg-[#f4eefb]" />
              <div className="h-12 animate-pulse border border-[#dfd2ea] bg-[#fbf8ff]" />
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-0 overflow-hidden border border-[#d9c385]/55 bg-white">
        <div className="border-b border-[#d9c385]/45 px-4 py-4 sm:px-5">
          <div className="h-5 w-44 animate-pulse bg-[#f4eefb]" />
        </div>
        <div className="grid divide-y divide-[#d9c385]/35">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-3 p-4 sm:gap-4">
              <div className="h-20 w-20 shrink-0 animate-pulse border border-[#dfd2ea] bg-[#fbf8ff] sm:h-28 sm:w-28" />
              <div className="flex flex-1 flex-col justify-center">
                <div className="h-7 w-2/3 animate-pulse bg-[#f4eefb]" />
                <div className="mt-3 h-4 w-1/2 animate-pulse bg-[#fbf8ff]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminLoadingOverlay({ label }: { label: string }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#fbf8ff]/75 px-5 backdrop-blur-sm">
      <div className="w-full max-w-xs border border-[#d9c385]/60 bg-white p-6 text-center shadow-xl shadow-[#77669d]/10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a98739]">
          Bloomistry admin
        </p>
        <p className="mt-3 font-serif text-3xl text-[#67558a]">{label}</p>
        <div className="mx-auto mt-5 flex w-24 justify-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#77669d]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#d1ad51] [animation-delay:150ms]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#77669d] [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function formatPriceLabel(startPrice: FormDataEntryValue | null, lastPrice: FormDataEntryValue | null) {
  const normalize = (value: FormDataEntryValue | null) =>
    String(value ?? "")
      .replace(/[^\d.]/g, "")
      .trim();
  const start = normalize(startPrice);
  const last = normalize(lastPrice);

  return start && last ? `PHP ${start} - PHP ${last}` : "";
}

export default function AdminPage() {
  const token = useSyncExternalStore(
    subscribeToTokenChange,
    getStoredToken,
    getServerTokenSnapshot,
  );
  const rememberedLoginSnapshot = useSyncExternalStore(
    subscribeToRememberedLoginChange,
    getStoredRememberedLoginSnapshot,
    getServerRememberedLoginSnapshot,
  );
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("flowers");
  const [activeFlowerCategorySlug, setActiveFlowerCategorySlug] = useState("custom");
  const [categories, setCategories] = useState<Category[]>([]);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [customers, setCustomers] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedDashboard, setHasLoadedDashboard] = useState(false);

  const stats = useMemo(
    () => [
      { label: "Flowers", value: flowers.length },
      { label: "Categories", value: categories.length },
      { label: "Customers", value: customers.length },
    ],
    [categories.length, flowers.length, customers.length],
  );
  const activeSectionLabel =
    adminSections.find((section) => section.key === activeSection)?.label ?? "Dashboard";
  const editingCategory = categories.find((category) => category._id === editingId);
  const editingFlower = flowers.find((flower) => flower._id === editingId);
  const editingCustomer = customers.find((customer) => customer._id === editingId);
  const activeFlowerCategory =
    categories.find((category) => category.slug === activeFlowerCategorySlug) ?? categories[0];
  const filteredFlowers = activeFlowerCategory
    ? flowers.filter((flower) => getFlowerCategorySlug(flower) === activeFlowerCategory.slug)
    : flowers;
  const featuredFlowers = flowers.filter((flower) => flower.isFeatured);
  const isDashboardBooting = Boolean(token && !hasLoadedDashboard);
  const rememberedLogin = useMemo<RememberedAdminLogin>(() => {
    if (!rememberedLoginSnapshot) {
      return { email: "", password: "", remember: false };
    }

    try {
      const parsedLogin = JSON.parse(rememberedLoginSnapshot) as Partial<RememberedAdminLogin>;
      if (typeof parsedLogin.email !== "string" || typeof parsedLogin.password !== "string") {
        return { email: "", password: "", remember: false };
      }

      return {
        email: parsedLogin.email,
        password: parsedLogin.password,
        remember: true,
      };
    } catch {
      return { email: "", password: "", remember: false };
    }
  }, [rememberedLoginSnapshot]);

  const refreshData = useCallback(async (authToken: string) => {
    if (!authToken) return;

    setIsLoading(true);
    try {
      const [me, categoryList, flowerList, testimonialList] = await Promise.all([
        apiRequest<ApiItemResponse<"user", User>>("/auth/me", { token: authToken }),
        apiRequest<ApiListResponse<"categories", Category>>("/categories?limit=100", {
          token: authToken,
        }),
        apiRequest<ApiListResponse<"flowers", Flower>>("/flowers?limit=100", {
          token: authToken,
        }),
        apiRequest<ApiListResponse<"testimonials", Testimonial>>("/customers?limit=100", {
          token: authToken,
        }),
      ]);

      setUser(me.data.user);
      setCategories(categoryList.data.categories);
      setFlowers(flowerList.data.flowers);
      setCustomers(testimonialList.data.testimonials);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load dashboard data");
    } finally {
      setHasLoadedDashboard(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const timeoutId = window.setTimeout(() => {
      void refreshData(token);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refreshData, token]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const shouldRemember = form.get("rememberMe") === "on";

    setIsLoading(true);
    setMessage("");
    try {
      const response = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (shouldRemember) {
        window.localStorage.setItem(
          rememberedAdminLoginKey,
          JSON.stringify({ email, password }),
        );
      } else {
        window.localStorage.removeItem(rememberedAdminLoginKey);
      }
      notifyRememberedLoginChange();

      window.localStorage.setItem(adminTokenKey, response.data.token);
      notifyTokenChange();
      setUser(response.data.user);
      setHasLoadedDashboard(false);
      setMessage("Welcome back to Bloomistry.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function submit(
    path: string,
    body: BodyInit,
    successMessage: string,
    method: "POST" | "PATCH" = "POST",
  ) {
    if (!token) return false;

    setIsLoading(true);
    setMessage("");
    try {
      await apiRequest(path, { method, body, token });
      setMessage(successMessage);
      setEditingId(null);
      await refreshData(token);
      return true;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCategorySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const didSave = await submit(
      editingId ? `/categories/${editingId}` : "/categories",
      JSON.stringify({
        name: form.get("name"),
        description: form.get("description"),
        priceLabel: formatPriceLabel(form.get("startPrice"), form.get("lastPrice")),
        isActive: form.get("isActive") === "on",
      }),
      "Category saved",
      editingId ? "PATCH" : "POST",
    );
    if (didSave && formElement.isConnected) {
      formElement.reset();
    }
  }

  async function handleFlowerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const image = form.get("image");

    const didSave = await submit(
      editingId ? `/flowers/${editingId}` : "/flowers",
      toFormData(
        {
          name: form.get("name"),
          description: form.get("description"),
          price: form.get("price"),
          category: form.get("category"),
          tags: form.get("tags"),
          isFeatured: form.get("isFeatured") === "on",
          isActive: form.get("isActive") === "on",
        },
        image instanceof File && image.size > 0 ? image : null,
      ),
      "Flower saved",
      editingId ? "PATCH" : "POST",
    );
    if (didSave && formElement.isConnected) {
      formElement.reset();
    }
  }

  async function handleTestimonialSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const image = form.get("image");

    const didSave = await submit(
      editingId ? `/customers/${editingId}` : "/customers",
      toFormData(
        {
          customerName:
            editingCustomer?.customerName ||
            `Customer Moment #${String(customers.length + 1).padStart(2, "0")}`,
          isActive: form.get("isActive") === "on",
        },
        image instanceof File && image.size > 0 ? image : null,
      ),
      "Customer saved",
      editingId ? "PATCH" : "POST",
    );
    if (didSave && formElement.isConnected) {
      formElement.reset();
    }
  }

  async function removeItem(section: Exclude<Section, "featured">, id: string) {
    if (!token) return;

    setIsLoading(true);
    setMessage("");
    try {
      await apiRequest(`/${section}/${id}`, { method: "DELETE", token });
      setMessage("Item deleted");
      await refreshData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function setFeaturedFlower(selectedFlower: Flower) {
    if (!token) return;

    setIsLoading(true);
    setMessage("");
    try {
      const updates = flowers
        .filter((flower) => flower.isFeatured && flower._id !== selectedFlower._id)
        .map((flower) =>
          apiRequest(`/flowers/${flower._id}`, {
            method: "PATCH",
            body: JSON.stringify({ isFeatured: false }),
            token,
          }),
        );

      updates.push(
        apiRequest(`/flowers/${selectedFlower._id}`, {
          method: "PATCH",
          body: JSON.stringify({ isFeatured: true }),
          token,
        }),
      );

      await Promise.all(updates);
      setMessage(`${selectedFlower.name} is now featured`);
      await refreshData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update featured flower");
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFeaturedFlower(selectedFlower: Flower) {
    if (!token) return;

    setIsLoading(true);
    setMessage("");
    try {
      await apiRequest(`/flowers/${selectedFlower._id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFeatured: false }),
        token,
      });
      setMessage(`${selectedFlower.name} removed from featured`);
      await refreshData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update featured flower");
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    window.localStorage.removeItem(adminTokenKey);
    notifyTokenChange();
    setUser(null);
    setHasLoadedDashboard(false);
  }

  function changeSection(section: Section) {
    setActiveSection(section);
    setEditingId(null);
  }

  if (!token) {
    return (
      <LoginScreen
        rememberedLogin={rememberedLogin}
        isLoading={isLoading}
        message={message}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <main className="min-h-dvh bg-[#fbf8ff] text-[#332b3d] lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <AdminSidebar
        sections={adminSections}
        activeSection={activeSection}
        stats={stats}
        featuredCount={featuredFlowers.length}
        userEmail={user?.email}
        onSectionChange={changeSection}
        onLogout={logout}
      />

      <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
        <DashboardHeader title={activeSectionLabel} stats={stats} />

        {message ? (
          <p className="mt-5 border border-[#d9c385]/55 bg-[#fffdf7] px-4 py-3 text-sm font-semibold text-[#a98739]">
            {message}
          </p>
        ) : null}

        {isDashboardBooting ? (
          <AdminDashboardLoading />
        ) : (
        <div className="mt-5 grid gap-5 lg:mt-7 xl:grid-cols-[360px_minmax(0,1fr)] 2xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className="border border-[#d9c385]/55 bg-white p-4 sm:p-5 xl:sticky xl:top-6 xl:max-h-[calc(100dvh-3rem)] xl:overflow-auto">
            {activeSection === "categories" ? (
              <CategoryForm
                key={editingId ?? "new-category"}
                category={editingCategory}
                onCancel={() => setEditingId(null)}
                onSubmit={handleCategorySubmit}
                isLoading={isLoading}
              />
            ) : null}
            {activeSection === "flowers" ? (
              <FlowerForm
                key={editingId ?? "new-flower"}
                categories={categories}
                flower={editingFlower}
                onCancel={() => setEditingId(null)}
                onSubmit={handleFlowerSubmit}
                isLoading={isLoading}
              />
            ) : null}
            {activeSection === "featured" ? (
              <FeaturedSummary
                featuredFlowers={featuredFlowers}
                onRemove={removeFeaturedFlower}
                isLoading={isLoading}
              />
            ) : null}
            {activeSection === "customers" ? (
              <TestimonialForm
                key={editingId ?? "new-customer"}
                testimonial={editingCustomer}
                onCancel={() => setEditingId(null)}
                onSubmit={handleTestimonialSubmit}
                isLoading={isLoading}
              />
            ) : null}
          </div>

          <div className="min-w-0 overflow-hidden border border-[#d9c385]/55 bg-white">
            <ListHeader
              activeSection={activeSection}
              activeSectionLabel={activeSectionLabel}
              activeFlowerCategory={activeFlowerCategory}
              categories={categories}
              flowers={flowers}
              onCategoryChange={setActiveFlowerCategorySlug}
            />
            <div className="grid divide-y divide-[#d9c385]/35">
              {activeSection === "categories" ? (
                <CategoryRows
                  categories={categories}
                  onEdit={setEditingId}
                  onDelete={(id) => removeItem("categories", id)}
                />
              ) : null}
              {activeSection === "flowers" ? (
                <FlowerRows
                  flowers={filteredFlowers}
                  onEdit={setEditingId}
                  onDelete={(id) => removeItem("flowers", id)}
                />
              ) : null}
              {activeSection === "featured" ? (
                <FeaturedRows
                  flowers={flowers}
                  isLoading={isLoading}
                  onSetFeatured={setFeaturedFlower}
                  onRemoveFeatured={removeFeaturedFlower}
                />
              ) : null}
              {activeSection === "customers" ? (
                <TestimonialRows
                  testimonials={customers}
                  onEdit={setEditingId}
                  onDelete={(id) => removeItem("customers", id)}
                />
              ) : null}
            </div>
          </div>
        </div>
        )}
      </section>

      {isLoading && hasLoadedDashboard ? <AdminLoadingOverlay label="Updating" /> : null}
    </main>
  );
}
