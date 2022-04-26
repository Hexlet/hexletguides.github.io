---
title: Checklist of good software engineering practices in companies
subtitle:
description: Approaches to testing, deployment, developement and processes
image: "assets/images/engineering-practice/check-list-en.png"
author: Kirill Mokevnin
---

Software development is a challenging process that tends to become much more complex as the number of participants increases. More people in the team create more communication and require more synchronization (sharing knowledge of system parts and processes, keeping track of the business and its requirements). The cost of error increases, and the system can no longer fit in just one head, while a change to one element affects a change to the other element.

Different teams cope with these conditions in different ways. Some of them keep a high development pace and make regular releases, while others are slowing down significantly: their negotiations take more time than their development, their quality drops, and their version updates become stressful and adventurous. The total speed of feature implementation of one team can be way more or even ten times faster than that of other teams.

There are many reasons for this crucial difference. Here are some of them:

* Top management regarding business. When a company does the wrong things, its efficiency does not matter – the business will eventually close down. This topic is beyond our current guide
* Top management regarding processes. If this level is not good, everything else is irrelevant. Even the wrong bonus structure can lead to team rifts and ultimately shut down development altogether
* Human factor. Personal virtues and vices can cause problems for the rest of the team and the whole project. The main problem is this part cannot be rectified by any process. It is either a behavior change or a break-up
* Poor development process. This applies to every engineer and includes everything from communication and task handling to testing and code review

Some problems are either difficult or impossible to solve (at the developer level). But others, especially those relating to engineering practices, should be continually improved and fixed. Programmers should be very involved in this.

