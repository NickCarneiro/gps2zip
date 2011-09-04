#!/usr/bin/env bash

# Generate a new express project from your HTML5 Express Boilerplate repo clone
# Inspired by Rick Waldron and Michael Cetrulo's build script for H5BP
# By Niftylettuce

# WISHLIST
# TODO: Ability to use like express from command line `h5eb -t jade -c stylus`
# TODO: Install npm dependencies and check if node and npm are installed

## First run
# $ cd  html5-express-boilerplate/build
# $ chmod +x h5eb.sh
# $ ./h5eb.sh
# $ cd ../../new-project-name
# $ npm install -d
# $ node server.js

##usage
# $ cd  html5-express-boilerplate/build
# $ ./h5eb.sh

# find project root (also ensure script is ran from within repo)
src=$(git rev-parse --show-toplevel) || {
  echo "try running the script from within html5-express-boilerplate directories." >&2
  exit 1
}
[[ -d $src ]] || {
  echo "fatal: could not determine html5-express-boilerplate's root directory." >&2
  echo "try updating git." >&2
  exit 1
}

# Get a name for new project
while [[ -z $name ]]
do
    echo "To create a new html5-express-boilerplate project, enter a new directory name:"
    read name || exit
done
dst=$src/../$name

if [[ -d $dst ]]
then
    echo "$dst exists"
else
    # Create new project
    mkdir -- "$dst" || exit 1

    # Success message
    echo "Created Directory: $dst"

    cd -- "$src"
    cp -vr -- public views package.json Readme.md server.js "$dst"

    # Success message
    echo "Created Project: $dst"

fi

