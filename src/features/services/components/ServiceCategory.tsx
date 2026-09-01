interface Service {
  id: string;
  category: string;
}

interface ServiceFilterProps {
  services: Service[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function ServiceFilter({
  services,
  selectedCategory,
  onSelectCategory,
}: ServiceFilterProps) {
  const categories = Array.from(
    new Set(services.map((service) => service.category)),
  );

  const isAllActive = selectedCategory === null;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`px-4 py-2 rounded text-white transition-colors ${
          isAllActive ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => onSelectCategory(null)}
        aria-pressed={isAllActive}
      >
        All
      </button>
      {categories.map((category) => {
        const isActive = category === selectedCategory;
        return (
          <button
            key={category}
            className={`px-4 py-2 rounded text-white transition-colors ${
              isActive ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => onSelectCategory(isActive ? null : category)}
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
