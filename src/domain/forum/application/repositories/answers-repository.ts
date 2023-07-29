import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '../../enterprise/entities/answer';

export interface AnswerRepository {
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
  save(question: Answer): Promise<void>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>;
}
