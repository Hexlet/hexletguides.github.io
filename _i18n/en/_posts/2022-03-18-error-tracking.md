---
title: What is Error Tracking?
subtitle: A fast way to track errors in a working application
description: Errors are unavoidable. So you should be able both to track and prevent them. There are services which help manage this task
image: "assets/images/error-tracking/error-tracking.png"
author: Kirill Mokevnin
---

There are no programs without errors. Their number can be reduced with the great help of a type system, linters, tests, or even a whole department of testers, but it’s impossible to remove them completely. This is the reality we must face; the best thing we can do is learning how to track these errors and fix them as soon as possible.

## How you shouldn’t work with errors

It's quite common in development: programmers write some code, release a new version of a website or application and move on. In the meantime, some users start experiencing problems: something freezes or crashes, issues with sending forms out, data being displayed incorrectly, and so on. This may last long enough for someone to lose patience and finally complain to the support service. Then, along the chain, it makes it to the programmers, and they try to find the root cause behind the error, when it began or who caused the bug to happen. The clarification of all the details begins, and most likely with the participation of users who are willing to help. With this approach, a huge number of errors remain unnoticed for a very long time, and the worst part is that users leave. Can we avoid this? Clearly, we can.

## How to work with errors

There are plenty of services called Error Trackers. They collect information about occurring errors in real time and notify the development team. These services integrate with a multitude of available platforms, from televisions to mobile applications and websites (both frontend and backend).

![Rollbar Dashboard](/assets/images/error-tracking/rollbar-dashboard.jpg)

Above is a screenshot of a dashboard service [rollbar.io](https://rollbar.io/) which we use for all our Hexlet projects. You can track the frequency of critical errors in the last 24 hours for each project. This graph with performance metrics helps you diagnose issues immediately. Below is the output of specific project's errors. According to the icons, most of the errors are caused by JavaScript.

![Rollbar Project](/assets/images/error-tracking/rollbar-project.jpg)

Each such service provides libraries for different languages and platforms, they are usually added to the code and called on in case of errors. These libraries send not just the error but also additional useful information about the environment. Such information may include data about users, their browsers, application settings, and more.

Ideally, that kind of library is already [integrated](https://docs.rollbar.com/docs/rails) into a framework, for example, Rails. Then you hardly have to configure anything. You just connect the library to the framework as a plugin and it will start detecting errors by itself, without extra interaction. If there is no such integration, well.. then you'll have to write some code to link your application to the library. You can find more information on how to do this in the service documentation. [Here](https://docs.rollbar.com/docs/react) is an example of Rollbar integrated into React. Once the connection is successfully established, the detected error will look like this:

![Rollbar Error](/assets/images/error-tracking/rollbar-error.jpg)

If we take a closer look at the top menu, we can see that tabs provide very useful information about errors.

But detecting an error is only half of it. You then need to notify the team somehow without flooding everyone with spam. The thing is that errors usually don't occur just once. If it’s a common error and the number of users is high, then you can easily catch one error thousands of times per minute. And if there is a notification for each occurrence (by email or in Slack), then such a service wouldn’t work for long.

![Rollbar Error](/assets/images/error-tracking/rollbar-notifications.jpg)

That’s why such trackers work more effectively. When the error occurs for the first time, the service notifies the development team with real-time alerts so that they can quickly address it. If it happens once again, then no more alerts. At least not every time. For example, alerts can be sent at the first, tenth, hundredth, thousandth and so on as they occur. This is the first part. Further, after updating the application version, trackers label errors as “corrected”. This makes it much easier to track errors that developers either forgot to fix or did not fix properly. Most often, alerts start pouring in after the deployment. In order to prevent future issues, you need to notify the tracker service about deploys. You can read more about this in the [documentation area](https://docs.rollbar.com/docs/deploy-tracking) of the relevant tracker.

## Conclusion

Error trackers are very important tools, and it’s hard to imagine production without using them. At that one of many services or specialized software can act as an error  tracker (for example, [Sentry](https://github.com/getsentry/sentry)), a service installed on servers in case of high security requirements.
