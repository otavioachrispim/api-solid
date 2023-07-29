import { QuestionsRepository } from '../repositories/questions-repository';

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Only the author can delete the question');
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}
