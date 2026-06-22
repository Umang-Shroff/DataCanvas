import { defineStore } from "pinia";
import type { Edge, Node } from "@vue-flow/core";
import { triggerAutosave } from "../services/autoSave";
import type { CanvasNode, CanvasEdge } from "../types/graph";

export interface Sheet {
  id: string;
  name: string;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

export const useGraphStore = defineStore("graph", {
  state: () => ({
    activeSheetId: "default",
    selectedNodeId: null as string | null,
    selectedEdgeId: null as string | null,

    sheets: {
      default: {
        id: "default",
        name: "Default Sheet",
        nodes: [],
        edges: [],
      },
    } as Record<string, Sheet>,
  }),

  getters: {
    activeSheet(state): Sheet {
      return state.sheets[state.activeSheetId];
    },

    selectedNode(): Node | null {
      if (!this.selectedNodeId) return null;

      return (
        this.activeSheet.nodes.find((n) => n.id === this.selectedNodeId) ?? null
      );
    },

    selectedEdge(): CanvasEdge | null {
      if (!this.selectedEdgeId) return null;

      return (
        this.activeSheet.edges.find((e) => e.id === this.selectedEdgeId) ?? null
      );
    },
  },

  actions: {
    createSheet(name: string) {
      const id = crypto.randomUUID();

      this.sheets[id] = {
        id,
        name,
        nodes: [],
        edges: [],
      };

      this.activeSheetId = id;
    },

    switchSheet(id: string) {
      if (this.sheets[id]) {
        this.activeSheetId = id;
        triggerAutosave();
      }
    },

    addNode(node: CanvasNode) {
      this.sheets[this.activeSheetId].nodes.push(node);
      triggerAutosave();
    },

    addEdge(edge: CanvasEdge) {
      this.sheets[this.activeSheetId].edges.push(edge);
      triggerAutosave();
    },

    selectNode(id: string | null) {
      this.selectedNodeId = id;
    },

    updateSelectedNode(title: string, color: string, subItems: string[]) {
      if (!this.selectedNode) return;

      this.selectedNode.data = {
        title,
        color,
        subItems,
      };

      triggerAutosave();
    },

    deleteSelectedNode() {
      if (!this.selectedNodeId) return;

      const nodeId = this.selectedNodeId;

      const sheet = this.sheets[this.activeSheetId];

      sheet.nodes = sheet.nodes.filter((node) => node.id !== nodeId);

      sheet.edges = sheet.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      );

      this.selectedNodeId = null;

      triggerAutosave();
    },

    addConnection(source: string, target: string) {
      const sheet = this.sheets[this.activeSheetId];

      const exists = sheet.edges.some(
        (edge) => edge.source === source && edge.target === target,
      );

      if (exists) {
        return;
      }

      sheet.edges.push({
        id: crypto.randomUUID(),
        source,
        target,
      });

      triggerAutosave();
    },

    selectEdge(id: string | null) {
      this.selectedEdgeId = id;
    },

    deleteSelectedEdge() {
      if (!this.selectedEdgeId) return;

      const sheet = this.sheets[this.activeSheetId];

      sheet.edges = sheet.edges.filter(
        (edge) => edge.id !== this.selectedEdgeId,
      );

      this.selectedEdgeId = null;

      triggerAutosave();
    },
  },
});
