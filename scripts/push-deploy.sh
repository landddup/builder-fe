#!/bin/sh
git add .
git commit -m "$1"
git pull origin $2
git push origin $2