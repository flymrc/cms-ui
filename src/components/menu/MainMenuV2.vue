<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Expand, Fold, HomeFilled } from "@element-plus/icons-vue";
import { Quit, Home } from "@/icons";
import { rawRouter } from "@/router";
import MainMenuV2ItemComponentVue from "./MainMenuV2Item.vue";
import type { RootRouterBase } from "@/router/raw";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { UserFilled } from "@element-plus/icons-vue";

const props = defineProps<{
  modelCollapse?: boolean;
  router: RootRouterBase;
}>();

defineEmits(["update:modelCollapse"]);

const router = useRouter();
const defaultActive = computed(() => {
  const cur = props.router.currentRecord().name;
  console.log(cur);
  return cur;
});
const lable = computed(() => {
  return props.router.label;
});

const menuItems = computed(() =>
  props.router.children
);

const storeText = computed(() => {
  return "storeText";
});

const onSelectStore = () => {
};

const onLogout = () => {
  ElMessageBox.confirm("ログアウトしますがよろしいでしょうか？", "", {
    confirmButtonText: "OK",
    cancelButtonText: "キャンセル",
    type: "warning",
  }).then(() => {
    doLogout();
  });
};

const doLogout = () => {
};
</script>

<template>
  <div class="container" :class="$props.modelCollapse ? 'collapse' : ''">
    <div class="item text" data-role="title">
      <h1>CMS</h1>
    </div>
    <div class="item text" data-role="version">
      <h4>version 0.0.1</h4>
    </div>
    <ElDivider style="margin: 0"></ElDivider>
    <div class="item list">
      <ElScrollbar>
        <el-menu
          :default-active="defaultActive"
          :collapse="$props.modelCollapse"
        >
        <MainMenuV2ItemComponentVue v-for="item in menuItems" :item="item"></MainMenuV2ItemComponentVue>
        </el-menu>
      </ElScrollbar>
    </div>
    <ElDivider style="margin: 0"></ElDivider>
    <div class="item text left" data-role="footer">
      <el-row>
        <IconButton
          :title="$props.modelCollapse ? undefined : storeText"
          @click="onSelectStore"
        >
          <Home></Home>
        </IconButton>
      </el-row>
      <el-row>
        <IconButton title="operator_name">
          <el-icon>
            <UserFilled />
          </el-icon>
        </IconButton>
      </el-row>
      <el-row>
        <IconButton
          :title="$props.modelCollapse ? undefined : 'ログアウト'"
          @click="onLogout"
        >
          <Quit></Quit>
        </IconButton>
      </el-row>
    </div>
    <IconButton
      class="side-button"
      @click="$emit('update:modelCollapse', !$props.modelCollapse)"
    >
      <Fold v-if="$props.modelCollapse"></Fold>
      <Expand v-else></Expand>
    </IconButton>
  </div>
</template>

<style lang="scss" scoped>
$collapse-delay: 0.3s;

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  & .side-button {
    position: absolute;
    left: 0;
    top: 12px;
  }

  & > .item {
    color: white;
    overflow: hidden;

    &[data-role="title"] {
      margin-top: 8px;
      transition:
        margin-top linear $collapse-delay,
        font-size linear $collapse-delay;
    }

    &[data-role="version"] {
      height: 24px;
      transition: height linear $collapse-delay;
    }

    &.text {
      display: flex;
      justify-content: center;
      align-items: center;
      word-break: keep-all;

      &.left {
        justify-content: flex-start;
        padding-left: 24px;
      }
    }

    &.list {
      flex-grow: 1;
    }

    &[data-role="footer"] {
      // margin-bottom: 12px;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-height: 100px;

      & > .el-row {
        padding: 0.35em 0;
      }
    }
  }

  &.collapse {
    & > .item[data-role="title"] {
      margin-top: 40px;
      font-size: 12px;
    }

    & > .item[data-role="version"] {
      height: 0;
    }
  }
}
</style>
