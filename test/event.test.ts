import moment from 'moment';
import { expect } from 'chai';
import Event from '../src/model/event';

describe('Event model test', () => {
  it('Should create event', () => {
    const name = 'login';
    const count = 1;

    const event = new Event(name, count);
    expect(event.name).to.equal('login');
    expect(event.count).to.equal(1);
    expect(event.occurrenceTime.getTime()).to.equal(new Date(moment().startOf('hour').format('YYYY-MM-DD HH:mm')).getTime());
  });

  it('Should increase count in 1', () => {
    const name = 'login';
    const count = 1;
    const event = new Event(name, count);
    event.increaseCount();
    expect(event.count).to.equal(2);
  })

  it('Should increase count in 10', () => {
    const name = 'login';
    const count = 1;
    const event = new Event(name, count);
    event.increaseCount(10);
    expect(event.count).to.equal(11);
  })
})