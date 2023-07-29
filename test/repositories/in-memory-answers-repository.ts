import { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }
}
