<template>
	<figure>
		<img :src="logoImg" alt="Logo do letmeask" />
	</figure>
</template>

<script>
import logoSvg from '@/assets/images/logo.svg';

export default {
	name: 'Logo',
	computed: {
		logoImg: () => logoSvg
	}
};
</script>
