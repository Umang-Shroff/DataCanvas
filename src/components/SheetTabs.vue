<script setup lang="ts">
import { useGraphStore } from "../stores/graphStore";

const store = useGraphStore();

function createSheet() {
  const name = prompt("Sheet name?");
  if (name) store.createSheet(name);
}
</script>

<template>
  <div class="flex items-center gap-2 px-2 h-full overflow-x-auto">
    <button
      v-for="sheet in Object.values(store.sheets)"
      :key="sheet.id"
      @click="store.switchSheet(sheet.id)"
      class="px-3 py-1 rounded text-sm"
      :class="
        sheet.id === store.activeSheetId
          ? 'bg-blue-600 text-white'
          : 'bg-zinc-800 text-zinc-300'
      "
    >
      {{ sheet.name }}
    </button>

    <button @click="createSheet" class="px-3 py-1 bg-zinc-700 rounded text-sm">
      + New
    </button>
  </div>
</template>
