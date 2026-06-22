import type { Edge, Node } from "@vue-flow/core";

export interface CanvasNodeData {
  title: string;
  color: string;
  subItems: string[];
}

export type CanvasNode = Node<CanvasNodeData>;
export type CanvasEdge = Edge;
