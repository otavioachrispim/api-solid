import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityId } from '../entities/unique-entity-id';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';
import { vi } from 'vitest';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe('DomainEvents', () => {
  it('should be able to dispatch and listen events', () => {
    //utilizando spy para ver se uma função foi chamada ou nao
    const callbackSpy = vi.fn();

    //subscriber cadastrado(ouvindo evento de "resposta criada")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    //criando resposta SEM salvar no banco
    const aggregate = CustomAggregate.create();

    //assugurando que o evento foi criado mas Não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    //salvando a resposta no banco e disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    //subscribe ouvindo o evento e faz o que precisa com o dado
    expect(callbackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
