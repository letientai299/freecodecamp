help: ## Prints help for targets with comments
	@cat $(MAKEFILE_LIST) | grep -E '^[a-zA-Z_-]+:.*?## .*$$' | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := index
index: web/doc ## Render the site
	@node render.js

.PHONY: web/doc
web/doc: ## Render the web/doc/index.html
	@node web/doc/render-doc.js
