install:
	bundle install
	npm i

serve:
	bundle exec jekyll serve --watch

lint-fix:
	bundle exec rubocop -A
