import {defineStore, storeToRefs} from "pinia"

export const useCalculatorStore = defineStore({
    id: "CalculatorStore",
    state: () => {
        return {
            resin: {
                current: 0,
                needed: 160,
            }
        }
    },
})

export const useCalcStoreRefs = () => {
    return storeToRefs(useCalculatorStore())
}
