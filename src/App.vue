<script setup lang="ts">
import GraphCanvas from "./components/GraphCanvas.vue";
import SheetTabs from "./components/SheetTabs.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="h-screen flex flex-col bg-zinc-950 text-white">
    <div class="h-12 border-b border-zinc-800">
      <SheetTabs />
    </div>

    <div class="flex flex-1">
      <div class="flex-1">
        <GraphCanvas />
      </div>

      <Sidebar />
    </div>
  </div>
</template>
