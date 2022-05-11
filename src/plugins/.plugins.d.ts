import dayjs from "dayjs";

// looks like webstorm wants runtime-core
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
  }
}
