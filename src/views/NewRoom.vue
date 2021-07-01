<template>
	<div class="fullheight screenheight flex items-stratch">
		<ScreenAside />
		<main class="flex flex-8 items-center justify-center px-3">
			<div class="flex items-stretch flex-column fullwidth max-w-80">
				<Logo class="mb-4 self-center" />
				<form @submit.prevent="handleCreateRoom" class="flex flex-column">
					<h2 class="self-center mb-2 text-2">Criar uma nova sala</h2>
					<input
						type="text"
						placeholder="Digite o código da sala"
						v-model.trim="newRoom"
					/>
					<CButton type="submit" primary class="mt-2">Criar sala</CButton>
					<small class="pt-2 color-gray-dark"
						>Quer entrar em uma sala já existente?
						<router-link to="/">Clique aqui</router-link>
					</small>
				</form>
			</div>
		</main>
	</div>
</template>

<script>
import ScreenAside from '@/components/ScreenAside';
import CButton from '@/components/CButton';
import Logo from '@/components/Logo';
import logoSvg from '@/assets/images/logo.svg';

import { mapState } from 'vuex';

import { db } from '@/firebase';

export default {
	name: 'NewRoom',
	data() {
		return {
			newRoom: ''
		};
	},
	components: {
		ScreenAside,
		CButton,
		Logo
	},
	computed: {
		...mapState(['user']),
		logoImg: () => logoSvg
	},
	methods: {
		async handleCreateRoom() {
			if (!this.newRoom) return;

			const roomRef = db.ref('rooms');

			const firebaseRoom = await roomRef.push({
				title: this.newRoom,
				authorId: this.user.id
			});

			this.$router.push(`/rooms/${firebaseRoom.key}`);
		}
	}
};
</script>
