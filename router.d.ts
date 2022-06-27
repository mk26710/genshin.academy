export {};

import type { Component } from "vue";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    name?: string;
    icon?: string | Component;
    navbar?: boolean;
  }
}
