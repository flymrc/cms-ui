<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
    title?: string;
    fontSize?: number;
  }>(),
  {
    size: 18,
    fontSize: 14,
  }
);

defineEmits(["click"]);
</script>

<template>
  <button @click="$emit('click')" class="button" type="button">
    <el-icon :size="$props.size">
      <slot></slot>
    </el-icon>
    <span
      :style="{ fontSize: $props.fontSize + 'px' }"
      v-if="$props.title != undefined"
      >{{ $props.title }}</span
    >
  </button>
</template>
<style scoped lang="scss">
.button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  & * {
    color: white;
    transition: color linear 0.1s;
  }

  &:hover * {
    color: rgb(211, 227, 240) !important;
  }

  & > span {
    margin-left: 8px;
  }
}
</style>
