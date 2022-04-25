import {InjectionKey} from "vue";
import {createStore, Store, useStore as baseUseStore} from "vuex";

export function useStore() {
    return baseUseStore(key);
}

export interface State {
    resin: {
        current: number;
        target: number;
    }
}

export const key: InjectionKey<Store<State>> = Symbol();

const state: State = {
    resin: {
        current: 0,
        target: 160
    }
}

export const mutations = {}

export const store = createStore<State>({
    state,
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
});