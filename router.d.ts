export {};

import type { Component } from "vue";
import "vue-router";

// eslint-disable-next-line quotes
declare module "vue-router" {
  interface RouteMeta {
    name?: string;
    icon?: string | Component;
    navbar?: boolean;
  }
}
