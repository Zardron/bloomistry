import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "../config/env.js";
import { connectDatabase, disconnectDatabase } from "../config/database.js";
import { Category } from "../models/category.model.js";
import { Flower } from "../models/flower.model.js";
import { Testimonial } from "../models/testimonial.model.js";
import { slugify } from "../utils/slugify.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const assetRoot = path.join(repoRoot, "client/app/assets/flowers");
const customerAssetRoot = path.join(repoRoot, "client/public/gallery/customers");
const uploadRoot = path.isAbsolute(env.uploadDir)
  ? env.uploadDir
  : path.join(repoRoot, "server", env.uploadDir);

const sections = [
  {
    title: "Custom",
    price: 0,
    priceLabel: "Price may vary by design",
    description:
      "Reference-inspired bouquets, money bouquets, chocolate wraps, and character-themed pieces.",
    sortOrder: 10,
    files: [
      "custom/1b8f4008-5274-4880-bed2-678731cbed1c.jpeg",
      "custom/a315ac6b-827f-4209-b730-f0ae6f6599b6.jpeg",
      "custom/d661edab-3c6e-4f3b-9095-dbeb1b6a081e.jpeg",
      "custom/e13736cc-5aec-486f-9590-f77de499bb93.jpeg",
      "custom/1e44a08a-e649-4830-ad02-4a2bbcceb158.jpeg",
      "custom/23604c95-4ca9-41d6-ad92-5cc9eef89177.jpeg",
      "custom/4e7d9f8c-4840-4dc1-ab8a-665447825171.jpeg",
      "custom/d9494130-7250-49ec-8425-1aa9552a6ac9.jpeg",
      "custom/1cdc9ed9-3606-4c00-be1a-14e1d7261b10.jpeg",
    ],
  },
  {
    title: "Graduation",
    price: 120,
    priceLabel: "PHP 120 - PHP 300",
    description: "Graduation-ready bouquets for ceremonies, photos, and congratulatory gifts.",
    sortOrder: 20,
    files: [
      "graduation/4b9b9ff2-cfcb-435c-a527-7cc1658e19f2.jpeg",
      "graduation/0f07d539-89b4-41db-9db0-53e1449f11dd.jpeg",
      "graduation/4f0a665a-d127-4e18-adce-fc339da6b494.jpeg",
      "graduation/29b64052-d421-4538-85e0-8eca2693788e.jpeg",
      "graduation/ee1f7176-95a4-4132-8c24-0f89fe89a7aa.jpeg",
      "graduation/6995be02-b174-4d15-bea4-02d1810f412d.jpeg",
    ],
  },
  {
    title: "Small",
    price: 50,
    priceLabel: "PHP 50 - PHP 120",
    description: "Compact bouquets and mini flower arrangements for simple gifts.",
    sortOrder: 30,
    files: [
      "small/d295c29b-6b00-4b2f-998d-353fbbad6a0b.jpeg",
      "small/48166219-aa68-4332-a04b-7f5450a654bd.jpeg",
      "small/6107ea80-823c-4233-816e-8235c8254d82.jpeg",
      "small/45b39846-3c3d-4f84-893e-5356e43a7806.jpeg",
      "small/81210d07-ae10-433f-a16d-776244b210aa.jpeg",
      "small/6edf65b9-35d8-4f6a-9470-dfc0319c958d.jpeg",
      "small/2d0cf1de-57d8-4a2a-b120-aaa71b4b7911.jpeg",
      "small/9f70f2f1-7472-46d0-a26c-1e6a1767a44e.jpeg",
      "small/635554028_3249230258584897_8078491129720463944_n.jpg",
      "small/633658773_3249230288584894_5845819109626465371_n.jpg",
    ],
  },
  {
    title: "Medium",
    price: 120,
    priceLabel: "PHP 120 - PHP 250",
    description: "Balanced handheld bouquets with fuller wrapping and flower details.",
    sortOrder: 40,
    files: [
      "medium/bf546554-535e-49b8-9596-8dfd8f005fee.jpeg",
      "medium/9fc1a7b2-d858-4988-a990-993689557af7.jpeg",
      "medium/1f57afe9-c134-478c-ad37-62ae45d594f4.jpeg",
      "medium/eaecc951-5d3e-4707-93bc-16ed8c156fc6.jpeg",
      "medium/0d9bf6bc-b603-4d69-92f9-52c7281ad137.jpeg",
      "medium/4113373e-09ed-40e8-9a60-790b36e30270.jpeg",
      "medium/95ed1fd7-9543-4146-bb72-5edfa68c19c3.jpeg",
      "medium/dc09f4b9-6b70-4197-aa84-83fba89e1e62.jpeg",
      "medium/9a146e4a-85aa-4348-a679-a4439439c873.jpeg",
      "medium/abeff337-6354-4e9d-ae58-c8e9976c163d.jpeg",
      "medium/676e7630-9253-41d5-bc8e-304c38181be5.jpeg",
      "medium/8fb53d23-2ab4-4291-ac12-1264a0808b1b.jpeg",
      "medium/b0b06f53-b87f-46aa-9426-9e161da5570f.jpeg",
    ],
  },
  {
    title: "Large",
    price: 250,
    priceLabel: "PHP 250 - PHP 450",
    description:
      "Statement bouquets with bigger blooms, layered wrapping, and fuller presentation.",
    sortOrder: 50,
    files: [
      "large/bf15da70-6c7a-43ea-a696-1ba30343c5e2 (1).jpeg",
      "large/813e3fe5-0913-4316-926a-154fb3eac4d6 (1).jpeg",
      "large/4097c56a-8e04-4b64-8d0d-a8a6c9e546bb (1).jpeg",
      "large/534da838-bcbe-4452-a5b3-8dd5890a8a3c (1).jpeg",
    ],
  },
  {
    title: "XL",
    price: 450,
    priceLabel: "PHP 450 - PHP 700",
    description: "Extra-full bouquets made for bigger, more dramatic gifting moments.",
    sortOrder: 60,
    files: [
      "xl/aca522e0-71be-461e-92ae-9db832e6c2cd.jpeg",
      "xl/ab46e1f5-ce21-469f-8561-0429fe78c65c.jpeg",
      "xl/fcc2afec-10a6-4f83-a2a3-07b7d5a53d2f.jpeg",
      "xl/6dc3d02f-982b-49f5-a26e-35bed111b92a.jpeg",
      "xl/197d874d-3c57-4d76-aced-46ba78574dda.jpeg",
      "xl/72adcff6-75ba-4b0c-9ca0-b6ce35e4e19f.jpeg",
      "xl/76bffc3c-3d41-49c0-b1f4-1eb01adef733.jpeg",
    ],
  },
];

