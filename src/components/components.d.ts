import MainContainer from "./MainContainer.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MainContainer: typeof MainContainer;
  }
}
