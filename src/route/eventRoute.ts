import express, { Request, Response } from 'express';
import * as eventController from '../controller/eventController';

export const eventRouter = express.Router();

eventRouter.get('', (req: Request, res: Response) => {
    eventController.listRangeDateEvents(req, res);
});

eventRouter.post('/:eventName?/:occurrences?', (req: Request, res: Response) => {
    eventController.countEvent(req, res);
});

eventRouter.get('/unique', (req: Request, res: Response) => {
    eventController.listUniqueEvents(req, res);
});

eventRouter.get('/histogram/:eventName/:date', (req: Request, res: Response) => {
    eventController.getHistogram(req, res);
});