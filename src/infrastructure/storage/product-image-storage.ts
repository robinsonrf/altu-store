import { getSupabaseBrowserClient } from "@/services";

const PRODUCTS_BUCKET = "products";

function normalizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
}

export function buildProductImagePath(params: {
  productId: string;
  fileName: string;
  variant?: string;
}) {
  const safeName = normalizeFileName(params.fileName);
  const stamp = Date.now();
  const variant = params.variant ? `${params.variant}/` : "";
  return `${params.productId}/${variant}${stamp}-${safeName}`;
}

export async function uploadProductImage(params: {
  productId: string;
  file: File;
  variant?: string;
}) {
  const supabase = getSupabaseBrowserClient();
  const path = buildProductImagePath({
    productId: params.productId,
    fileName: params.file.name,
    variant: params.variant,
  });

  const { data, error } = await supabase.storage
    .from(PRODUCTS_BUCKET)
    .upload(path, params.file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: params.file.type,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(PRODUCTS_BUCKET)
    .getPublicUrl(data.path);

  return {
    path: data.path,
    publicUrl: urlData.publicUrl,
  };
}
