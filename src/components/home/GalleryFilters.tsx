import React from "react";

export type GalleryCategory = "all" | "couples" | "besties" | "y2k";

export interface GalleryFiltersProps {
  activeCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
}

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories: { id: GalleryCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "couples", label: "Couples" },
    { id: "besties", label: "Besties" },
    { id: "y2k", label: "Y2K Vibes" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 select-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`h-7 px-3.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
              isActive
                ? "bg-coral text-white shadow-xs hover:bg-coral-hover"
                : "bg-white/80 text-secondary-text border border-border-primary hover:text-coral hover:bg-blush-primary hover:border-coral/40"
            }`}
            aria-pressed={isActive}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
