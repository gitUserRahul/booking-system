import { Star, StarHalf } from "lucide-react";

const getStarIcon = (index: number, rate: number) => {
  if (rate >= index + 1) return <Star fill="currentColor" />;
  if (rate >= index + 0.5)
    return <StarHalf fill="currentColor" className="opacity-50" />;
  return <Star className="opacity-20" />;
};

const Rating = ({ rate }) => {
  return (
    <div className="flex item-center gap-2">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((index) => (
          <span className="black-yellow-500" key={index}>
            {getStarIcon(index, rate)}
          </span>
        ))}
      </div>

      {}
    </div>
  );
};

export default Rating;
