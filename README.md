# Event tracker

Microservice to tracks real-time events.

## Technologies

The application was built using Typescript + node.js using express.js to expose REST methods. For persists the data, the microservice uses their own MYSQL database and typeORM for manage the persistence layer.

## Assumptions

1. I assume to group all events for each hour. This means that every event track will count for the rounded-down time that happens.
2. For sake of simplicity, I assume that the count events will be a positive number.

## Usage

I deployed the the application in Heroku cloud, so you will be able to execute microservice through the following URL:

[http://infinite-mountain-00334.herokuapp.com/api/events](http://infinite-mountain-00334.herokuapp.com/api/events)

## API

The REST API provides the following endpoints (Table 1) to satisfy requirements:

| Method | URL               | Brief description                                            |
| ------ | ----------------- | ------------------------------------------------------------ |
| POST   | /api/events/{event_name}      | Count an ocurrency of the given event name. |
| POST   | /api/events/{event_name}/{num}      | Count N times of an ocurrency of the given event name. |
| GET    | /api/events?start_date=YYYYMMDDHH&end_date=YYYYMMDD      | List all the events between START_DATE and END_DATE. |
| GET    | /api/events/unique      | List all the events stored historically. |
| GET  | /api/events/histogram/{EVENT}/{YYYMMDD} | Return a PNG/JPG file with a histogram chart showing the frecuency for a given event. |

*Table 1: summary of the REST API endpoints*

#### POST

##### /api/events/{event_name}

Response content-Type: application/json
This endpoint could return:

- **HTTP 200**
- **HTTP 403**: in case not provide the required param.
- **HTTP 500**: in case of an application error, i. e. error during the database communication.

##### /api/events/{event_name}/{num}

Response content-Type: application/json
This endpoint could return:

- **HTTP 200**
- **HTTP 403**: in case not provide the required param.
- **HTTP 500** in case of application error, i. e. error during the database communication.

#### GET

##### /api/events?start_date=YYYYMMDDHH&end_date=YYYYMMDD

Response content-Type: application/json
This endpoint could return:

- **HTTP 200**
- **HTTP 403**: in case you not provide the required params *start_date* and *end_date*, or in case the *end_date* won't be greather than the *start_date*.
- **HTTP 500**: in case of application error, i. e. error during the database communication.

##### /api/events/unique

Response content-Type: application/json
This endpoint could return:

- **HTTP 200**
- **HTTP 500**: in case of application error, i. e. error during the database communication.

##### /api/events/histogram/{EVENT}/{YYYMMDD}

Response content-Type: image/png
This endpoint could return:

- **HTTP 200**
- **HTTP 500**: in case of application error, i. e. error during the database communication.

### Response

All of the above mentioned returns the following response format:

- In case a succesfull response, the data field will have the required data, and the error will be null:

```json
{
    "data": [ "..." ],
    "error": null
}
```

- In case a error response, the data field will be null, and the error will have a description of what hapenned:

```json
{
    "data": null,
    "error": "..."
}
```

This excludes the histogram endpoint, which only returns this response format in case of error. Otherwise will return the png file