function uploadName(relativeFile) {
  return `catalog-${relativeFile.replaceAll("/", "-")}`;
}

function customerUploadName(filename) {
  return `customer-${filename}`;
}

async function copyAsset(relativeFile) {
  const source = path.join(assetRoot, relativeFile);
  const filename = uploadName(relativeFile);
  const destination = path.join(uploadRoot, filename);

  await fs.copyFile(source, destination);

  return {
    url: `/uploads/${encodeURIComponent(filename)}`,
    filename,
  };
}

async function copyCustomerAsset(filename) {
  const source = path.join(customerAssetRoot, filename);
  const uploadFilename = customerUploadName(filename);
  const destination = path.join(uploadRoot, uploadFilename);

  await fs.copyFile(source, destination);

  return {
    url: `/uploads/${encodeURIComponent(uploadFilename)}`,
    filename: uploadFilename,
  };
}

async function seedCategory(section) {
  const slug = slugify(section.title);

  return Category.findOneAndUpdate(
    { slug },
    {
      name: section.title,
      slug,
      description: section.description,
      priceLabel: section.priceLabel,
      sortOrder: section.sortOrder,
      isActive: true,
    },
    { new: true, runValidators: true, upsert: true },
  );
}

async function seedFlower({ section, category, relativeFile, index }) {
  const number = String(index + 1).padStart(2, "0");
  const name = `${section.title} Flower #${number}`;
  const slug = slugify(name);
  const image = await copyAsset(relativeFile);

  return Flower.findOneAndUpdate(
    { slug },
    {
      name,
      slug,
      description: section.description,
      price: section.price,
      priceLabel: section.priceLabel,
      category: category._id,
      image,
      tags: [slugify(section.title), "fuzzy-wire", "bouquet"],
      isFeatured: section.title === "Custom" && index === 0,
      isActive: true,
    },
    { new: true, runValidators: true, upsert: true },
  );
}

async function seedCustomer(filename, index) {
  const number = String(index + 1).padStart(2, "0");
  const customerName = `Customer Moment #${number}`;
  const image = await copyCustomerAsset(filename);

  return Testimonial.findOneAndUpdate(
    { "image.filename": image.filename },
    {
      $set: {
        customerName,
        image,
        isActive: true,
      },
      $unset: {
        quote: "",
        rating: "",
        isFeatured: "",
      },
    },
    { new: true, runValidators: true, upsert: true },
  );
}

async function main() {
  await fs.mkdir(uploadRoot, { recursive: true });
  await connectDatabase();

  let flowerCount = 0;

  for (const section of sections) {
    const category = await seedCategory(section);

    for (const [index, relativeFile] of section.files.entries()) {
      await seedFlower({ section, category, relativeFile, index });
      flowerCount += 1;
    }
  }

  const customerFiles = (await fs.readdir(customerAssetRoot))
    .filter((filename) => /\.(jpe?g|png|webp)$/i.test(filename))
    .sort();

  for (const [index, filename] of customerFiles.entries()) {
    await seedCustomer(filename, index);
  }
  await Testimonial.collection.updateMany(
    {},
    { $unset: { quote: "", rating: "", isFeatured: "" } },
  );

  console.info(
    `Seeded ${sections.length} categories, ${flowerCount} flowers, and ${customerFiles.length} customers.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
