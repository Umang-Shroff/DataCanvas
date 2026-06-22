<script>
import GraphCanvas from "./components/GraphCanvas.vue";
import SheetTabs from "./components/SheetTabs.vue";
</script>

<template>
  <div class="h-screen flex flex-col bg-zinc-950 text-white">
    <!-- Top bar -->
    <div class="h-12 border-b border-zinc-800">
      <SheetTabs />
    </div>

    <!-- Main canvas -->
    <div class="flex-1">
      <GraphCanvas />
    </div>
  </div>
</template>
