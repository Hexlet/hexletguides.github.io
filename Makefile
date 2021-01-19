JEKYLL_VERSION=4.2.0
RUN=docker run --rm \
	--volume=$(PWD):/srv/jekyll \
	--volume=`pwd`/vendor/bundle:/usr/gem \
	-p 4000:4000 \
	-it jekyll/jekyll:$(JEKYLL_VERSION)

serve:
	$(RUN) jekyll server --incremental

drafts-start:
	$(RUN) jekyll server --drafts

build:
	$(RUN) jekyll build

bash:
	$(RUN) bash
