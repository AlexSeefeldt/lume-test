#!/usr/bin/bash
exec >log 2>&1
set -eux

date

repository=${1:?}
site_directory="${repository/#*"/"/}-main"

# remove old code & data
rm -rf upload $site_directory

# save zip file from stdin
cp /dev/stdin upload.zip
# unzip uploaded files
mkdir upload
unzip upload.zip -d upload
rm upload.zip

# get latest version of site repository
curl -L "https://github.com/${repository}/archive/main.zip" -o site.zip
# unzip repo files
unzip site.zip
rm site.zip

# copy post data from mobile upload into site source directory
find upload -maxdepth 1 -type f -exec mv -f {} $site_directory/src/posts \;

# run deno to build & deploy 
cd $site_directory
~/.deno/bin/deno task deploy
