<template>
	<button class="button" :class="color" :style="{ height }">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'CButton',
	data() {
		return {
			color: {
				'button-primary': this.primary,
				'button-secondary': this.secondary,
				'button-danger': this.danger,
				outlined: this.outlined,
				'button-google': this.google
			}
		};
	},
	props: {
		primary: Boolean,
		secondary: Boolean,
		danger: Boolean,
		outlined: Boolean,
		google: Boolean,
		height: String
	}
};
</script>
<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_mixins.scss';

.button {
	height: 50px;
	border-radius: 8px;
	background: $color-black;

	display: flex;
	color: $color-details;
	font-weight: 500;
	justify-content: center;
	align-items: center;
	padding: 0 32px;
	border: 0;
	transition: 0.2s;

	&.button-primary {
		@include button-bg($color-primary, $color-primary-dark);
	}

	&.button-secondary {
		@include button-bg($color-secondary-light, $color-secondary-dark);
	}

	&.button-danger {
		@include button-bg($color-danger, $color-danger-dark);
	}

	&.button-google {
		@include button-bg($color-google, darken($color-google, 5%));
	}

	> img {
		margin-right: 8px;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	// &.btn-google {
	// 	background-color: $color-google;

	// 	&:hover {
	// 		background-color: darken($color-google, 5%);
	// 	}
	// }
}
</style>
