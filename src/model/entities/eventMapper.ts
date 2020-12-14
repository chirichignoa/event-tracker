import Event from "../event";
import EventEntity from "./event.entity";
import Mapper from "./mapper";

class EventMapper implements Mapper {

  constructor() {

  }

  mapToEntity(model: any) {
    const entity = new EventEntity();
    entity.name = model.name;
    entity.occurrenceTime = model.occurrenceTime;
    entity.count = model.count;
    return entity;
  }

  mapToModel(entity: any) {
    const model = new Event(entity.name, entity.count, entity.occurrenceTime);
    model.id = entity.id;
    return model;
  }

}

export const eventMapper = new EventMapper();