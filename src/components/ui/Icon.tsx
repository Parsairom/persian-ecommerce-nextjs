import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

export type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const Cmp = (icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  if (!Cmp) return null;
  return <Cmp {...props} />;
}
