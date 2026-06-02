interface GradientDividerProps {
  fromColor: string;
  toColor: string;
  height?: number;
}
export const GradientDivider = ({ fromColor, toColor, height = 80 }: GradientDividerProps) => (
  <div style={{
    height: `${height}px`,
    background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
    width: "100%"
  }} />
);
