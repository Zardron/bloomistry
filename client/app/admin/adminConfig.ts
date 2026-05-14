import type { Section } from "./adminTypes";

export const adminTokenKey = "bloomistry_admin_token";

export const adminSections: Array<{ key: Section; label: string }> = [
  { key: "flowers", label: "Flowers" },
  { key: "featured", label: "Featured" },
  { key: "categories", label: "Categories" },
  { key: "customers", label: "Customers" },
];
