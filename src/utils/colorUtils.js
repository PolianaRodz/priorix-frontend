export function getRandomGradient() {
  const h1 = Math.floor(Math.random() * 360);
  const h2 = (h1 + 40 + Math.floor(Math.random() * 50)) % 360;
  const s = 75 + Math.floor(Math.random() * 20);
  const l = 45 + Math.floor(Math.random() * 15);

  return `linear-gradient(135deg, hsl(${h1}, ${s}%, ${l}%), hsl(${h2}, ${s}%, ${l}%))`;
}
