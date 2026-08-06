// Curated set of premium gradients used as product "renders" instead of stock photos.
export const GRADIENTS = [
  "linear-gradient(135deg,#0b1d3a 0%,#1c2c52 45%,#3a4a7a 100%)",
  "linear-gradient(135deg,#1a1a1d 0%,#2c2c31 50%,#46464c 100%)",
  "linear-gradient(135deg,#b9975a 0%,#e8d3a4 55%,#f3e6c8 100%)",
  "linear-gradient(135deg,#e9e9ec 0%,#ffffff 50%,#d8d8de 100%)",
  "linear-gradient(135deg,#1c3f3a 0%,#2f6b5e 55%,#5fae94 100%)",
  "linear-gradient(135deg,#2a1f3d 0%,#4b3468 50%,#7a5aa0 100%)",
  "linear-gradient(135deg,#1d2b3a 0%,#33495e 50%,#5c7a94 100%)",
  "linear-gradient(135deg,#3a1d24 0%,#66313d 50%,#a15a67 100%)",
];

export function gradientFor(seed: number) {
  return GRADIENTS[seed % GRADIENTS.length];
}
