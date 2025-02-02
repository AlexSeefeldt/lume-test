#!/usr/bin/bash
exec >log 2>&1
set -eux

date

repository=${1:?}
site_directory="${repository/#*"/"/}"

# remove old code & data
rm -rf upload $site_directory

# save zip file from stdin
cp /dev/stdin upload.zip
# unzip uploaded files
mkdir upload
unzip upload.zip -d upload
rm upload.zip

# get latest version of site repository
git clone --depth=1 "git@github.com:${repository}.git"

# copy post data from mobile upload into site source directory
find upload -maxdepth 1 -type f -exec mv -f {} $site_directory/src/posts \;

# run deno to build & deploy 
cd $site_directory

git add -A
git config user.name "publish script"
git config user.email ""
git commit -m "mobile publish"
git push

~/.deno/bin/deno task deploy
