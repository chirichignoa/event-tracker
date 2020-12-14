import moment from 'moment';
import { CanvasRenderService } from 'chartjs-node-canvas';
import { logger } from '../util/logger';
import { getCustomRepository, Between } from "typeorm";
import { EventRepository } from '../repository/eventRepository';
import EventEntity from '../model/entities/event.entity';
import { ChartConfiguration } from 'chart.js';


export const getHistogram = async (eventName: string, date: string) => {
  const eventRepository = getCustomRepository(EventRepository);

  const startDate = new Date(moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss')); 
  const endDate = new Date(moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss'));

  try {
    const data = await eventRepository.find(({ select: ['occurrenceTime', 'count'],
     where: {name: eventName, occurrenceTime: Between(startDate, endDate)}}));

    return await generateHistogram(data);
  } catch(error) {
    throw error;
  }
}

const generateHistogram = async (events: EventEntity[]) => {
  const totalCount = events.reduce((previous: number, current: EventEntity) => previous + current.count, 0);
  logger.info(`Total count ${totalCount}`);

  const configuration: ChartConfiguration = {
    type: 'bar',
    data: {
      datasets: [{
          label: 'Frequency',
          data: events.map(event => { return {x: moment(event.occurrenceTime).format('HH'), y: (event.count * 100) / totalCount}}),
          backgroundColor: 'rgba(255, 255, 179, 1)',
          borderColor:'rgba(0,0,0,0.8)',
          borderWidth: 1
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            padding: 10,
            callback: function(value: any, index: any, values: any) {
              return `${value} %`;
            }
          }
        }],
        xAxes: [{
          display: true,
          type: 'time',
          ticks: {
            padding: 10,
          },
          time: {
            parser: 'HH',
            unit: 'hour',
            unitStepSize: 1,
            displayFormats: {
              'hour': 'HH'
            }
          }
        }]
      }
    }
  };
  
  const width = 700; //px
  const height = 300; //px
  const canvasRenderService = new CanvasRenderService(width, height)
  return await canvasRenderService.renderToBuffer(configuration);

}