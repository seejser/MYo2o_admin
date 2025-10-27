import { createStore } from 'vuex'

import admin_user from './modules/admin_user.js';


export default createStore({
	modules: {
		admin_user,
    }
})
