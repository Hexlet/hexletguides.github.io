FROM ruby
RUN apt-get update
RUN gem install jekyll github-pages bundler
EXPOSE 4000
WORKDIR /hguides
# RUN bundle install
ENTRYPOINT jekyll serve -H 0.0.0.0 --watch