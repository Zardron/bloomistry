import HomeClient from "./HomeClient";
import type { ApiListResponse, Category, Flower, Testimonial } from "@/src/types/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isLocalApiUrl(url: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/api\/v1\/?$/i.test(url);
}

function getApiBaseUrls() {
  const urls = [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/v1` : "",
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/v1`
      : "",
    process.env.NODE_ENV === "production" ? "https://bloomistry.vercel.app/api/v1" : "",
    process.env.NEXT_PUBLIC_API_URL && !isLocalApiUrl(process.env.NEXT_PUBLIC_API_URL)
      ? process.env.NEXT_PUBLIC_API_URL
      : "",
  ].filter(Boolean);

  if (urls.length > 0) {
    return Array.from(new Set(urls));
  }

  if (process.env.VERCEL_URL) {
    return [`https://${process.env.VERCEL_URL}/api/v1`];
  }

  return [process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1"];
}

async function getCatalogResource<T>(path: string) {
  let lastError = "Could not load catalog";

  for (const apiBaseUrl of getApiBaseUrls()) {
    try {
      const response = await fetch(`${apiBaseUrl}${path}`, {
        cache: "no-store",
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok || payload?.success === false) {
        lastError = payload?.message ?? "Could not load catalog";
        continue;
      }

      return payload as T;
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Could not load catalog";
    }
  }

  throw new Error(lastError);
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
