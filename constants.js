
export const SPARQL_PREFIXES = `
  PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
  PREFIX prov: <http://www.w3.org/ns/prov#>
  PREFIX dct: <http://purl.org/dc/terms/>
  PREFIX ui: <http://www.w3.org/ns/ui#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX wf: <http://www.w3.org/2005/01/wf/flow#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX doap: <http://usefulinc.com/ns/doap#>
  PREFIX time: <http://www.w3.org/2006/time#>
  PREFIX adms: <http://www.w3.org/ns/adms#>
  PREFIX ical: <http://www.w3.org/2002/12/cal/ical#>
  PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 
`

export const WORK_LOG_RESOURCE_BASE = "http://timekeeper.redpencil.io/work-logs/"

export const PUBLIC_HOLIDAY_TASK_URI = process.env.PUBLIC_HOLIDAY_TASK;
if (! PUBLIC_HOLIDAY_TASK_URI) {
  throw Error("environment variable PUBLIC_HOLIDAY_TASK is mandatory.")
}