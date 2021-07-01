<template>
	<button @click="copyRoomCodeToClipboard" class="room-code">
		<div>
			<img :src="copyImg" alt="Copiar código da sala" />
		</div>
		<span>Sala #{{ code }}</span>
	</button>
</template>

<script>
import copySVG from '@/assets/images/copy.svg';

export default {
	name: 'RoomCode',
	computed: {
		copyImg: () => copySVG
	},
	props: {
		code: {
			type: String,
			required: true
		}
	},
	methods: {
		copyRoomCodeToClipboard() {
			navigator.clipboard.writeText(this.code);
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.room-code {
	height: 40px;
	border-radius: 8px;
	overflow: hidden;

	background: #fff;
	border: 1px solid $color-primary;

	display: flex;

	div {
		height: 100%;
		background-color: $color-primary;
		padding: 0 12px;
		display: flex;
		justify-self: center;
		align-items: center;
	}

	span {
		display: block;
		align-self: center;
		flex: 1;
		padding: 0 16px;
	}
}
</style>
