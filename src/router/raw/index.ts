import {
  RawRouterBase,
  RouterRecord,
  RouterClass,
  type RouterRecordParams,
} from "./route-item";
import { useRoute, useRouter } from "vue-router";

export abstract class RootRouterBase extends RawRouterBase {
  get name(): string {
    return this.label;
  }

  pathToRouter(path: string, ignoreHidden?: boolean) {
    ignoreHidden = ignoreHidden ?? true;
    // ignore first pathname, that is [home], no need to search
    const paths = path.split("/").slice(2);

    let cur: RawRouterBase = this;
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i];
      const c = cur!.children.find(
        (it) => it.path === p && it.showable === ignoreHidden
      );
      if (c == undefined) return cur;
      cur = c;
    }

    return cur;
  }

  currentRecord(ignoreHidden?: boolean) {
    return this.pathToRouter(useRouter().currentRoute.value.path, ignoreHidden);
  }
}

@RouterClass
export class RootRawRoute extends RootRouterBase {
  label = "op";
  protected params = {
    path: "[root]",
  };

  // @RouterRecord("Setting")
  // viewSetting = new Setting()
}

export const rawRouter = new RootRawRoute();
export { RawRouterBase };
