export const PageBackground = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-white">
    <div className="absolute inset-0" style={{
      background: "radial-gradient(ellipse 70% 50% at 95% 5%, rgba(41,171,226,0.22) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 5% 95%, rgba(61,61,61,0.12) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(41,171,226,0.10) 0%, transparent 60%)"
    }} />
    <div className="absolute inset-0" style={{
      backgroundImage: "linear-gradient(to right, rgba(41,171,226,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(41,171,226,0.06) 1px, transparent 1px)",
      backgroundSize: "6rem 4rem"
    }} />
  </div>
);
