<template>
	<div
		class="question"
		:class="[
			{ answered: isAnswered },
			{ highlighted: isHighlighted && !isAnswered }
		]"
	>
		<p>{{ content }}</p>
		<footer>
			<div class="user-info">
				<img :src="author.avatar" :alt="`Foto de ${author.name}`" />
				<span>{{ author.name }}</span>
			</div>
			<div>
				<slot></slot>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'Question',
	props: {
		content: {
			type: String,
			required: true
		},
		author: {
			name: String,
			avatar: String
		},
		isAnswered: {
			type: Boolean,
			default: false
		},
		isHighlighted: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="css" scoped></style>
