help: ## Prints help for targets with comments
	@cat $(MAKEFILE_LIST) | grep -E '^[a-zA-Z_-]+:.*?## .*$$' | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

serve: ## start live-server and rerender on code change
	@../node_modules/.bin/concurrently --kill-others \
		"../node_modules/.bin/nodemon --config nodemon.json -x 'echo'" \
		"./live-server.sh"

clean: ## Remove dist files
	@rm -rf ./dist

render: ## Render the contents
	@node ./scripts/render.js
