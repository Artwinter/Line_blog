# abort on errors
set -e
npm run docs:build

git add .
git commit -m '疑难杂惑页面'
git push -f origin master
