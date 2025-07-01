import { ref } from "vue";

const collpased = ref(false);

export function useAppStore() {
  return { collpased };
}
