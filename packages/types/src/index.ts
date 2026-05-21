import { type PluginObject } from "vue";
import _Vue from "vue";
import { MessageBox } from "element-ui";

export default function createTypePlugin(): PluginObject<{}> {
  return {
    install: () => {},
  };
}

type MessageBoxOption = Parameters<typeof MessageBox>[0];
type MessageBoxReturn = ReturnType<typeof MessageBox>;

declare function createMessageBox(option?: MessageBoxOption): MessageBoxReturn;

declare module "vue/types/vue" {
  interface Vue {
    createMessageBox: typeof createMessageBox;
  }
  interface VueConstructor {}
}
