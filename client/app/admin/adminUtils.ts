import type { Flower } from "@/src/types/api";
import { adminTokenKey, rememberedAdminLoginKey } from "./adminConfig";

export function notifyTokenChange() {
  window.dispatchEvent(new Event("bloomistry-admin-token-change"));
}

export function notifyRememberedLoginChange() {
  window.dispatchEvent(new Event("bloomistry-admin-remembered-login-change"));
}

export function subscribeToTokenChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("bloomistry-admin-token-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bloomistry-admin-token-change", callback);
  };
}

export function subscribeToRememberedLoginChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("bloomistry-admin-remembered-login-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bloomistry-admin-remembered-login-change", callback);
  };
}

export function getStoredToken() {
  return window.localStorage.getItem(adminTokenKey);
}

export function getServerTokenSnapshot() {
  return null;
}

export function getStoredRememberedLoginSnapshot() {
  return window.localStorage.getItem(rememberedAdminLoginKey) ?? "";
}

export function getServerRememberedLoginSnapshot() {
  return "";
}

export function getFlowerCategorySlug(flower: Flower) {
  return typeof flower.category === "object" ? flower.category.slug : "";
}

export function getFlowerCategoryName(flower: Flower) {
  return typeof flower.category === "object" ? flower.category.name : "Uncategorized";
}
