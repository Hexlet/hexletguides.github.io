JEKYLL_VERSION=3.8.5

serve:
	docker run --rm \
	  --volume=$(PWD):/srv/jekyll \
	  -p 4000:4000 \
	  -it jekyll/builder:$(JEKYLL_VERSION) \
	  jekyll server

drafts-start:
	docker run --rm \
	  --volume=$(PWD):/srv/jekyll \
	  -p 4000:4000 \
	  -it jekyll/builder:$(JEKYLL_VERSION) \
	  jekyll server --drafts

build:
	docker run --rm \
	  --volume=$(PWD):/srv/jekyll \
	  -it jekyll/builder:$(JEKYLL_VERSION) \
	  jekyll build
