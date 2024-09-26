<template>
  <span
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  ></span>
</template>
<script lang="ts" setup>
//@ts-nocheck
import Iconify from "@purge-icons/generated";
import {
  CSSProperties,
  computed,
  nextTick,
  onMounted,
  ref,
  unref,
  watch,
} from "vue";

defineOptions({ name: "Icon" });

const props = withDefaults(
  defineProps<{
    // icon name
    icon: string;
    // icon color
    color?: string;
    // icon size
    size?: number | string;
    spin?: boolean;
    prefix?: string;
  }>(),
  { size: 16 }
);

const elRef = ref(null);

const getIconRef = computed(
  () => `${props.prefix ? props.prefix + ":" : ""}${props.icon}`
);

const update = async () => {
  const el: any = unref(elRef);
  if (!el) return;

  await nextTick();
  const icon = unref(getIconRef);
  if (!icon) return;

  const svg = Iconify.renderSVG(icon, {});
  if (svg) {
    el.textContent = "";
    el.appendChild(svg);
  } else {
    const span = document.createElement("span");
    span.className = "iconify";
    span.dataset.icon = icon;
    el.textContent = "";
    el.appendChild(span);
  }
};

const getWrapStyle = computed((): CSSProperties => {
  const { size, color } = props;
  let fs = size;
  if (typeof size === "string") {
    fs = parseInt(size, 10);
  }

  return {
    fontSize: `${fs}px`,
    color: color,
    display: "inline-flex",
    // transform: 'translateY(2px)',
  };
});

watch(() => props.icon, update, { flush: "post" });

onMounted(update);
</script>
<style lang="less">
.app-iconify {
  display: inline-block;
  &-spin {
    svg {
      animation: loadingCircle 1s infinite linear;
    }
  }
}

span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  border-radius: 100%;
  background-color: #5551;
}
</style>
