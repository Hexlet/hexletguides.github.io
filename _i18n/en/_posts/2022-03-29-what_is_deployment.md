---
title: |
    Deployment means deploing to server
header: What is deployment?
# subtitle: Front-end framework for fast and easy web development.
description: Code delivery to the production server. Data base migration. Zero Downtime Deployment. Ansible, Kubernetes
image: "assets/images/deploy/deploy.png"
author: Kirill Mokevnin
---

Deployment is the process of web service “deployment”, e.g. of a website, in the operating environment. Operating environment is a place where a website is started and available for requests. This can be a ready-made hosting as well as your own server infrastructure.

*Not only web services but also any services available over the network are deployed. Even if this network is internal and not available for requests over the Internet.*

To understand deployment, you need to understand code life cycle. The application code is built on the developer's workstation and run in another place called production. Production is a startup environment (sometimes it is called a live environment). In case of a simple application it may consist of a single server or thousands and tens of thousands servers in case of truly complex applications.

How it works. Developers add the code into the information repository. At some point they decide it's time to bring it to production. This can be done on a regular schedule such as every two weeks or just as needed up to the release after each change. In many cases, the number of deployments depends on the automation level, that is to which extent the process is easy to conduct and roll back. At Hexlet deployments are performed almost after each change, approximately 3 deployments a day.

Every time developers decide it is time, they create a release. Release usually refers to a Git tag that marks things to be deployed. Namely, changes added to a master branch after the tag has been created will not affect the tag itself, which means that we are sure about what we will be deploying.

<!-- image -->

For static websites or a separate frontend (HTML, CSS and static files only), deployment comes down to updating the code on the server. In case of backend deployment, the database is connected at the very least. In general, deployment can be a complicated procedure taking decent time. In distributed systems consisting of many independent web services, there is no common deployment at all - each part of the application is deployed (released) independently.

*It is worth mentioning that such PaaS platforms as Heroku take the deployment completely upon themselves. There you just have to make a commit, and then everything will happen by itself. The price for this is the cost of the platform itself.*

## Deployment stages

### Code delivery to the server

There are different options for code delivery to the server depending on its packaging. Sometimes the code is simply copied to the server as a set of files, but this is rare, more often it is updated through Git. Back in the day, the deployment method through standard package managers of Linux distributions was popular. It is also used now, and it is best suited for certain situations.

* Git: *git checkout tag-name*
* Docker: *docker pull image-name:tag-name*
* Apt (package): *apt-install application-package-name*

### Database update

In general, a new application version requires changes in the database. To do this, migrations - special scripts containing database update rules - are run during (or before) deployment. For instance SQL-scripts:

```sql
CREATE TABLE car (
    id INT NOT NULL PRIMARY KEY,
    license_plate VARCHAR NOT NULL,
    color VARCHAR NOT NULL
);

ALTER TABLE owner ADD driver_license_id VARCHAR;
```

### Start and stop

Somewhere in this process, the old version stops, and the new one starts. If we first stop the old version, then execute migrations and start the new version, we will get service downtime. This is a really common thing for many, but it can be sensitive for business and frequent deployments. So, the most advanced projects don't stop during deployment. There is a description below of how to do it.

## Automation

Deployment shall be automated as much as possible; Time To Market, a key characteristic of business-oriented applications, depends on it. The faster and more often we deliver changes to the user, the better. The faster we check hypotheses, the faster we introduce changes, the faster the money invested in development pays its way. Developers are afraid to perform deployment without automation, it becomes a burden that leads to a decrease in deployments and regular stress for the whole team, working long hours.

There are three main automation ways:

1. Using utilities created for specific languages. E.g. it is Capistrano in Ruby, one of the first and best-known utilities of its kind, which has become popular far beyond Ruby. The main problem with such tools is strong binding with the language.
2. Using Ansible with an [already built-in module for deployment](https://docs.ansible.com/ansible/latest/collections/community/general/deploy_helper_module.html). It is ideal for most deployment situations on managed servers.
3. Kubernetes-type orchestration systems. If they are used, you cannot do without automated deployment.

However, even if automation is executed, the task of "running deployment" still remains. Start is also automated. There is a whole approach called [Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery). It is difficult to implement and is not suitable everywhere, but if it works, you can forget about deployment. It is performed entirely on its own without human involvement. The main thing in this option is good monitoring and alerting system.

```yaml
# https://docs.ansible.com/ansible/latest/collections/community/general/deploy_helper_module.html#examples
- name: Initialize the deploy root and gather facts
  community.general.deploy_helper:
    path: /path/to/root
- name: Clone the project to the new release folder
  ansible.builtin.git:
    repo: ansible.builtin.git://foosball.example.org/path/to/repo.git
    dest: '{{ deploy_helper.new_release_path }}'
    version: v1.1.1
- name: Add an unfinished file, to allow cleanup on successful finalize
  ansible.builtin.file:
    path: '{{ deploy_helper.new_release_path }}/{{ deploy_helper.unfinished_filename }}'
    state: touch
```

## Zero Downtime Deployment

If no special steps are taken, each deployment will cause the service to stop (possibly partially). At this time users will either see an error or a message that an update is in progress. But this does not happen on most major Internet services. Why? Due to the implementation of “Zero Downtime Deployment” approach (downtime means service operational downtime).

Zero Downtime Deployment looks as if the service never stops running but it is being updated at the same time. This is achieved by simultaneously running the old version and the new code. Namely, when an application is deployed, the new version arises next to the old one. And only when the automatics make sure that the new version has started and is running, the old version is stopped. The following is required to perform this procedure:

1. Infrastructure. You need a load balancing to switch traffic (incoming connections from browsers or other systems) between the old and the new version of the code. And it is desirable to have at least two servers, although it is not required.
2. Deployment. Zero downtime deployment process is much more complicated than the usual one. The easiest way to execute it is on orchestration systems such as Kubernetes.
3. Code culture. It is impossible to ensure non-stop operation without a certain culture of code writing. For the old and the new version to work simultaneously, you need to keep an eye on all interfaces. It is important to maintain backward compatibility (working with API, database, queues, and, in general, any storage).
4. Database. It shall be backward compatible between the old and the new version. All migrations are forward-only (they cannot be rolled back!) and for addition only. You cannot delete and update (rename, change the type of) columns and tables

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: tomcat-deployment-${TARGET_ROLE}
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: tomcat
        role: ${TARGET_ROLE}
    spec:
      containers:
      - name: tomcat-container
        image: tomcat:${TOMCAT_VERSION}
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /
            port: 8080
```
<!---
## Supplementary literature

* [Подробнее про Zero Downtime Deployment](https://twitter.com/mokevnin/status/1491429628854272002)
* [Инжиниринг в Booking](https://bronevichok.ru/posts/engineering-at-booking.com.html)
* [Стратегии деплоя](https://habr.com/ru/company/flant/blog/471620/)
* [Stateless vs Statefull](https://www.youtube.com/watch?v=WPCz_U7D8PI)
* [Ansible Deploy](https://docs.ansible.com/ansible/latest/collections/community/general/deploy_helper_module.html)
* [Среды разработки](https://ru.hexlet.io/blog/posts/environment)
-->
