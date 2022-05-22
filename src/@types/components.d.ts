import MainContainer from "@/components/MainContainer.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MainContainer: MainContainer;
  }
}
