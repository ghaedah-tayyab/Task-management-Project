const palette = [
  { left: "border-l-purple-500", top: "border-t-purple-500", badge: "bg-purple-100 text-purple-700" },
  { left: "border-l-amber-500",  top: "border-t-amber-500",  badge: "bg-amber-100 text-amber-700" },
  { left: "border-l-green-500",  top: "border-t-green-500",  badge: "bg-green-100 text-green-700" },
  { left: "border-l-rose-500",   top: "border-t-rose-500",   badge: "bg-rose-100 text-rose-700" },
  { left: "border-l-cyan-500",   top: "border-t-cyan-500",   badge: "bg-cyan-100 text-cyan-700" },
];

export const getStatusStyle = (index) => palette[index % palette.length];