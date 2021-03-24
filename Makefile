help: ## Prints help for targets with comments
	@cat $(MAKEFILE_LIST) | grep -E '^[a-zA-Z_-]+:.*?## .*$$' | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := all
.PHONY: all
all: web/doc pyda ## Render the site
	@node render.js

.PHONY: web/doc
web/doc: ## Render the web/doc/index.html
	@node web/doc/render-doc.js

.PHONY: pyda
pyda: ## Render ipynb for python data analysis course
	@cd pyda && make setup convert

.PHONY: serve
serve: ## Watch file and start live server
	@./node_modules/.bin/concurrently --kill-others \
		"./node_modules/.bin/nodemon -w *.md -w './tpl.html' -x 'make all #'" \
		"./node_modules/.bin/live-server --host=localhost"

