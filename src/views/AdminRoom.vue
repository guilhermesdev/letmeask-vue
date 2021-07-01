<template>
	<div class="flex flex-column items-center">
		<header class="room-header mb-5">
			<div class="content px-1">
				<router-link to="/">
					<Logo />
				</router-link>
				<div class="flex justify-between">
					<RoomCode :code="roomId" />
					<CButton
						@click.native="handleEndRoom"
						class="ml-1"
						primary
						outlined
						height="40px"
					>
						Encerrar sala
					</CButton>
				</div>
			</div>
		</header>
		<main class="max-w-800px fullwidth flex flex-column px-2">
			<div class="flex items-center">
				<h1 class="text-2 mr-1">Sala {{ roomName }}</h1>
				<span v-if="questionsNumber" class="badge bg-secondary-dark color-white"
					>{{ questionsNumber }} pergunta(s)
				</span>
			</div>

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
						@click="handleCheckQuestionAsAnswered(question.id)"
					>
						<img :src="checkImg" alt="Marcar pergunta como respondida" />
					</button>
					<button
						v-if="!question.isAnswered"
						@click="handleHighlightQuestion(question.id)"
					>
						<img :src="answerImg" alt="Dar destaque à pergunta" />
					</button>
					<button @click="handleDeleteQuestion(question.id)">
						<img :src="deleteImg" alt="Deletar pergunta" />
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

import deleteSvg from '@/assets/images/delete.svg';
import checkSvg from '@/assets/images/check.svg';
import answerSvg from '@/assets/images/answer.svg';

import { mapState } from 'vuex';

import { db } from '@/firebase';

export default {
	name: 'AdminRoom',
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
			questions: {}
		};
	},
	computed: {
		deleteImg: () => deleteSvg,
		checkImg: () => checkSvg,
		answerImg: () => answerSvg,
		...mapState(['user']),
		questionsNumber() {
			return Object.keys(this.questions).length;
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
		async getRoomData() {
			const roomRef = await db.ref(`rooms/${this.roomId}`);

			roomRef.on('value', room => {
				const { title, questions } = room.val();
				this.roomName = title;

				const parsedQuestions = Object.entries(questions || '').map(
					([key, value]) => {
						return {
							id: key,
							content: value.content,
							author: value.author,
							likes: value.likes,
							isHighlighted: value.isHighlighted,
							isAnswered: value.isAnswered
						};
					}
				);

				const sortedQuestions = parsedQuestions
					.sort((a, b) => -(a.isHighlighted - b.isHighlighted))
					.sort((a, b) => a.isAnswered - b.isAnswered);

				this.questions = sortedQuestions;
			});
		},
		async handleCheckQuestionAsAnswered(questionId) {
			await db.ref(`rooms/${this.roomId}/questions/${questionId}`).update({
				isAnswered: true
			});
		},
		async handleHighlightQuestion(questionId) {
			await db.ref(`rooms/${this.roomId}/questions/${questionId}`).update({
				isHighlighted: true
			});
		},
		async handleDeleteQuestion(questionId) {
			if (confirm('Tem certeza que você deseja excluir essa pergunta?')) {
				await db.ref(`rooms/${this.roomId}/questions/${questionId}`).remove();
			}
		},
		async handleEndRoom() {
			await db.ref(`rooms/${this.roomId}`).update({
				endedAt: new Date()
			});

			this.$router.push('/');
		}
	}
};
</script>
