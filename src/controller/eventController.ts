import moment from 'moment';
import { logger } from '../util/logger';
import { Request, Response } from 'express';
import * as trackEventService from '../service/trackEventService';
import * as listEventService from '../service/listEventService';
import * as histogramService from '../service/eventHistogramService';
import { HttpResponseDTO } from '../model/response';


export let countEvent = async (req: Request, res: Response) => {
  logger.info(`Params: ${JSON.stringify(req.params)}`)

  const eventName: string = req.params.eventName;
  const occurrences: number = Number(req.params.occurrences) || 1;
  
  if(!eventName) {
    return res.status(403).json(new HttpResponseDTO(null, 'The parameter eventName its required'));
  }
  try {
    const data = await trackEventService.trackEvent(eventName, occurrences);
    res.status(200).json(new HttpResponseDTO(data, null));
  } catch(error){
      logger.error(`Error caught at tracking event: ${error}`)
      res.status(500).json(new HttpResponseDTO(null, error));
  }
}

export let listRangeDateEvents = async (req: Request, res: Response) => { 
  logger.info(`Params: ${JSON.stringify(req.query)}`)
  let startDateString = req.query.start_date;
  let endDateString = req.query.end_date;

  if(!startDateString) {
    return res.status(403).json(new HttpResponseDTO(null, 'The parameter start_date its required'));
  }
  if(!endDateString) {
    return res.status(403).json(new HttpResponseDTO(null, 'The parameter end_date its required'));
  }
  const startDate: moment.Moment = moment(startDateString.toString(), 'YYYYMMDDHH');
  const endDate: moment.Moment = moment(endDateString.toString(), 'YYYYMMDD');

  if(endDate.isBefore(startDate)) {
    return res.status(403).json(new HttpResponseDTO(null, 'The parameter end_date should be greater than start_date'));
  }

  try {
    const data = await listEventService.listEvent(startDate.format('YYYY-MM-DD HH:MM:SS'),
                                                   endDate.format('YYYY-MM-DD HH:MM:SS'));
    res.status(200).json(new HttpResponseDTO(data, null));
  } catch(error){
      logger.error(`Error caught at tracking event: ${error}`)
      res.status(500).json(new HttpResponseDTO(null, error));
  }
}

export let listUniqueEvents = async (req: Request, res: Response) => { 
  try {
    const data = await listEventService.listUniqueEvents();
    res.status(200).json(new HttpResponseDTO(data, null));
  } catch(error){
      logger.error(`Error caught at tracking event: ${error}`)
      res.status(500).json(new HttpResponseDTO(null, error));
  }
}

export let getHistogram = async (req: Request, res: Response) => { 
  logger.info(`Params: ${JSON.stringify(req.params)}`)
  const eventName: string = req.params.eventName;
  const date: string = req.params.date;
  try {
    const image = await histogramService.getHistogram(eventName, date);
    // res.status(200).json(new HttpResponseDTO(data, null));

    res.type("image/png")
    res.send(image) 
  } catch(error){
      logger.error(`Error caught at tracking event: ${error}`)
      res.status(500).json(new HttpResponseDTO(null, error));
  }
}