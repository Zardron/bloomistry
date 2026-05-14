import HomeClient from "./HomeClient";
import type { ApiListResponse, Category, Flower, Testimonial } from "@/src/types/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

async function getCatalogResource<T>(path: string) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store",
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message ?? "Could not load catalog");
  }

  return payload as T;
}

export default async function Home() {
  let categories: Category[] = [];
  let flowers: Flower[] = [];
  let customers: Testimonial[] = [];
  let catalogError = "";

  try {
    const [categoryList, flowerList, customerList] = await Promise.all([
      getCatalogResource<ApiListResponse<"categories", Category>>(
        "/categories?limit=100&status=active",
      ),
      getCatalogResource<ApiListResponse<"flowers", Flower>>(
        "/flowers?limit=100&status=active",
      ),
      getCatalogResource<ApiListResponse<"testimonials", Testimonial>>(
        "/customers?limit=100&status=active",
      ),
    ]);

    categories = categoryList.data.categories;
    flowers = flowerList.data.flowers;
    customers = customerList.data.testimonials;
  } catch (error) {
    catalogError =
      error instanceof Error ? error.message : "Could not load catalog";
  }

  return (
    <HomeClient
      initialCategories={categories}
      initialFlowers={flowers}
      initialCustomers={customers}
      catalogError={catalogError}
    />
  );
}
