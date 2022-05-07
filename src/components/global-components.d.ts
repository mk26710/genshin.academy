import MainContainer from "./base/MainContainer.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MainContainer: typeof MainContainer;
  }
}
