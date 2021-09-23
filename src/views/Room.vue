<template>
	<div class="flex flex-column items-center">
		<header class="room-header mb-5">
			<div class="content px-1">
				<router-link to="/">
					<Logo />
				</router-link>
				<RoomCode :code="roomId" />
			</div>
		</header>
		<main class="max-w-800px fullwidth flex flex-column px-2">
			<div class="flex items-center">
				<h1 class="text-2 mr-1">Sala {{ roomName }}</h1>
				<span v-if="questionsNumber" class="badge bg-secondary-dark color-white"
					>{{ questionsNumber }} pergunta(s)
				</span>
			</div>

			<form @submit.prevent="handleSendQuestion">
				<textarea
					v-model.trim="newQuestion"
					placeholder="O que você quer perguntar?"
					class="mt-2 mb-1"
				/>

				<div class="flex justify-between items-center">
					<div v-if="user.id" class="user-info">
						<img :src="user.avatar" :alt="`Foto de ${user.name}`" />
						<span>{{ user.name }}</span>
					</div>
					<small v-else>
						Para enviar uma pergunta,
						<button
							type="button"
							@click="$store.dispatch('signInWithGoogle')"
							class="color-primary border-none"
						>
							faça seu login
						</button>
					</small>
					<CButton primary :disabled="!user.id" type="submit">
						Enviar uma pergunta
					</CButton>
				</div>
			</form>

			<div class="question-list">
				<Question
					v-for="question in questions"
					:key="question.id"
					:content="question.content"
					:author="question.author"
					:isAnswered="question.isAnswered"
					:isHighlighted="question.isHighlighted"
				>
					<button
						v-if="!question.isAnswered"
						class="like-button"
						:class="{ liked: question.likeId }"
						type="button"
						aria-label="Marcar como gostei"
						@click="handleLikeQuestion(question.id, question.likeId)"
					>
						<span v-if="question.likeCount">
							{{ question.likeCount }}
						</span>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
								stroke="#737380"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</Question>
			</div>
		</main>
	</div>
</template>

<script>
import Logo from '@/components/Logo';
import CButton from '@/components/CButton';
import RoomCode from '@/components/RoomCode';
import Question from '@/components/Question';

import { mapState } from 'vuex';

import { db } from '@/firebase';
import { getObjectLength } from '@/utils';

export default {
	name: 'Room',
	components: {
		Logo,
		CButton,
		RoomCode,
		Question
	},
	data() {
		return {
			roomId: this.$route.params.id,
			roomName: '',
			questions: [],
			newQuestion: ''
		};
	},
	computed: {
		...mapState(['user']),
		questionsNumber() {
			return this.questions.length;
		}
	},
	watch: {
		$route(to) {
			this.roomId = to.params.id;
			this.getRoomData();
		}
	},
	mounted() {
		this.getRoomData();
	},
	methods: {
		getLikeId(likes) {
			if (!likes) return null;

			const { id } = Object.values(likes).find(
				like => like.authorId === this.user.id
			);

			return id;
		},
		async handleSendQuestion() {
			if (!this.newQuestion) return;

			if (!this.user) {
				alert('Por favor, faça login para enviar uma pergunta');
				return;
			}

			const questionRef = await db.ref(`rooms/${this.roomId}/questions`).push();

			const question = {
				id: questionRef.key,
				content: this.newQuestion,
				author: {
					name: this.user.name,
					avatar: this.user.avatar
				},
				isHighlighted: false,
				isAnswered: false
			};

			await questionRef.set(question);

			this.newQuestion = '';
		},
		async getRoomData() {
			const roomRef = await db.ref(`rooms/${this.roomId}`);

			roomRef.on('value', room => {
				const { title, questions } = room.val();
				this.roomName = title;

				if (!questions) return;

				const questionsArray = Object.values(questions).map(question => ({
					...question,
					likeId: this.getLikeId(question.likes)
				}));

				const sortedQuestions = questionsArray
					.sort((a, b) => -getObjectLength(a.likes) - getObjectLength(b.likes))
					.sort((a, b) => -(a.isHighlighted - b.isHighlighted))
					.sort((a, b) => a.isAnswered - b.isAnswered);

				this.questions = sortedQuestions;
			});
		},
		async handleLikeQuestion(questionId, likeId) {
			if (likeId) {
				await db
					.ref(`rooms/${this.roomId}/questions/${questionId}/likes/${likeId}`)
					.remove();
			} else {
				const likeRef = await db
					.ref(`rooms/${this.roomId}/questions/${questionId}/likes`)
					.push({
						authorId: this.user.id
					});

				await likeRef.update({ id: likeRef.key });
			}
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.badge {
	padding: 6px 16px;
	border-radius: 51px;
	font-size: 14px;
}

.user-info {
	display: flex;
	align-items: center;

	img {
		widows: 32px;
		height: 32px;
		border-radius: 50%;
	}

	span {
		margin-left: 8px;
		color: $color-black;
		font-weight: 500;
		font-size: 14px;
	}
}

.question {
	background-color: $color-details;
	border-radius: 8px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
	padding: 2rem;

	&-list {
		margin-top: 32px;
	}

	& + .question {
		margin-top: 8px;
	}

	&.highlighted {
		background-color: $color-highlighted;
		border: 2px solid $color-primary;

		footer .user-info span {
			color: $color-black;
		}
	}

	&.answered {
		background-color: $color-gray-light;
	}

	p {
		color: $color-black;
		font-size: 16px;
	}

	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 2rem;

		.user-info span {
			font-weight: 500;
			color: $color-gray-dark;
		}

		> div {
			display: flex;
			gap: 16px;
		}

		button {
			border: 0;
			background-color: transparent;
			transition: 0.2s;

			&.like-button {
				display: flex;
				align-items: flex-end;
				color: $color-gray-dark;
				gap: 8px;

				&.liked {
					color: $color-primary;

					svg path {
						stroke: $color-primary;
					}
				}
			}

			&:hover {
				filter: brightness(0.8);
			}
		}
	}
}

.room-header {
	padding: 24px 0;
	width: 100%;
	border-bottom: 1px solid #e2e2e2;

	.content {
		max-width: 1120px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		img {
			max-height: 45px;
		}
	}
}
</style>
