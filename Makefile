setup: install
	npx simple-git-hooks

install:
	npm ci

serve:
	npm run start

start: serve

build:
	npm run build

lint:
	npm run lint