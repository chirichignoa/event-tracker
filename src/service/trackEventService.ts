import moment from 'moment';
import Event from '../model/event';
import { logger } from '../util/logger';
import { getCustomRepository } from "typeorm";
import { eventMapper } from '../model/entities/eventMapper';
import { EventRepository } from '../repository/eventRepository';

export const trackEvent = async (eventName: string, occurrences: number) => {
  const eventRepository = getCustomRepository(EventRepository);

  const eventTime = new Date(moment().startOf('hour').format('YYYY-MM-DD HH:mm'));

  try {
    let event = await eventRepository.findOne({where: {name: eventName, occurrenceTime: eventTime}});
    logger.info(`Event: ${JSON.stringify(event)}`)

    if(event) {
      event.count += occurrences;
    } else {
      event = eventMapper.mapToEntity(new Event(eventName, occurrences));
    }

    logger.info(`Event about to save: ${JSON.stringify(event)}`)
    await eventRepository.save(event);
    return {eventName, count: event.count};
  } catch(error) {
    throw error;
  }
}