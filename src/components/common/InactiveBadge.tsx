import { cn } from "../../lib/utils";

type ActiveBadgeProps = {
  rounded?: boolean;
  type: "active" | "verified";
};

const InactiveBadge: React.FC<ActiveBadgeProps> = ({ rounded = false,type }) => {
  return (
    <div
      className={cn(
        "bg-red-100 w-[150px]  h-8  items-center px-3 rounded flex justify-center",
        rounded && "rounded-[100px] p-2 w-auto"
      )}
    >
      <span className="text-xs text-danger-500 font-medium">
      {type === "active" ? "Inactive" : "Unverified"}
      </span>
    </div>
  );
};

export default InactiveBadge;
