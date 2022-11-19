import type { ComponentProps } from "react";

interface OverviewIconProps {
  as: (arg: ComponentProps<"svg"> & Record<string, unknown>) => JSX.Element;
}

export const OverviewIcon = ({ as: Icon }: OverviewIconProps) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-400 bg-gray-200">
      <Icon className="h-5 w-5 fill-gray-800" />
    </div>
  );
};
