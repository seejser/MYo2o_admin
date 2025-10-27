import {saveLocalData,getLocalData} from '../../libs/utils';
import {ADMIN_USER_INFO} from '../mutationTypes';



// initial state
const state = {
	userInfo: getLocalData(ADMIN_USER_INFO) ? getLocalData(ADMIN_USER_INFO) : {},
};

// getters
const getters = {};

// actions
const actions = {
    setUser({state,commit},data){
        commit(ADMIN_USER_INFO, data);
        saveLocalData(ADMIN_USER_INFO, data);
    },
    clearUser({state,commit}){
        commit(ADMIN_USER_INFO, {});
        saveLocalData(ADMIN_USER_INFO, {});
    }
};

// mutations
const mutations = {
	[ADMIN_USER_INFO] (state, userInfo) {
        state.userInfo = userInfo;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
