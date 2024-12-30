import { app, errorHandler, sparqlEscapeDate } from 'mu';
import { isValid } from 'date-fns'
import { PUBLIC_HOLIDAY_TASK_URI, SPARQL_PREFIXES, WORK_LOG_RESOURCE_BASE } from './constants';
import { updateSudo } from "@lblod/mu-auth-sudo";

/**
 * given a list of dates in iso format (YYYY-MM-DD)
 * add a public-holiday work-log (of 8h) to every employee on this date
 * Pass the dates as a JSON array in the body (of type `application/vnd.api+json`).
 */
app.post('/populate-public-holidays', async function (req, res) {
  const dates = req.body;
  if(!dates) next(new Error('No dates found the body of the request.'));
  if(!Array.isArray(dates)) next(new Error('Dates passed in the body should be a JSON array.'));
  dates.forEach(date => {
    if(!isValid) { next(new Error(`${date} is not a valid date string. Use the format YYYY-MM-DD`)); }
  })
  const query = `${SPARQL_PREFIXES}
  INSERT {
    GRAPH ?g {
      ?workLogUri a ical:Vevent ;
                  mu:uuid ?workLogId ;
                  ical:duration "PT8H" ;
                  dct:subject <${PUBLIC_HOLIDAY_TASK_URI}> ;
                  prov:wasAssociatedWith ?employee ;
                  ical:dtstart ?date .
    }
  } WHERE { 
    VALUES ?date {${dates.map(d => sparqlEscapeDate(d)).join(' ')}}  
    {
      SELECT DISTINCT ?g ?employee WHERE {
        <http://mu.semte.ch/user-groups/employee> foaf:member ?employee .
        ?employee mu:uuid ?employeeId .
        BIND(IRI(CONCAT("http://mu.semte.ch/graphs/employees/", ?employeeId)) AS ?g)
      }
    }
    FILTER NOT EXISTS {
      ?existingWorkLog a ical:Vevent ;
                        dct:subject <${PUBLIC_HOLIDAY_TASK_URI}> ;
                        ical:dtstart ?date .
    }
    BIND (LCASE(STRUUID()) AS ?workLogId)
    BIND (URI(CONCAT("${WORK_LOG_RESOURCE_BASE}", ?workLogId)) AS ?workLogUri)
  }
  `
  await updateSudo(query);
  res.status(204).send();
});

app.use(errorHandler)