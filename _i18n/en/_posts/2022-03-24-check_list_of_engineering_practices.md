---
title: Checklist of Good Software Engineering Practices in Companies
subtitle:
description: Подходы к тестированию, развертыванию, разработке и процессам
image: "assets/images/engineering-practice/check-list.png"
author: Kirill Mokevnin
hidden: true
---

Software development is a challenging process that tends to become much more complex as the number of participants increases. More people in the team creates more communication and requires more synchronisation (sharing knowledge of system parts and processes, keeping track of the business and its requirements). The cost of error increases, the system can no longer fit in just one head, while change to one element affects change to the other element.

Different teams cope with these conditions in different ways. Some keep a high development pace and make regular releases, while other teams are slowing down significantly: their negotiations take more time than their development, their quality drops, their version updates become stressful and adventurous. Total speed of feature implementation of one team can be way more or even ten times faster than that of other teams.

There are many reasons for this crucial difference. Here are some of them:

* Top management regarding business. When a company does the wrong things, its efficiency does not matter – the business will eventually close down. This topic is beyond our current guide.
* Top management regarding processes. If this level is not good, everything else is irrelevant. Even the wrong bonus structure can lead to team rifts and ultimately shut down development altogether.
* Human factor. Personal virtues and vices can cause problems for the rest of the team and for the whole project. The main problem is this part cannot be rectified by any process. It is either a behaviour change or a break-up.
* Poor development process. This applies to each and every engineer and includes everything from communication and task handling to testing and code review.

Some problems are either difficult or impossible to solve (at the developer level). But others, especially those relating to engineering practices, should be continually improved and fixed. Programmers should be very involved in this.

