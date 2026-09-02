import { useParams } from "react-router-dom";
import { useServiceItem } from "../api/useServiceItem.ts";
import ServiceCard from "../components/ServiceCard";

export function SingleServicePage() {
  const { id } = useParams();

  const {
    data: serviceData,
    isLoading: isServiceLoading,
    isError: isServiceError,
    error: serviceError,
  } = useServiceItem(id ?? "");

  if (!id) {
    return <p>No service id provided.</p>;
  }

  if (isServiceLoading) {
    return <p>Loading service...</p>;
  }

  if (isServiceError) {
    return <p>Failed to load service: {String(serviceError)}</p>;
  }

  if (!serviceData) {
    return <p>Service not found.</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2 gap-4">
      <h1 className="text-black-500 font-semibold text-xl pb-4">
        Service Details
      </h1>
      <ServiceCard serviceItem={serviceData} />
    </div>
  );
}
