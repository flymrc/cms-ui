<script setup lang="ts">
const status = "waitting-init"
</script>

<template>
  <div
    v-if="status != 'inited'"
    class="full"
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
  >
    <el-text style="color: #b1dfeb">{{ $t("initing") }}...</el-text>
    <el-progress
      :percentage="100"
      :stroke-width="15"
      status=""
      :indeterminate="true"
      style="width: 50%"
      striped
      :show-text="false"
      striped-flow
      :duration="15"
    >
    </el-progress>
  </div>
  <RouterView v-else></RouterView>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  background: linear-gradient(#3c869b, #24b7da);
}
</style>

<style lang="scss">
.ep-error {
  display: flex;
  align-items: center;
  justify-content: center;

  & .frame {
    width: 400px;
    height: 100px;
    background-color: #ffffffd0;
    border-radius: 8px;

    // border: 2px solid var(--el-color-danger);
    color: var(--el-color-error-dark-2);
    box-shadow: 0 0 12px var(--el-color-danger-light-5);

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
