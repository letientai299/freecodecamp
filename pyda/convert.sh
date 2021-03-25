#!/bin/bash

FILE="$*"

if [ -z "$FILE" ]; then
  exit 0
fi

FILE=$(realpath --relative-to="./" "$FILE")
DIR="$(dirname $FILE)"

mkdir -p "temp/$DIR"

echo "==> Copy $FILE to ./temp"
echo cp -a $FILE ./temp/$FILE
cp -a $FILE ./temp/$FILE
cp -a $DIR/*.{csv,json} ./temp/$DIR/

TFILE="./temp/$FILE"

echo "==> Converting $TFILE"
jupytext --opt hide_notebook_metadata=true --to ipynb $TFILE
jupyter nbconvert --execute --to html_toc "${TFILE%.py}.ipynb"
jupyter nbconvert --execute --to markdown "${TFILE%.py}.ipynb"

echo "==> Inject css in to ${TFILE%.py}.html"

# need to escape new new line with a slash, otherwise, sed will complain
CSS=$(
  cat <<'EOF'
<head>\
  <style type="text/css">\
    body{\
      max-width: 800px;\
      margin:auto;\
      border-left: 1px solid darkgreen;\
    }\
  </style>
EOF
)

#sed -i.bak "s|<head>|$CSS|" "${TFILE%.py}.html"

echo "==> Copy back result of converting $FILE"
cp "${TFILE%.py}.ipynb" "$DIR"
cp "${TFILE%.py}.html" "$DIR"/index.html
cp "${TFILE%.py}.md" "$DIR"
cp -a "${TFILE%.py}_files" "$DIR" || exit 0
