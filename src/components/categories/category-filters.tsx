"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = ["newest", "oldest", "most_upvoted", "most_contributors"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

interface CategoryFiltersProps {
  categorySlug: string;
  showSort?: boolean;
}

export function CategoryFilters({ categorySlug, showSort = true }: CategoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("categories");

  const currentSort = (searchParams?.get("sort") as SortOption) || "newest";
  const currentSearch = searchParams?.get("q") || "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/categories/${categorySlug}?${params.toString()}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateParams("q", e.currentTarget.value);
    }
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== currentSearch) {
      updateParams("q", e.currentTarget.value);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${showSort ? "flex-1 md:flex-none" : "w-full"}`}>
      <div className={`relative flex-1 ${showSort ? "md:flex-none" : "w-full"}`}>
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-2.5" />
        <Input
          type="search"
          placeholder={t("searchPlaceholder")}
          defaultValue={currentSearch}
          onKeyDown={handleSearchKeyDown}
          onBlur={handleSearchBlur}
          className={`${showSort ? "md:w-[180px]" : "w-full md:w-[360px]"} h-10 pl-8 text-sm rtl:pl-3 rtl:pr-8`}
        />
      </div>
      {showSort && (
        <Select value={currentSort} onValueChange={(value) => updateParams("sort", value)}>
          <SelectTrigger size="sm" className="h-10 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {t(`sort.${option}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
