import Vue from 'vue';
import Vuex from 'vuex';
import { firebase, auth } from '@/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {}
	},
	mutations: {
		setUser(state, userData) {
			state.user = userData;
		}
	},
	actions: {
		async signInWithGoogle({ commit }) {
			const provider = new firebase.auth.GoogleAuthProvider();
			const result = await auth.signInWithPopup(provider);

			if (result.user) {
				const { displayName, photoURL, uid } = result.user;

				commit('setUser', {
					id: uid,
					name: displayName,
					avatar: photoURL
				});
			}
		}
	}
});
