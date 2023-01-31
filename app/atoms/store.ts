import { createStore } from "jotai";

import { critDamageAtom, critRateAtom } from "./calculator";
import { characterSearchAtom } from "./characterSearch";

const jotaiStore = createStore();

// Calculator atoms
jotaiStore.set(critRateAtom, 0);
jotaiStore.set(critDamageAtom, 0);

// Character search atoms
jotaiStore.set(characterSearchAtom, "");

export { jotaiStore };
