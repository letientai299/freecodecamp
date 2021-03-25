#!/bin/bash

../node_modules/.bin/live-server --host=localhost --port=8081 \
  --open=mean-var-std/readme.html \
  --ignore='**/temp/**,**/.git/**,**/*.md,**/*.py,**/*.ipynb,**/*.sh,**/Makefile,**/.idea/**'
