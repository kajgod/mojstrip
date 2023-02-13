#!/bin/sh

. ~/.nvm/nvm.sh
nvm use
NODE_ENV=production 
next build 
next export
