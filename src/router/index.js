import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NewRoom from '@/views/NewRoom.vue';
import AdminRoom from '@/views/AdminRoom.vue';
import Room from '@/views/Room.vue';
import store from '@/store';
import { auth, db } from '@/firebase';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/rooms/new',
		name: 'NewRoom',
		component: NewRoom,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/rooms/:id',
		name: 'Room',
		component: Room
	},
	{
		path: '/admin/rooms/:id',
		name: 'AdminRoom',
		component: AdminRoom,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

async function userIsAdmin(roomId) {
	const authorRef = await db.ref(`rooms/${roomId}/authorId`).once('value');
	const authorId = authorRef.val();

	return store.state.user.id === authorId;
}

router.beforeEach(async (to, _, next) => {
	const userIsDefined = !!store.state.user.id;

	if (!userIsDefined && auth.currentUser) {
		const { displayName, photoURL, uid } = auth.currentUser;
		store.commit('setUser', {
			id: uid,
			name: displayName,
			avatar: photoURL
		});
	}

	const isAdmin = await userIsAdmin(to.params.id);
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
	const requiresAdmin = to.matched.some(x => x.meta.requiresAdmin);

	const authOnly = !userIsDefined && requiresAuth;
	const adminOnly = authOnly && requiresAdmin && !isAdmin;

	if (adminOnly || authOnly) {
		next('/');
	} else if (isAdmin && to.name !== 'AdminRoom') {
		router.replace(`/admin/rooms/${to.params.id}`);
	} else {
		next();
	}
});

export default router;
