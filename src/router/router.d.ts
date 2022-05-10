import { Component } from "vue";
import "vue-router";

export {};

declare module "vue-router" {
  interface RouteMeta {
    navigation?: {
      name: string;
      icon: Component;
    };
  }
}
