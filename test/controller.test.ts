import sinon from 'sinon';
import { expect } from 'chai';
import * as eventController from '../src/controller/eventController';
import * as trackEventService from '../src/service/trackEventService';
import * as listEventService from '../src/service/listEventService';
import * as histogramService from '../src/service/eventHistogramService';
import { mockRequest, mockResponse } from 'mock-req-res';
import { json } from 'express';

describe('Event controller test', () => { 
  const trackEventServiceStub = sinon.stub(trackEventService, "trackEvent");
  const listEventServiceStub = sinon.stub(listEventService, "listEvent");
  const listUniqeServiceStub = sinon.stub(listEventService, "listUniqueEvents");
  const histogramServiceStub = sinon.stub(histogramService, "getHistogram");

  let status: sinon.SinonStub, json: sinon.SinonSpy, res: any, type: sinon.SinonStub;
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    type = sinon.stub();
    res = { type, json, status };
    type.returns(res);
    status.returns(res);
    json.resetHistory();
    type.resetHistory();
    status.resetHistory();

    trackEventServiceStub.reset();
    listEventServiceStub.reset();
    listUniqeServiceStub.reset();
    histogramServiceStub.reset();
  });

  describe('trackEvent', () => {
    it('Should count event', async () => {
      const expected = { data: {eventName: 'test', count: 10}, error: null };
      const req: any = { params: { eventName: 'test', count: 10 } };

      const stubValue = {eventName: 'test', count: 10};
      trackEventServiceStub.returns(Promise.resolve(stubValue));

      const data = await eventController.countEvent(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(trackEventServiceStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0]).to.eql(expected);
    });

    it('Should not count event because of bad request', async () => {
      const expected = { data: null, error: 'The parameter eventName its required' };
      const req: any = { params: { count: 10 } };

      const data = await eventController.countEvent(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(403);
      expect(json.args[0][0]).to.eql(expected);
    });

    it('Should not count event because of error on trackEventService call', async () => {
      const expected = { data: null, error: 'Error' };
      const req: any = { params: { eventName: 'test', count: 10 } };

      const stubValue = {eventName: 'test', count: 10};
      trackEventServiceStub.returns(Promise.reject('Error'));

      const data = await eventController.countEvent(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(trackEventServiceStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(500);
      expect(json.args[0][0]).to.eql(expected);
    });
  })
  
  describe('listEvent', () => {

    it('Should list event in between a range', async () => {
      const stubValue: any = [{
        "date": "20201213",
        "event": "login",
        "count": 201
      },
      {
        "date": "20201213",
        "event": "login",
        "count": 200
      },
      {
        "date": "20201213",
        "event": "clicked",
        "count": 20
      },
      {
        "date": "20201213",
        "event": "as",
        "count": 70
      }];
      const expected = { data: stubValue, error: null };
      const req: any = { query: { start_date:'2020121300', end_date: '20201214'} };
  
      listEventServiceStub.returns(Promise.resolve(stubValue));
  
      const data = await eventController.listRangeDateEvents(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(listEventServiceStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0]).to.eql(expected);
    });
  
    it('Should not list events because of bad request - start_date missing', async () => {
      const expected = { data: null, error: 'The parameter start_date its required' };
      const req: any = { query: { end_date: '20201214' } };
  
      const data = await eventController.listRangeDateEvents(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(403);
      expect(json.args[0][0]).to.eql(expected);
    });
  
    it('Should not list events because of bad request - end_date missing', async () => {
      const expected = { data: null, error: 'The parameter end_date its required' };
      const req: any = { query: { start_date:'2020121300' } };
  
      const data = await eventController.listRangeDateEvents(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(403);
      expect(json.args[0][0]).to.eql(expected);
    });

    it('Should not list events because of bad request - end_date should be greater than start_date', async () => {
      const expected = { data: null, error: 'The parameter end_date should be greater than start_date' };
      const req: any = { query: { start_date:'2020121300', end_date: '20201210' } };
  
      const data = await eventController.listRangeDateEvents(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(403);
      expect(json.args[0][0]).to.eql(expected);
    });

    it('Should list event in between a range', async () => {
      
      const expected = { data: null, error: 'Error' };
      const req: any = { query: { start_date:'2020121300', end_date: '20201214'} };
  
      listEventServiceStub.returns(Promise.reject('Error'));
  
      const data = await eventController.listRangeDateEvents(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(listEventServiceStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(500);
      expect(json.args[0][0]).to.eql(expected);
    });
  });

  describe('listUniqueEvent', () => {

    it('Should list unique events', async () =>{
      const stubValue: any = [{
        "event": "login",
        "count": 401
      },
      {
        "event": "clicked",
        "count": 20
      },
      {
        "event": "as",
        "count": 70
      }];
      const expected = { data: stubValue, error: null };
      const req: any = { };
  
      listUniqeServiceStub.returns(Promise.resolve(stubValue));
  
      const data = await eventController.listUniqueEvents(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(listUniqeServiceStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0]).to.eql(expected);
    })

    it('Should not list unique events because of service error', async () =>{
      const expected = { data: null, error: 'Error' };
      const req: any = { };
  
      listUniqeServiceStub.returns(Promise.reject('Error'));
  
      const data = await eventController.listUniqueEvents(req, res);
      
      expect(json.calledOnce).to.be.true;
      expect(listUniqeServiceStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(500);
      expect(json.args[0][0]).to.eql(expected);
    })
  });

  describe('getHistogram', () => {

    it('Should get histogram', async () => {
      const stubValue: any = Buffer.of(4);
      const expectedType: any = 'image/png';

      const req: any = { params: { eventName: 'test', date: '20201213' } };
      histogramServiceStub.returns(Promise.resolve(stubValue));
  
      const data = await eventController.getHistogram(req, res);
      expect(histogramServiceStub.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(type.args[0][0]).to.be.equal(expectedType);
    })

    it('Should not get histogram because service error', async () => {
      const stubValue: any = Buffer.of(4);
      const expected = { data: null, error: 'Error' };

      const req: any = { params: { eventName: 'test', date: '20201213' } };
      histogramServiceStub.returns(Promise.reject('Error'));
  
      const data = await eventController.getHistogram(req, res);
      expect(histogramServiceStub.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(500);
      expect(json.args[0][0]).to.eql(expected);
    })

   });
  
});