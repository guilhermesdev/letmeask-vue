<template>
	<aside class="screen-aside flex-6">
		<figure>
			<img
				:src="illustration"
				alt="Imagem ilustrando fluxo de perguntas e
			respostas"
			/>
		</figure>
		<h1 class="color-pure-white text-3">Toda pergunta tem uma resposta.</h1>
		<p class="text-2 mt-1">
			Aprenda e compartilhe conhecimento com outras pessoas
		</p>
	</aside>
</template>

<script>
import illustrationSvg from '@/assets/images/illustration.svg';

export default {
	name: 'ScreenAside',
	computed: {
		illustration: () => illustrationSvg
	}
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.screen-aside {
	// flex: 7;

	background: $color-primary;
	color: $color-bg;

	display: flex;
	flex-direction: column;
	justify-content: center;

	padding: #{'min(120px, 4%)'} 80px;

	@media (max-width: 1000px) {
		display: none;
	}

	img {
		max-width: 320px;
	}

	strong {
		font: 700 36px 'Poppins', sans-serif;
		line-height: 42px;
		margin-top: 16px;
	}

	p {
		font-size: 24px;
		line-height: 32px;
		margin-top: 16px;
		color: #f8f8f8;
	}
}
</style>
