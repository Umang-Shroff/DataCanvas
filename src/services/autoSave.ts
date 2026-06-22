import { saveProject } from "./persistence";

let timeout: any = null;

export function triggerAutosave() {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    saveProject();
  }, 1000); // 1 second delay
}
