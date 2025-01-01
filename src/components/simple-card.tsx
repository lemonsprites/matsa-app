import { CardTitle } from "@/components/ui/card";
import React from "react";

interface SimpleCardProps {
  title: string;
  count: number;
  onClick?: () => void;
}

const SimpleCard: React.FC<SimpleCardProps> = ({ title, count, onClick }) => {
  return (
    <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
      <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
        <CardTitle>{title}</CardTitle>
      </div>
      <div className="flex">
        <button
          onClick={onClick}
          className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
        >
          <span className="text-lg font-bold leading-none sm:text-3xl">
            {count}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SimpleCard;
