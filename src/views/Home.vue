<template>
	<div class="fullheight screenheight flex items-stratch">
		<ScreenAside />
		<main class="flex flex-8 items-center justify-center px-3">
			<div class="flex items-stretch flex-column fullwidth max-w-80">
				<Logo class="mb-4 self-center" />
				<form @submit.prevent="handleJoinRoom" class="flex flex-column">
					<CButton google @click.native="handleNewRoom" type="button">
						<img :src="googleLogo" alt="Logo do Google" />
						Crie sua sala com o Google
					</CButton>
					<small class="separator">ou entre em uma sala</small>
					<input
						type="text"
						placeholder="Digite o código da sala"
						v-model.trim="roomCode"
					/>
					<CButton type="submit" class="mt-2" primary>
						<img :src="loginIcon" alt="Ícone de login" />
						Entrar na sala
					</CButton>
				</form>
			</div>
		</main>
	</div>
</template>

<script>
import googleLogoSvg from '@/assets/images/google-icon.svg';
import loginSvg from '@/assets/images/login-icon.svg';
import ScreenAside from '@/components/ScreenAside';
import CButton from '@/components/CButton.vue';
import Logo from '@/components/Logo';
import { db } from '@/firebase';

export default {
	name: 'Home',
	data() {
		return {
			roomCode: ''
		};
	},
	components: {
		ScreenAside,
		CButton,
		Logo
	},
	computed: {
		googleLogo: () => googleLogoSvg,
		loginIcon: () => loginSvg
	},
	methods: {
		handleNewRoom() {
			if (this.$store.state.user.id) {
				this.$router.push('rooms/new');
			} else {
				this.$store.dispatch('signInWithGoogle');
				this.$router.push('rooms/new');
			}
		},
		async handleJoinRoom() {
			if (!this.roomCode) return;

			const roomRef = await db.ref(`rooms/${this.roomCode}`).get();

			if (!roomRef.exists()) {
				alert('Essa sala não existe!');
				return;
			}

			if (roomRef.val().endedAt) {
				alert('Essa sala já foi encerrada');
				return;
			}

			this.$router.push(`rooms/${this.roomCode}`);
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.separator {
	margin: 3rem 0;
	display: flex;
	font-size: 14px;
	color: $color-gray-medium;

	display: flex;
	align-items: center;

	&::before,
	&::after {
		content: '';
		flex: 1;
		height: 1px;
		background-color: $color-gray-medium;
	}

	&::before {
		margin-right: 1.5rem;
	}

	&::after {
		margin-left: 1.5rem;
	}
}
</style>