* [Книги](https://ru.hexlet.io/pages/recommended-books)
    * Человеческий фактор. Успешные проекты и команды
    * Мифический человеко-месяц, или Как создаются программные системы
    * Идеальный программист. Как стать профессионалом разработки ПО
    * Цель. Процесс непрерывного совершенствования
* [Manifesto for Agile Software Development](https://bit.ly/2NSBRLp)
* [Bus Factor](https://en.wikipedia.org/wiki/Bus_factor)
* [Карго культ](https://ru.wikipedia.org/wiki/Карго-культ)

Although there are many practices, the net result is how quickly your customers get the results of your work and how pleased they are with it. Below is a checklist to see whether the team is using those engineering practices that are considered most appropriate.

_Compliance with these standards does not guarantee the company won't have problems. It may be cargo cult, or its processes may be so formalised that they hinder rather than help. On the other hand, there is an exception to every rule and there will always be some project which cannot apply some of the following. Finally, some of these approaches may be in conflict with one's values._

## Код

**Good**

* [VCS](https://en.wikipedia.org/wiki/Version_control). The code is put under version control (usually Git).
* [Общий код](https://en.wikipedia.org/wiki/Extreme_programming_practices#Collective_code_ownership). Any member of the team can change any piece of code in the system at any time.
* [Единый стиль кода](https://en.wikipedia.org/wiki/Extreme_programming_practices#Coding_standard). All team members adhere to the coding standards adopted for the stack (language, platform).

**Bad**

* •	Lack of a unified style. Everyone writes code in the style they are used to. There are no common standards at all or there is one but it is absolutely different from the generally accepted rules.
* •	There is no version control. Code backups are used instead, and developers have to negotiate so that they don't overwrite each other's changes.
* •	The code has an ‘owner’. Developers protect their piece of code from encroachment by other team members.

**Links**

* [Trunk Based Development](https://trunkbaseddevelopment.com/)

## Development environment

**Good**

* Development (dev) environment. Development is done in a dedicated environment. This is usually a local machine (possibly using Vagrant or Docker Compose). This environment is completely different for each developer, and changes in one environment cannot affect other environments.
* One-click, automated deployment of the environment. This makes it easy to introduce newcomers to your project, to quickly and automatically propagate infrastructure changes and to operate with no concern of crashing, as it is easy to rebuild.
* Infrastructure as code. Configuration changes are propagated through the project code. One more dev environment deployment (with new project code) is enough to push all updates.
* The development environment is as close to a production environment as possible. Linux running services require Linux as the development environment. The same applies to other issues.

**Bad**

* Deploying and setting up the environment is done either with manuals or by ‘try to run, read the error message, google, fix it’ method. It’s expensive and inefficient. Manuals become outdated nearly the second they are written. A new person can spend days deploying the environment from scratch.
* Manual configuration update. All developers receive some directive to make local configuration changes to the environment (e.g., add something new) in order for the new code to work.
* Shared database for all developers. Loading from one person affects everyone. Crash failure also slows down everyone else.

## Quality

**Good**

* Test coverage. Tests increase confidence in the code performance. Good tests have a positive impact on the design of the code. Test-covered code is usually better than untested code. Although there is a correlation.
* A feature that has been partially tested or an untested feature is not considered to have been completed. Testing reduces the workload of the rest of the team and has a positive effect on the quality of the solution. Moreover, it is best to write tests immediately, as there is often no time left for them later.
* The programmer is responsible for their feature all the way to the end. A feature is only considered completed when it is running in production workflow. Everybody in the team must understand that the most important goal is to deliver value to the customer. As long as no one uses the feature, it doesn't matter if it's written, because the business is screwed at that point.
* The team members review each other's code (but don't overdo it). The review is not only a way to find bugs, but also a way to learn from each other.
* [Pair programming](https://en.wikipedia.org/wiki/Pair_programming). This is an effective approach not only for programmers, but also for programmer–tester or novice–expert pair.
* [Continuous integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration). The project repositories are connected to a CI server, where the code style is checked after each commit (by running linters), tests are run, and the project is built (e.g. compiled).
* Incident [postmortems](https://www.pagerduty.com/resources/learn/post-mortem-incident-report/).
* [Retrospective](https://en.wikipedia.org/wiki/Retrospective#Software_development). The process is continually improving and every team member affects the changes.

**Bad**

* No testing. New code performance tests are done manually by clicking through. This way has disastrous consequences, such as low delivery speed and most likely poor code quality.
* No code review. Different code styles, isolation of programmers from each other, limited sharing of experience, poor production decisions.
* The programmer considers the feature closed when their code reaches the main branch. New code remains idle and useless and may even become obsolete before it reaches the customer.
* [KPI](https://en.wikipedia.org/wiki/Performance_indicator). Heavy use of quantitative metrics: lines of code, released features, closed bugs. Instead of being result-oriented, developers strive to meet KPIs. Even if it goes against business goals.
* High degree of formalisation. Speed slows down, motivation drops.

**Links**

* [Extreme programming](https://en.wikipedia.org/wiki/Extreme_programming)
* [Парное программирование (доклад Николая Рыжикова)](https://www.youtube.com/watch?v=Vu5ujdZDS6E)
* [Как распространять инженерную культуру в своей компании](https://www.youtube.com/watch?v=mOfiWrTW9dA)

## Development process

**Good**

* Developers are guided by [12factors](https://12factor.net) principles. Applications are easier to deploy, scale and monitor.
* A single test runs in a fraction of a second. Test-driven development implies very frequent testing during debugging. The speed of launching a particular test is extremely important here – it should be fast enough to keep the developer on track.
* Effortless and enjoyable test writing. It is a touchstone to determine how good the project tests are. If you have to force yourself, it is likely that the tests are poorly written (e.g. a lot of mocks) and there will not be enough of them.
* [Test-driven development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development). If possible, tests are written before the code. There are several reasons why this is important:

    Tests require you to think not about the implementation, but about the way the code being tested will be used. Because of this approach, programmers detect flaws in their interfaces at a very early stage.

    The code must be tested in any case. If there is no test, it has to be checked in person.

* Once a bug is detected, first a test is written to reproduce it, then a fix is made. This is the only case where tests really help.

**Bad**

* You have tests, but you have to force yourself to write it because they are difficult to write, take a long time to run, often crash or you have to rewrite them all the time.
* Running one test takes seconds. Such a test is hard to run in TDD and the total test execution time becomes too long.
* The code is fixed directly in production (the place where it works). No comment.

**Links**

* [12factors](https://12factor.net)
* [Начинаем писать тесты (правильно)](https://ru.hexlet.io/blog/posts/how-to-test-code)
* [Бережливое тестирование](https://www.youtube.com/watch?v=zsz8kdi62mE)

## New version release (more relevant to web projects)

The production environment is the infrastructure (e.g. servers) where the project is deployed. It provides access to the project for end users.

Deployment is the process of updating the project in the production environment.

**Good**

* Automation. Deployment is automated and is performed by clicking one button.
* Frequent small releases. Deployment is routine and can be done at any time when features are ready, with no team distractions.
* Zero Downtime Deployments. Version updates are transparent to users.
* Technically, deployment can be done by any team member (i.e. everything is well automated).

**Bad**

* Manual deployment. For example, by direct management from the server. It is the most unreliable and unscalable approach, prone to error, which can take a considerable amount of time. Doesn't work with multiple servers.
* Deployment comes with emotional tension and involves a large number of participants. This atmosphere makes everyone tend to slow down their code deployment, which causes even more problems and hurts the business.
* Deployment process takes dozens of minutes or hours. This likely means that the build process is integrated with the deployment. These tasks need to be done separately.
* Deployment happens once a week or rarer. The more changes deployed at once, the greater the chance of failure. And the harder it is to track the impact of each feature on business outcomes. In addition, changes that have been made before and were waiting to be deployed to production get overlooked.
* Long down times during deployment. Users have to wait for deployment to complete. This situation interferes with frequent deployments.
* Deployment is done by a single person. Knowledge is stored in one head. Their vacating or getting sick ruins the whole process, as the rest of the coders don't understand how it's all set up.
* Deployment of configuration. Updating a configuration outside the logic of the code (e.g. changing a database password or database address) requires a second deployment. These parameters are strictly infrastructural and should go into the code as described in Twelve-Factor App.

**Links**

* [Что такое DevOps?](https://www.atlassian.com/devops)
* [Инжиниринг в букинге](https://bronevichok.ru/blog/2015/04/26/engineering-at-booking.com.html)
* [Среды разработки. Мужики, выкатывай!](https://ru.hexlet.io/blog/posts/environment)
* [Вебинар: Как распространять инженерную культуру в своей компании?](https://www.youtube.com/watch?v=mOfiWrTW9dA)
