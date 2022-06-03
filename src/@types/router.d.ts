import { Component } from "vue";
import "vue-router";

export {};

declare module "vue-router" {
  interface RouteMeta {
    /** Determine if the view should use it's fullPath as a :key value to enforce rerendering */
    dynamicKey?: boolean;
    navigation?: {
      name: string;
      icon: Component;
    };
  }
}
