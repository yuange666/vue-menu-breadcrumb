import Vue from 'vue'
import Vuex from 'vuex'
import module1 from './modules/module1';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        module1,
    },
    state: {
        selectedTree:{
            id:null,
            treeName:null
        }
    },
    mutations: {
        SetSelectedTree(state,val){
            let bool = val.id===state.selectedTree.id;
            state.selectedTree = bool?{
                id:null,
                treeName:null
            }:val;
        },
    },
    actions: {}
})
