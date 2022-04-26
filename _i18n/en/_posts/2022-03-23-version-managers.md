---
title: What is Version Manager
subtitle: How to manage different language versions
description: The right approach to installing programming languages and updating them. Universal asdf version manager
image: "assets/images/version-manager/title.png"
author: Kirill Mokevnin
---

## System installation

To run code in any language, you need to install its interpreter (or compiler). Different operating systems do it differently: some of them use package managers, for example, *apt* or *yum*, and some download the installer directly from the repository. Some languages come preinstalled with an operating system, for example, Python. In particular, Python plays a key role in the Linux OS and its distributions.

```bash
# Ubuntu
sudo apt install nodejs # installs most recent version
```
The standard installation method works well only at the very beginning during the initial setup. Then, over time, different problems begin to surfase. For example, at some point, a new version of the language comes out but the project you are working on requires the latest version. Usually, it takes some time before the language becomes available for installation through package managers. And in this case, you either have to wait, which isn’t always convenient, or look for another installation method. The last one often becomes a challenge and takes a lot of time, with hours of googling and installing additional libraries. All this eventually clogs the system and sometimes breaks it.

Another serious problem arises when developer requires different versions of the same language for different programs. It happens surprisingly often since there are plenty of options in development: various company projects, pet-projects, open source.

*It’s important thing to mention, that all of this doesn’t concern those, who have completely thrown themselves into Docker and Docker Compose. However, even in this case, languages are required to work with open source.*

## Version managers

To solve these problems, the developers came up with version managers. A version manager is a special program designed to handle language versions. With its help it became possible to install the required versions and switch between them. Unlike the package managers that come with operating systems, version managers always allow to install the latest versions of languages as soon as they come out (including installing alpha and beta versions).

For example, you can use [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager) for Node.js:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# Installation does not mean activation. After installation, the version that was before installation will remain active
nvm install node # Install the latest available version of the node
nvm install 6.14.4 # or 10.10.0, 8.9.1, and so on.
nvm ls-remote # list of available versions
nvm use node # Activate the last installed version of the node
nvm use node 17 # Activate the required version
```
To simplify the work, version managers usually enable users to create a special file within the project that captures the required version of the language. In some cases, version managers track this file and switch versions automatically.
```bash
echo "17" > .nvmrc
# This command spotted .nvmrc file and used the version specified there
$ nvm use
Found '/path/to/project/.nvmrc' with version <17>
Now using node v17
```
In today’s world its hard to imagine a language without version manager. Moreover, some of the widely used languages, such as Ruby, have many competitive version managers:
* go: gvm, g
* java: jabba
* ruby: rbenv, rvm, chruby
* php: phpenv, phpbrew
* python: pyenv

Version managers also solve a few more important tasks. Customarily, when a programmer interacts with a language installed directly, he has to use *sudo* when installing global packages. The fact is that the standard language installation scheme is intended for all users at once. Hence, all the necessary files, including global packages, get into shared directories that require administrative rights. From the security perspective, this is a vulnerability that developers of open source libraries can exploit (and sometimes they do). Version managers install everything in the current user's home directory, where he already has full rights. On the one hand, it allows not to run package installation as an administrator, and on the other hand, the system isn’t clogged. Version manager makes it painless to remove a language and all its packages. All you have to do is delete the directory (although it’s better to do this using the version manager tools).

## Universal version manager

While solving some problems, version managers also cause a few others. Firstly, there are too many of them, so their popularity constantly changes. Secondly, the process of installing the version manager can be more complicated than installing the language. The problem is that they need to be universal and work everywhere, which is extremely problematic, considering the diversity of modern ecosystems. It’s enough to look at the size of the NVM documentation to assess the scale of the disaster. Thirdly, all these managers work differently and have different commands. It complicates the process of switching between them while working with various languages.

All this led to the next logical step. Eventually, a universal manager [asdf](https://asdf-vm.com/) appeared on the scene, and, thanks to plugins, is now able to work with any language. A shortlist of its advantages:

* A single command line utility to work with all languages
* A single interface for all languages
* Automatic switching between languages within each project
* A simple plugin system that allows to add any language

Now *asdf* has become quite popular and is gradually replacing every other version managers (technically, language-specific managers are more often used there). It has a bit more complex command system due to the need to support many languages, but otherwise it significantly simplifies the whole process.

```bash
# asdf has excellent documentation, which clearly shows how to install it,
# and what dependencies can be required in different systems
# Installing
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.9
# Restart the terminal after that
echo '. $HOME/.asdf/asdf.sh' >> ~/.bashrc
# To work with a particular language, it's necessary to install the respective plugin
# The list of available plugins is on the project website
asdf plugin add nodejs
# Language installing
# Instead of nodejs, you need to substitute the name of the plugin you are working with
asdf install nodejs latest # latest means the latest version of the required language
# Installing the required version
asdf install nodejs latest
# Installing the required language version by default
asdf global nodejs latest
# Shows current language versions installed through asdf
asdf current
elixir         1.10.1-otp-22 (set by /Users/user/.tool-versions)
erlang         22.2.7   (set by /Users/user/.tool-versions)
nodejs         17.0.0   (set by /Users/user/.tool-versions)
php            7.4.5    (set by /Users/user/.tool-versions)
python         3.8.2 2.7.16 (set by /Users/user/.tool-versions)
ruby           2.7.0    (set by /Users/user/.tool-versions)
yarn           1.22.4   (set by /Users/user/.tool-versions)
```
## Conclusion

Working with different versions of the language is a challenge, which is made easy due to version managers and Docker (for advanced users). Among all managers, *asdf* stands out and at the same time becomes a universal tool for managing any language and even regular programs.
