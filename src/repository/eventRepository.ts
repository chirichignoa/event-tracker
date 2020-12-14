import { EntityRepository, Repository } from "typeorm";
import EventEntity from '../model/entities/event.entity';


@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {

  findUniqueEvents() {
    return this.createQueryBuilder('event')
    .select('event.name, SUM(event.count) as count')
    .distinct(true)
    .addGroupBy('event.name')
    .getRawMany();
  }
}
