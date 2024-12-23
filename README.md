# Timekeeper admin jobs service
## Getting started
### Adding the service to your stack
Add the following snippet to your `docker-compose.yml`
```yml
  admin-jobs:
    image: redpencil/timekeeper-admin-jobs-service
    environment:
      PUBLIC_HOLIDAY_TASK: "http://timekeeper.redpencil.io/tasks/xxxx"
```

## Reference
### Configuration
- **PUBLIC_HOLIDAY_TASK**: Task uri of the "public holiday task".

### API
#### POST /populate-public-holidays
Add a "public holiday" task to every employee (part of the employee group) for the specified iso-dates (YYYY-MM-DD). Pass the dates as a json-array in the body.

Returns error for an invalid payload.
Returns status 204 No Content on success.

Example:
`curl -X POST localhost/populate-public-holidays -H 'Content-Type: application/vnd.api+json' -d '["2025-01-01","2025-01-02"]'`
