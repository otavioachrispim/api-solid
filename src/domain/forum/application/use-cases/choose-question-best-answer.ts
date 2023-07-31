import { AnswerRepository } from '../repositories/answers-repository';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Either, left, right } from '@/core/either';
import { ResoucerNotFounError } from '../../../../core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error';

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResoucerNotFounError | NotAllowedError,
  { question: Question }
>;

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionsRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResoucerNotFounError());
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      return left(new ResoucerNotFounError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return right({ question });
  }
}
