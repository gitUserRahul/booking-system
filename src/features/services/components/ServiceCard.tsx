import Rating from "../../../shared/components/Rating";

const ServiceCard = ({ serviceItem }: ServiceCardProps) => {
  const {
    rating,
    durationMinutes,
    currency,
    price,
    provider,
    category,
    description,
    name,
    id,
  } = serviceItem;

  return (
    <div
      className="group flex text-center flex-col font-rose text-qualityContent font-bold relative"
      key={id}
    >
      <div className="grid gap-2 py-3.5">
        <span className="flex flex-row justify-center">
          <Rating rate={rating} />
        </span>
        <span className="border rounded-sm w-auto">{category}</span>
        <span className="leading-exploreOrder">{name}</span>
        <p className="text-sm text-black-500">{description}</p>
        {provider && (
          <span className="text-sm text-black-500">
            Provided by: {provider.name}
          </span>
        )}
        <span>{durationMinutes} mins</span>
        <span>
          {currency} {price}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
