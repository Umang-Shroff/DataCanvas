<script setup lang="ts">
import { computed, markRaw } from "vue";
import { VueFlow } from "@vue-flow/core";
import type { Connection } from "@vue-flow/core";

import { useGraphStore } from "../stores/graphStore";
import CustomNode from "./CustomNode.vue";

const store = useGraphStore();

const nodeTypes = {
  custom: markRaw(CustomNode),
};

function handleConnect(connection: Connection) {
  if (!connection.source || !connection.target) return;

  store.addConnection(connection.source, connection.target);
}

function handleNodeClick(event: any) {
  store.selectNode(event.node.id);
  store.selectEdge(null); // ✅ IMPORTANT: clear edge selection
}

function handleEdgeClick(event: any) {
  store.selectEdge(event.edge.id);
  store.selectNode(null); // ✅ IMPORTANT: clear node selection
}

function handlePaneClick() {
  store.selectNode(null);
  store.selectEdge(null); // ✅ clear everything on empty click
}

const nodes = computed({
  get: () => store.activeSheet.nodes,

  set: (value) => {
    store.sheets[store.activeSheetId].nodes = value;
  },
});

const edges = computed({
  get: () => store.activeSheet.edges,

  set: (value) => {
    store.sheets[store.activeSheetId].edges = value;
  },
});
</script>

<template>
  <VueFlow
    :node-types="nodeTypes"
    v-model:nodes="nodes"
    v-model:edges="edges"
    fit-view-on-init
    @node-click="handleNodeClick"
    @edge-click="handleEdgeClick"
    @pane-click="handlePaneClick"
    @connect="handleConnect"
  />
</template>
