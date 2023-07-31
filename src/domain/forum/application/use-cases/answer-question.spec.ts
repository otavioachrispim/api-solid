import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswerAttachmentRepository } from './../../../../../test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: AnswerQuestionUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: 'Nova pergunta',
      content: 'Conteúdo da resposta',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems
    ).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
      ]
    );
  });
});
