import { useGraphStore } from "../stores/graphStore";
import { get, set } from "idb-keyval";

const STORAGE_KEY = "datacanvas-project";

export async function saveProject() {
  const store = useGraphStore();

  const data = {
    activeSheetId: store.activeSheetId,
    sheets: store.sheets,
  };

  await set(STORAGE_KEY, data);
}

export async function loadProject() {
  const store = useGraphStore();

  const data = await get(STORAGE_KEY);

  if (!data) return;

  store.activeSheetId = data.activeSheetId;
  store.sheets = data.sheets;
}
