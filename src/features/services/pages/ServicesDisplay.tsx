import { useState } from "react";
import { useServices } from "../api/useServices.ts";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { ServiceFilter } from "../components/ServiceCategory";
import { Link } from "react-router-dom";

export function ServicesDisplay() {
  const { data, isLoading, isError, error } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  if (isLoading) {
    return <p>Loading services...</p>;
  }

  if (isError) {
    return <p>Failed to load services: {String(error)}</p>;
  }

  const filteredServices = (data ?? []).filter((service) => {
    const matchesCategory =
      !selectedCategory || service.category === selectedCategory;
    const matchesSearch = service.name
      .toLowerCase()
      .includes(debouncedSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col items-center min-h-screen py-2 gap-4">
      <h1 className="text-black-500 font-semibold text-xl pb-4">
        Our Services
      </h1>
      <input
        type="text"
        placeholder="Search services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-4"
      />
      <ServiceFilter
        services={data ?? []}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {filteredServices.length === 0 && (
        <p className="text-gray-500 text-lg">No services available.</p>
      )}
      <ul>
        {filteredServices.map((service) => (
          <li className="text-lg font-semibold" key={service.id}>
            <Link to={`/services/${service.id}`}>{service.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
