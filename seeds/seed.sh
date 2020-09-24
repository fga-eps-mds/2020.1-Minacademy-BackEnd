#! /bin/bash

sleep 7

for eachfile in ./seeds/*.json
do
    mongoimport --host mongo -d db -u admin -p admin --authenticationDatabase admin --mode upsert --file $eachfile --jsonArray
done