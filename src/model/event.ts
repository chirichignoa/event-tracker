import moment from 'moment';

export default class Event {

  id?: string;
  name: string;
  count: number;
  occurrenceTime: Date;

  constructor(name?: string, count?: number, occurrenceTime?: Date) {
    this.name = name || '';
    this.count = count || 1;
    this.occurrenceTime = occurrenceTime || new Date(moment().startOf('hour').format('YYYY-MM-DD HH:mm'));
  }

  increaseCount(occurrences?: number) {
    this.count += occurrences || 1;
  }

  registerLastOccurrence() {
    this.occurrenceTime = new Date();
  }
}