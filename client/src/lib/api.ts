const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";

function isLocalApiUrl(url: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/api\/v1\/?$/i.test(url);
}

function getApiBaseUrl() {
  if (typeof window === "undefined") {
    return configuredApiBaseUrl;
  }

  const isLocalPage = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (!isLocalPage && isLocalApiUrl(configuredApiBaseUrl)) {
    return "/api/v1";
  }

  return configuredApiBaseUrl;
}

type RequestOptions = RequestInit & {
  token?: string | null;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const apiBaseUrl = getApiBaseUrl();
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message ?? "Request failed");
  }

  return payload as T;
}

export function getApiAssetUrl(path?: string) {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  const apiBaseUrl = getApiBaseUrl();

  if (apiBaseUrl.startsWith("/")) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  const apiOrigin = new URL(apiBaseUrl).origin;
  return `${apiOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function toFormData(values: Record<string, unknown>, image?: File | null) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      formData.set(key, value.join(","));
      return;
    }

    formData.set(key, String(value));
  });

  if (image) {
    formData.set("image", image);
  }

  return formData;
}
