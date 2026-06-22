import { defineStore } from "pinia";
import type { Edge, Node } from "@vue-flow/core";
import { triggerAutosave } from "../services/autoSave";

export interface Sheet {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

export const useGraphStore = defineStore("graph", {
  state: () => ({
    activeSheetId: "default",

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

    addNode(node: Node) {
      this.activeSheet.nodes.push(node);
      triggerAutosave();
    },

    addEdge(edge: Edge) {
      this.activeSheet.edges.push(edge);
      triggerAutosave();
    },
  },
});
