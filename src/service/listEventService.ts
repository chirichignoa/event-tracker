import moment from 'moment';
import { getCustomRepository, Between } from "typeorm";
import { EventRepository } from '../repository/eventRepository';

export const listEvent = async (startDate: string, endDate: string) => {
  const eventRepository = getCustomRepository(EventRepository);
  
  try {
    const data = await eventRepository.find({ where: {occurrenceTime: Between(startDate, endDate) }});
    return data.map(event => { return {date: moment(event.occurrenceTime).format('YYYYMMDD'), event: event.name, count: event.count}});
  } catch(error) {
    throw error;
  }
}

export const listUniqueEvents = async () => {
  const eventRepository = getCustomRepository(EventRepository);

  try {
    const data = await eventRepository.findUniqueEvents();
    return data;
  } catch(error) {
    throw error;
  }
}