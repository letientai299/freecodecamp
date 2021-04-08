#!/bin/bash

../node_modules/.bin/live-server --host=localhost --port=8080 \
  --open=/dist \
  --ignore='**/temp/**,**/.git/**,**/*.md,**/src,**/Makefile,**/.idea/**'
