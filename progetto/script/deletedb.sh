#!/bin/bash 

mongo --quiet --eval "
    db = db.getSiblingDB('DBsocial');
    db.dropDatabase();
"