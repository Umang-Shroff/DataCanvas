<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import { useGraphStore } from "../stores/graphStore";

const store = useGraphStore();
</script>

<template>
  <VueFlow
    v-model:nodes="store.activeSheet.nodes"
    v-model:edges="store.activeSheet.edges"
    fit-view-on-init
  />
</template>
