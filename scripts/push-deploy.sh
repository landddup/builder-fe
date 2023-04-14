#!/bin/sh
echo "Enter commit message"
read commit
echo "Enter target branch"
read branch
echo "Is branch already exist? y/n"
read checkout

if [$checkout="n"]
then
    git checkout -b $branch
else
    git checkout $branch
fi

git add .
git commit -m "$commit"
git push origin $branch
npm run build
firebase deploy