import { makeAnswer } from 'test/factories/make-answer';
import { OnAnswerCreated } from './on-answer-created';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryAnswerAttachmentRepository } from './../../../../../test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository
    );
  });
  it('should send a notification when an answer is created', () => {
    //cria um subscriber
    const onAnswerCreated = new OnAnswerCreated();

    //cria a answer
    const answer = makeAnswer();

    //cria no BD
    inMemoryAnswerRepository.create(answer);
  });
});
