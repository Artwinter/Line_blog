# abort on errors
set -e
npm run docs:build

git add .
git commit -m 'XD-blog'
git remote add origin git@gitee.com:Artwinter/my-blog.git
git push -f origin master
