import type { SVGProps } from "react";
import { Map } from "lucide-react";

export function RoamFlowLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <Map className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg text-foreground">RoamFlow</span>
    </div>
  );
}
