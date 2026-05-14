import type { Flower } from "@/src/types/api";
import { adminTokenKey } from "./adminConfig";

export function notifyTokenChange() {
  window.dispatchEvent(new Event("bloomistry-admin-token-change"));
}

export function subscribeToTokenChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("bloomistry-admin-token-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bloomistry-admin-token-change", callback);
  };
}

export function getStoredToken() {
  return window.localStorage.getItem(adminTokenKey);
}

export function getServerTokenSnapshot() {
  return null;
}

export function getFlowerCategorySlug(flower: Flower) {
  return typeof flower.category === "object" ? flower.category.slug : "";
}

export function getFlowerCategoryName(flower: Flower) {
  return typeof flower.category === "object" ? flower.category.name : "Uncategorized";
}
