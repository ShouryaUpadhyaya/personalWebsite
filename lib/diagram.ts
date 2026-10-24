export interface DiagramBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DiagramLayout {
  width: number;
  height: number;
  direction?: "horizontal" | "vertical";
  node: { w: number; h: number };
  frame?: { x: number; y: number; w: number; h: number };
  groups?: Record<string, { x: number; y: number; w: number; h: number }>;
  nodes: Record<string, [number, number]>;
}

export function edgePath(
  a: DiagramBox,
  b: DiagramBox,
  direction: "horizontal" | "vertical" = "horizontal",
): string {
  const acx = a.x + a.w / 2;
  const acy = a.y + a.h / 2;
  const bcx = b.x + b.w / 2;
  const bcy = b.y + b.h / 2;
  const dx = bcx - acx;
  const dy = bcy - acy;
  const sameColumn = Math.abs(dx) < a.w;
  const sameRow = Math.abs(dy) < a.h;
  const horizontal = direction === "horizontal" ? !sameColumn : sameRow;

  if (horizontal) {
    const sx = dx >= 0 ? a.x + a.w : a.x;
    const ex = dx >= 0 ? b.x : b.x + b.w;
    const mx = (sx + ex) / 2;
    return `M${sx} ${acy} C${mx} ${acy} ${mx} ${bcy} ${ex} ${bcy}`;
  }

  const sy = dy >= 0 ? a.y + a.h : a.y;
  const ey = dy >= 0 ? b.y : b.y + b.h;
  const my = (sy + ey) / 2;
  return `M${acx} ${sy} C${acx} ${my} ${bcx} ${my} ${bcx} ${ey}`;
}

export function boxFor(layout: DiagramLayout, id: string): DiagramBox {
  const [x, y] = layout.nodes[id];
  return { x, y, w: layout.node.w, h: layout.node.h };
}
