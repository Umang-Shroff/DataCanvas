export interface DataCanvasNode {
  id: string;
  title: string;
  color: string;
  subItems: string[];
}

export interface DataCanvasEdge {
  id: string;
  source: string;
  target: string;
}

export interface Sheet {
  id: string;
  name: string;
  nodes: any[];
  edges: any[];
}
