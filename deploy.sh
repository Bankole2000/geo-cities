#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git config user.email "techybanky@gmail.com"
git config user.name "Bankole Esan"
git branch -M main
git add -A
git commit -m "deploy"
git push -f https://github.com/Bankole2000/geo-cities.git main:gh-pages
cd -