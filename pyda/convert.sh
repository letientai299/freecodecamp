#!/bin/bash

FILE="$*"

echo "==> Copy $FILE to ./temp"
echo cp -a $FILE ./temp/$FILE
cp -a $FILE ./temp/$FILE

TFILE="./temp/$FILE"

echo "==> Converting $TFILE"
jupytext --to ipynb --sync $TFILE
jupyter nbconvert --execute --to html "${TFILE%.py}.ipynb"

echo "==> Copy back result of converting $FILE"
DIR="$(dirname $FILE)"
cp "${TFILE%.py}.ipynb" "$DIR"
cp "${TFILE%.py}.html" "$DIR"
