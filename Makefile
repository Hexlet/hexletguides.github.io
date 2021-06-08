install:
	bundle install
	npm i

serve:
	bundle exec jekyll serve --watch

lint-fix:
	bundle exec rubocop -A

generate-githubpages:
	SSL=true PAGES_GITHUB_HOSTNAME=guides.hexlet.io bundle exec jekyll build

