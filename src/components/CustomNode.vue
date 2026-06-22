<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import type { NodeProps } from "@vue-flow/core";

import type { CanvasNodeData } from "../types/graph";

const props = defineProps<NodeProps<CanvasNodeData>>();
</script>

<template>
  <div
    class="min-w-[220px] rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900"
  >
    <Handle type="target" :position="Position.Left" />

    <div
      class="px-3 py-2 font-semibold text-white"
      :style="{
        backgroundColor: props.data.color,
      }"
    >
      {{ props.data.title }}
    </div>

    <div class="p-3 text-sm text-zinc-300">
      <div v-for="item in props.data.subItems" :key="item">• {{ item }}</div>
    </div>

    <Handle type="source" :position="Position.Right" />
  </div>
</template>
