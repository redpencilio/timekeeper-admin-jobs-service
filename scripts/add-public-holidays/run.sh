#!/bin/sh
echo "add public holidays"
dates="$1"
formatted_dates=$(echo "$dates" | sed 's/,/","/g')
curl -X POST http://admin-jobs/populate-public-holidays -H 'Content-Type: application/vnd.api+json' -d '["'"$formatted_dates"'"]'
