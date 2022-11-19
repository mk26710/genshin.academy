import { StarIcon } from "@heroicons/react/20/solid";

interface RarityProps {
  rarity: number;
}

export const Rarity = ({ rarity }: RarityProps) => {
  return (
    <span className="flex flex-row gap-0  ">
      {Array.from({ length: rarity }, (_, i) => i).map((_, i) => (
        <StarIcon key={i} className="h-5 w-5 fill-orange-500" />
      ))}
    </span>
  );
};
