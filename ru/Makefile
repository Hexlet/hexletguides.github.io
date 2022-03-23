setup: install
	npx simple-git-hooks

install:
	bundle install
	npm ci

serve:
	bundle exec jekyll serve --incremental --limit_posts 2

lint:
	bundle exec rubocop

lint-fix:
	bundle exec rubocop -A

generate-githubpages:
	SSL=true bundle exec jekyll build
