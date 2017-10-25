JEKYLL_VERSION=3.6

server:
	docker run --rm \
	  --volume=$(PWD):/srv/jekyll \
	  -p 35729:35729 -p 4000:4000 \
	  -it jekyll/builder:$(JEKYLL_VERSION) \
	  jekyll server --drafts

build:
	docker run --rm \
	  --volume=$(PWD):/srv/jekyll \
	  -it jekyll/builder:$(JEKYLL_VERSION) \
	  jekyll build
