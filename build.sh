#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# nav into the build out dir
cd docs/.vuepress/dist

# git
git init
git add .
git commit -m 'XD-blog'
git remote add origin git@gitee.com:Artwinter/myBlog.git
git push -f origin master
