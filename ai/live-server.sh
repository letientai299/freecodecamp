#!/bin/bash

../node_modules/.bin/live-server --host=localhost --port=8081 \
  --ignore='**/temp/**,**/.git/**,**/*.md,**/*.py,**/*.ipynb,**/*.sh,**/Makefile,**/.idea/**'
