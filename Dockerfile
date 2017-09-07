FROM ruby
RUN apt-get update
RUN gem install bundler

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN bundle install

EXPOSE 4000
WORKDIR /hguides

ENTRYPOINT jekyll serve -H 0.0.0.0 --watch