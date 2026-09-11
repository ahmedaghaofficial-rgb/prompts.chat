import { notFound } from "next/navigation";
import config from "@/../prompts.config";

export default function PresentationLayout({ children }: { children: React.ReactNode }) {
  // This deck documents the upstream project's history and identity.
  if (config.homepage?.useCloneBranding) {
    notFound();
  }

  return children;
}
