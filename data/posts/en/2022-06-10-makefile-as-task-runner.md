---
title: What Is a Makefile and How to Use It
subtitle: A guide to the basics of make and Makefile for use in your own projects
description: This guide will explain how using Makefile will reduce the process of deploying a project to a few short and clear commands
image: "/assets/images/makefile/cover.jpg"
author: Kirill Mokevnin
---

## Introduction

Many developers may recall the first day they started working on a new project. After cloning the main repository, there comes a point when you have to enter a lot of commands with certain flags and in a specific order. In most cases, it’s hard to grasp what is going on without a description of the commands. For example:

```bash
# Bash
touch ~/.bash_history
ufw allow 3035/tcp || echo 'cant configure ufw'
ufw allow http || echo 'cant configure ufw'
docker run \
  -v /root/:/root/ \
  -v /etc:/etc \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /var/tmp:/var/tmp \
  -v /tmp:/tmp \
  -v $PWD:/app \
  --network host \
  -w /app \
  --env-file .env \
  ansible ansible-playbook ansible/development.yml -i ansible/development --limit=localhost -vv
grep -qxF 'fs.inotify.max_user_watches=524288' /etc/sysctl.conf || echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf || echo 'cant set max_user_watches' && sysctl -p
sudo systemctl daemon-reload && sudo systemctl restart docker
```

These commands are just a small portion of the project deployment process. The commands themselves are extensive and contain several flags, as shown in the example above, making them not only difficult to learn but also difficult to enter manually. Constantly maintaining documentation becomes more challenging as the project grows; it inevitably becomes outdated, and the entry barrier for newcomers increases since no one can remember all of the project's details. Some of these commands must be used on a daily basis, if not multiple times per day.

Over time, it became clear that we desperately needed a tool that could maintain such commands, and provide convenient shortcuts and self-documentation of the project. This is precisely what *Makefile* and the `make` utility have turned into. In this guide, I'll show you how to reduce the deployment to a few short and straightforward commands using these tools:

```bash
# Bash
make setup
make start
make test
```

## What is `make` and *Makefile*

*Makefile* is a file that is stored in the repository alongside the code. It is usually placed at the project’s root. It acts both as documentation and as executable code. The Makefile hides the implementation details and manages the commands, and the `make` utility runs them from the Makefile in the current directory.

`make` was originally designed to automate the building process of executable programs and libraries from source code. Most *nix distributions have it by default, which has contributed to its extensive use. Later, it turned out that this tool is convenient to use in other development projects because the process is essentially the same in most cases - automation and building applications.

