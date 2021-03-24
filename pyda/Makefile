help: ## Prints help for targets with comments
	@cat $(MAKEFILE_LIST) | grep -E '^[a-zA-Z_-]+:.*?## .*$$' | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

serve:
	@../node_modules/.bin/concurrently --kill-others \
		"../node_modules/.bin/nodemon -e py -i temp -x 'make convert'" \
		"../node_modules/.bin/live-server --host=localhost"

setup: ## Install required tools
	pip3 install --user jupyter jupyterlab
	pip3 install --user jupytext

convert: ## Convert *.py in temp to *.ipynb then to *.html
	@mkdir -p temp
	@find . -type d |\
		grep -vE '(temp|./.ipynb)' |\
		xargs -I{} mkdir -p temp/{}
	@find . -type f -name '*.py' |\
		grep -vE '(temp|./.ipynb)' |\
		xargs -I{} ./convert.sh {}
