#!/bin/sh
echo "Enter commit message"
read commit
echo "Enter target branch"
read branch
git add .
git commit -m "$commit"
git checkout $branch
git pull origin $branch
git push origin $branch
npm run build
firebase deploy