The `make` has become a standard for many developers, especially for those working on large projects. Examples of makefile can be found in projects such as [Kubernetes](https://github.com/kubernetes/kubernetes/blob/master/build/root/Makefile), [Babel](https://github.com/babel/babel/blob/main/Makefile), [Ansible](https://github.com/ansible/ansible/blob/devel/Makefile), and, of course, everywhere on [Hexlet](https://github.com/Hexlet).

### *Makefile* syntax

`make` runs targets from a *Makefile* that contains the following commands:

```makefile
# Makefile
target1: # target name, you can also use kebab-case or snake_case
	command1 # it's very important to use tabs to indent
	command2 # the commands will be executed sequentially and only if the previous one was successful
```

However, it's not enough to just start using a Makefile in a project. To make its implementation more efficient, build a target-oriented command structure and give the targets semantically relevant names. At first, moving commands to a Makefile may result in all commands being merged into a single one with a vague name:

```makefile
# Makefile
up: # deploying and launching
	cp -n .env.example .env
	touch database/database.sqlite
	composer install
	npm install
	php artisan key:generate
	php artisan migrate --seed
	heroku local -f Procfile.dev # project launch
```

Several actions take place here at once: creating a file with environment variables, preparing the database, generating keys, installing dependencies, and launching the project. Since this is impossible to understand from the comments and target name, it’s best to separate these  commands into different independent targets:

```makefile
# Makefile
env-prepare: # create .env file for secrets
	cp -n .env.example .env

sqlite-prepare: # prepare a local database
	touch database/database.sqlite

install: # install dependencies
	composer install
	npm install

key: # generate keys
	php artisan key:generate

db-prepare: # upload data to the database
	php artisan migrate --seed

start: # run the app
	heroku local -f Procfile.dev
```

Now that the commands are divided into targets, you can individually install dependencies with the `make install` command or run your app via `make start`. But the remaining targets are only required during the project's initial deployment and must be performed in a specific sequence. In the Makefile world, the target has the following prerequisites:

```makefile
# Makefile
target1: target2 # here established the command dependency, target1 depends on target2
	command2 # target2 will be executed only if target2 command was successful

target2:
	command1
```

Commands will only be executed in the specified order and only if the previous command proves to be successful. Therefore, you can add a `setup` target to combine all the necessary actions:

```makefile
# Makefile
setup: env-prepare sqlite-prepare install key db-prepare # you may refer to the targets described below

env-prepare:
	cp -n .env.example .env

sqlite-prepare:
	touch database/database.sqlite

install:
	composer install
	npm install

key:
	php artisan key:generate

db-prepare:
	php artisan migrate --seed

start:
	heroku local -f Procfile.dev
```

Now it is enough to deploy and launch the project with two commands:

```bash
# Bash
make setup # will run sequentially: env-prepare sqlite-prepare install key db-prepare
make start
```

The project commands and flags are combined into a *Makefile* as a result of the *Makefile's* work. It ensures the correct execution order, regardless of the languages or technologies involved.

## Advanced usage

### Fake target

Using `make` in a project may one day lead to the error `make: <target name> is up to date.`, although everything is written correctly. This is frequently related to the existence of a directory or file that matches the target name. For example:

```makefile
# Makefile
test: # the target in the makefile
	php artisan test
```

```bash
# Bash
$ ls
Makefile
test # the file system contains a directory with the name of the target in the makefile

$ make test # an attempt to run tests
make: `test` is up to date.
```

As stated previously, `make` was designed to build programs from source code. Therefore, it searches for a directory or file with the given name and attempts to create a project from it. To alter this behavior, you need to add a `.PHONY` pointer to the target at the end of the Makefile:

```makefile
# Makefile
test:
	php artisan test

.PHONY: test
```

```bash
# Bash
$ make test
✓ All tests passed!
```

### Running commands consecutively and ignoring errors

You can run commands one at a time: `make setup`, `make start`, `make test` or all at once, space-separated: `make setup start test`. The latter method works as a dependency between commands, although it is not documented in the Makefile. Difficulties may arise if one of the commands produces an error that must be ignored. In the previous examples, such a command was to create an .env-file when deploying the project:

```makefile
# Makefile
env-prepare:
	cp -n .env.example .env # if the file has already been created, using this command again will result in an error
```

The easiest (*but not the only*) way to "cover up” an error is to use a logical OR in the Makefile:

```makefile
# Makefile
env-prepare:
	cp -n .env.example .env || true # any result of command execution is now considered successful
```

Be cautious applying such hacks so that you don't shoot yourself in the foot in more complex scenarios.

### Variables

Configuration parameters, path indicators, and environment variables are often substituted into commands, and `make` enables you to handle this as well. Variables can be written directly in the command within the makefile and passed when called:

```makefile
# Makefile
say:
	echo "Hello, $(HELLO)!"
```

```bash
# Bash
$ make say HELLO=World
echo "Hello, World!"
Hello, World!

$ make say HELLO=Kitty
echo "Hello, Kitty!"
Hello, Kitty!
```

Variables can be optional and have a default value. They are commonly declared at the beginning of the Makefile.

```makefile
# Makefile
HELLO?=World # the question mark indicates that the variable is optional. The value after assignment can be omitted

say:
	echo "Hello, $(HELLO)!"
```

```bash
# Bash
$ make say
echo "Hello, World!"
Hello, World!

$ make say HELLO=Kitty
echo "Hello, Kitty!"
Hello, Kitty!
```

Some variables in the *Makefile* have names other than the system ones. For example, `$PWD` is referred to as `$CURDIR` in the [Makefile](https://github.com/hexlet-basics/hexlet_basics/blob/3f4635bf629e2676efe547c9a01c22a2573eaebd/Makefile#L35-L39):

```makefile
# Makefile
project-env-generate:
	docker run --rm -e RUNNER_PLAYBOOK=ansible/development.yml \
		-v $(CURDIR)/ansible/development:/runner/inventory \ # $(CURDIR) is the same as $PWD in the terminal
		-v $(CURDIR):/runner/project \
		ansible/ansible-runner
```

## Conclusion

In this guide, we covered the main features of *Makefile* and the `make` utility. A deeper understanding of this tool will reveal many of its other useful features, such as conditions, cycles, and importing files. Makefile will be a great help in standardizing generic instructions in companies where multiple projects are written by different teams at different times: `setup start test deploy ...`.

Because the Makefile can describe multi-line commands consecutively, it may be used as a "universal glue" between language managers and other utilities. The widespread use of this tool and its overall simplicity allows you to quickly implement it into your project without making any changes. However, Makefile can be extremely large and complicated, as shown by the following real-world applications:

* [Codebattle](https://github.com/hexlet-codebattle/codebattle/blob/master/Makefile)
* [Babel](https://github.com/babel/babel/blob/main/Makefile)
* [Kubernetes](https://github.com/kubernetes/kubernetes/blob/master/build/root/Makefile)

### Additional materials

* [Modern Make Handbook](https://makefile.site) — a summary of the documentation

Makefile examples from this guide were taken from:

* [Hexlet SICP](https://github.com/Hexlet/hexlet-sicp/blob/master/Makefile)
* [Hexlet Basics](https://github.com/hexlet-basics/hexlet_basics/blob/master/Makefile)
