import { defineStore } from "pinia";

export const useGraphStore = defineStore("graph", {
  state: () => ({
    activeSheet: "",
    sheets: [],
  }),
});
