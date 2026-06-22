<script setup lang="ts">
import { ref, watch } from "vue";
import { useGraphStore } from "../stores/graphStore";

const store = useGraphStore();

const title = ref("");
const color = ref("#2563eb");
const subItemsText = ref("");

/**
 * Sync sidebar inputs with selected NODE only
 */
watch(
  () => store.selectedNode,
  (node) => {
    if (!node) {
      title.value = "";
      color.value = "#2563eb";
      subItemsText.value = "";
      return;
    }

    title.value = node.data.title;
    color.value = node.data.color;
    subItemsText.value = node.data.subItems.join("\n");
  },
  { immediate: true },
);

function parseSubItems() {
  return subItemsText.value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

/* ---------------- NODE ACTIONS ---------------- */

function createNode() {
  store.addNode({
    id: crypto.randomUUID(),
    type: "custom",
    position: {
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
    data: {
      title: title.value,
      color: color.value,
      subItems: parseSubItems(),
    },
  });

  title.value = "";
  color.value = "#2563eb";
  subItemsText.value = "";
}

function saveNode() {
  store.updateSelectedNode(title.value, color.value, parseSubItems());
}

/* ---------------- EDGE ACTIONS ---------------- */

function deleteEdge() {
  store.deleteSelectedEdge();
}

/* ---------------- STATE FLAGS ---------------- */

const isNodeSelected = () => !!store.selectedNode;
const isEdgeSelected = () => !!store.selectedEdgeId;
</script>

<template>
  <div
    class="w-80 h-full bg-zinc-900 border-l border-zinc-800 p-4 flex flex-col gap-4"
  >
    <!-- HEADER -->
    <h2 class="text-lg font-semibold">
      <span v-if="isEdgeSelected()">Edit Connection</span>
      <span v-else-if="isNodeSelected()">Edit Node</span>
      <span v-else>Create Node</span>
    </h2>

    <!-- EDGE MODE -->
    <template v-if="isEdgeSelected()">
      <div class="text-sm text-zinc-400">A connection is selected.</div>

      <button
        @click="deleteEdge"
        class="bg-red-600 hover:bg-red-700 rounded py-2"
      >
        Delete Connection
      </button>
    </template>

    <!-- NODE / CREATE MODE -->
    <template v-else>
      <!-- TITLE -->
      <div>
        <label class="text-sm text-zinc-400">Title</label>

        <input
          v-model="title"
          class="w-full mt-1 bg-zinc-800 rounded px-3 py-2"
        />
      </div>

      <!-- COLOR -->
      <div>
        <label class="text-sm text-zinc-400">Color</label>

        <input v-model="color" type="color" class="w-full h-10 mt-1" />
      </div>

      <!-- SUB ITEMS -->
      <div class="flex-1">
        <label class="text-sm text-zinc-400">Sub Items</label>

        <textarea
          v-model="subItemsText"
          class="w-full mt-1 h-48 bg-zinc-800 rounded px-3 py-2"
          placeholder="One item per line"
        />
      </div>

      <!-- ACTION BUTTONS -->
      <template v-if="!isNodeSelected()">
        <button
          @click="createNode"
          class="bg-blue-600 hover:bg-blue-700 rounded py-2"
        >
          Create Node
        </button>
      </template>

      <template v-else>
        <button
          @click="saveNode"
          class="bg-green-600 hover:bg-green-700 rounded py-2"
        >
          Save Changes
        </button>

        <button
          @click="store.deleteSelectedNode()"
          class="bg-red-600 hover:bg-red-700 rounded py-2"
        >
          Delete Node
        </button>
      </template>
    </template>
  </div>
</template>
