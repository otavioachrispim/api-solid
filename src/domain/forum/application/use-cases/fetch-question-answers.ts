import { AnswerRepository } from '../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';

interface FetchRecentAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchRecentAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchRecentAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}
  async execute({
    page,
    questionId,
  }: FetchRecentAnswersUseCaseRequest): Promise<FetchRecentAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    return { answers };
  }
}
