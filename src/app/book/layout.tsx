import { notFound } from "next/navigation";
import { BookSidebar } from "@/components/book/sidebar";
import config from "@/../prompts.config";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The bundled book carries upstream author/project identity. Keep it available
  // for non-clone deployments, but do not expose it from the white-label product.
  if (config.homepage?.useCloneBranding) {
    notFound();
  }

  return (
    <div className="container py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <BookSidebar />
        <div className="flex-1 min-w-0 lg:mr-64">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
