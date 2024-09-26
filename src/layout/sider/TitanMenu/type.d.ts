import { type VNode } from "vue";
export interface TitanMenuItemType {
  key: string;
  label: string;
  icon?: () => VNode;
  children?: TitanMenuItemType[];
}
