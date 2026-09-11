import { notFound } from "next/navigation";
import config from "@/../prompts.config";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  // The bundled API/self-hosting docs contain upstream package names, domains,
  // repository links and product-specific instructions. Keep the runtime APIs
  // intact, but do not expose those upstream docs in the white-label product.
  if (config.homepage?.useCloneBranding) {
    notFound();
  }

  return children;
}
