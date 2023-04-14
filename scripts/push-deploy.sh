#!/bin/sh
echo "Enter commit message"
read commit
echo "Enter target branch"
read branch

if [[ -z `git branch --list $branch` ]]
then
    `git checkout -b $branch`
else
    `git checkout $branch`
fi

git add .
git commit -m "$commit"
git push origin $branch
npm run build
firebase deploy