* [Books](https://en.hexlet.io/pages/recommended-books)
    * Peopleware: Productive Projects and Teams
    * Mythical Man-Month, The: Essays on Software Engineering
    * The Clean Coder: A Code of Conduct for Professional Programmers
    * The Goal: A Process of Ongoing Improvement
* [Manifesto for Agile Software Development](https://agilemanifesto.org/iso/en/manifesto.html)
* [Bus Factor](https://en.wikipedia.org/wiki/Bus_factor)
* [Cargo cult](https://en.wikipedia.org/wiki/Cargo_cult)

Although there are many practices, the net result is how quickly your customers get the results of your work and how pleased they are with it. Below is a checklist to see whether the team is using those engineering practices that are considered most appropriate.

_Compliance with these standards does not guarantee the company won't have problems. It may be a cargo cult, or its processes may be so formalized that they hinder rather than help. On the other hand, there is an exception to every rule and there will always be some projects which cannot apply some of the following. Finally, some of these approaches may conflict with one's values._

## Coding

**Good**

* [VCS](https://en.wikipedia.org/wiki/Version_control). The code is put under version control (usually Git)
* [Collective code ownership](https://en.wikipedia.org/wiki/Extreme_programming_practices#Collective_code_ownership). Any member of the team can change any piece of code in the system at any time
* [Coding standart](https://en.wikipedia.org/wiki/Extreme_programming_practices#Coding_standard). All team members adhere to the coding standards adopted for the stack (language, platform)

**Bad**

* Lack of a unified style. Everyone writes code in the style they are used to. There are no common standards at all or there is one but it is absolutely different from the generally accepted rules
* There is no version control. Code backups are used instead, and developers have to negotiate so that they don't overwrite each other's changes
* The code has an "owner". Developers protect their piece of code from encroachment by other team members

**Links**

* [Trunk Based Development](https://trunkbaseddevelopment.com/)

## Development environment

**Good**

* Development (dev) environment. Development is done in a dedicated environment. This is usually a local machine (possibly using Vagrant or Docker Compose). Each developer has a unique environment, and changes in one environment can't affect others
* One-click, automated deployment of the environment. This makes it easy to introduce newcomers to your project, to quickly and automatically propagate infrastructure changes and operate with no concern of crashing, as it is easy to rebuild
* Infrastructure as code. Configuration changes are propagated through the project code. One more dev environment deployment (with new project code) is enough to push all updates
* The development environment is as close to a production environment as possible. Linux running services require Linux as the development environment. The same applies to other issues

**Bad**

* Deploying and setting up the environment is done either with manuals or by the "try to run, read the error message, google for solution, and fix it" method. It’s expensive and inefficient. Manuals become outdated nearly the second they are written. A new person can spend days deploying the environment from scratch
* Manual configuration update. All developers receive some directive to make local configuration changes to the environment (e.g., add something new) for the new code to work
* Shared database for all developers. Loading from one person affects everyone. Crash failure also slows down everyone else

## Quality

**Good**

* Test coverage. Tests increase confidence in the code performance. Good tests have a positive impact on a code design. Test-covered code is usually better than untested one. Although there is a correlation
* A feature that has been partially tested or hasn't been tested at all is not considered completed. Testing reduces the workload of the rest of the team and positively affects the quality of a subsequent code. Moreover, it's best to write tests immediately, as there is often no time left for them later
* Developer is responsible for his feature all the way to the end. A feature is only considered completed when it is running in a production workflow. Everybody in the team must understand that the most important goal is to deliver value to the customer. As long as no one uses the feature, it doesn't matter if it's written, because the business is screwed at that point
* The team members reviewing each other's code (to a reasonable extent). The reviewing process helps both find bugs and learn from each other
* [Pair programming](https://en.wikipedia.org/wiki/Pair_programming). This is an effective approach not only for programmers but also for programmer–tester or novice–expert pair
* [Continuous integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration). The project repositories are connected to a CI server, where the code style is checked after each commit (by running linters), tests are run, and the project is built (e.g. compiled)
* Incident [postmortems](https://www.pagerduty.com/resources/learn/post-mortem-incident-report/)
* [Retrospective](https://en.wikipedia.org/wiki/Retrospective#Software_development). The process is continually improving and every team member affects the changes

**Bad**

* No testing. New code performance tests are done manually by clicking through. This way has disastrous consequences, such as low delivery speed and most likely poor code quality
* No code review. Different code styles, isolation of programmers from each other, limited sharing of experience, poor production decisions
* The programmer considers the feature closed when their code reaches the main branch. New code remains idle and useless and may even become obsolete before it reaches the customer
* [KPI](https://en.wikipedia.org/wiki/Performance_indicator). Heavy use of quantitative metrics: lines of code, released features, closed bugs. Instead of being result-oriented, developers strive to meet KPIs. Even if it goes against business goals
* High degree of formalization. Speed slows down, motivation drops

**Links**

* [Extreme programming](https://en.wikipedia.org/wiki/Extreme_programming)

## Development process

**Good**

* Developers are guided by [12factors](https://12factor.net) principles. Applications are easier to deploy, scale and monitor
* A single test runs in a fraction of a second. Test-driven development implies frequent testing during debugging. The speed of launching a particular test is extremely important here – it should be fast enough to keep the developer on track
* Effortless and enjoyable test writing. It is a touchstone to determine how good the project tests are. If you have to force yourself, likely, the tests are poorly written (e.g. a lot of mocks), and there won't be enough of them
* [Test-driven development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development). If possible, write tests before the code. There are several reasons why this is important:

    Tests require you to think not about the implementation, but about the way the code being tested will be used. Because of this approach, programmers detect flaws in their interfaces at a very early stage.

    The code must be tested in any case. If there is no test, it has to be checked in person.

* Once a bug is detected, first a test is written to reproduce it, then a fix is made. This is the only case where tests really help

**Bad**

* You have tests, but you have to force yourself to write them because they are difficult to write, take a long time to run, often crash or you have to rewrite them all the time
* Running one test takes seconds. Such a test is hard to run in TDD and the total test execution time becomes too long
* The code is fixed directly in production (the place where it works). No comment

**Links**

* [12factors](https://12factor.net)

## New version release (more relevant to web projects)

The production environment is the infrastructure (e.g. servers) where the project is deployed. It provides access to the project for end users.

Deployment is the process of updating the project in the production environment.

**Good**

* Automation. Deployment is automated and performed by clicking one button
* Frequent small releases. Deployment is routine and can be done at any time when features are ready, with no team distractions
* Zero Downtime Deployments. Version updates are transparent to users
* Technically, deployment can be done by any team member (i.e. everything is well automated)

**Bad**

* Manual deployment. For example, by direct management from the server. It is the most unreliable and unscalable approach, prone to error, which can take a considerable amount of time. Doesn't work with multiple servers
* Deployment comes with emotional tension and involves a large number of participants. This atmosphere makes everyone tend to slow down their code deployment, which causes even more problems and hurts the business
* Deployment process takes dozens of minutes or hours. This likely means that the build process is integrated with the deployment. These tasks need to be done separately
* Deployment happens once a week or rarer. The more changes deployed at once, the greater the chance of failure. And the harder it is to track the impact of each feature on business outcomes. In addition, changes that have been made before and were waiting to be deployed to production get overlooked
* Long downtimes during deployment. Users have to wait for a deployment to complete. This situation interferes with frequent deployments
* Deployment is done by a single person. Knowledge is stored in one head. Then this person goes on vacation or getting sick, ruining the whole process, as the rest of the team don't understand how it's all set up
* Deployment of configuration. Updating a configuration outside the logic of the code (e.g. changing a database password or database address) requires a second deployment. These parameters are strictly infrastructural and should go into the code as described in Twelve-Factor App

**Links**

* [What is DevOps?](https://www.atlassian.com/devops)
