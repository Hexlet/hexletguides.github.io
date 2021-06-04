install:
	bundle install
	npm i

serve:
	bundle exec jekyll serve --watch

lint-fix:
	bundle exec rubocop -A

generate-githubpages:
	JEKYLL_ENV=production bundle exec jekyll build

