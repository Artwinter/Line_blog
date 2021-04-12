# abort on errors
set -e
npm run docs:build

git add .
git commit -m 'XD-blog01'
git push -f origin master
