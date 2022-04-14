---
title: How to search for technical information
subtitle: Asking the right questions is half the battle.
description: Most of the problems faced by a beginner have already been solved and described. You just need to learn how to find these solutions and answers.
image: "assets/images/how-to-search/how-to-search-title.png"
author: Kirill Mokevnin
---

**One of the most important skills for a programmer is the ability to find answers and solve problems using Google. A lot of the problems that beginners face have already been solved and described before. All you need is to learn how to find these solutions and answers.**

## Websites

The main sites to get your questions answered:
* [GitHub](https://github.com)
* [Stackoverflow](https://stackoverflow.com)

## Language

As practice shows, at the beginning most programmers try to search for information in their native language. Sometimes you can find the answer this way, but more often — no. **The universal language for programmers is English** – the whole world speaks it. The amount of information in the English-speaking segment is noticeably higher than in any other. Besides it’s a lot fresher. Learn to formulate your thoughts more accurately, and while searching - compose a set of words in English. This way you will master the terminology faster.
{% include banner.html name="site-code-basics" %}

## Search engine

To continue the previous section it’s important to note that the best way to search for information is using Google. Although local search engines are fine for certain tasks, the English-speaking segment isn’t their main market, and they are much inferior to Google. For example, you will notice that after a while Google adapts to your queries and starts showing more relevant links. It can understand which programming language you prefer and will output the related answers.

Another important point: Google search works even better than site search. If you need something, for example, on Github, it's better to make the proper Google query to get a better and faster result. The below section "query language" provides further details.

## Query language

Each search engine has a query language. It includes special search operators allowing you to specify more precisely what you want. Here are a few common search techniques:

* `site:stackoverflow.com how to test react code` — this search will be performed through [Stackoverflow](https://stackoverflow.com/).
* `add class to element -jquery` — a hyphen denotes stop words, therefore, all variants excluding these words will be found.
* `"immutable js"` — double quotes indicating to look for an exact match.

The full list can be found [on the Google support site](https://support.google.com/websearch/answer/2466433?visit_id=1-636424030566191968-2246914586&p=adv_operators&hl=en&rd=1).

## Library search

The vast majority of libraries are located (they say, "hosted") on [GitHub](https://github.com). Let’s say you need to find a library for executing HTTP requests in JavaScript. To do this you can form the following request: `github js http client`. Google will show you a dozen links to different repositories. Of course, you can also use the query language: `site:github.com js http client`, but generally it's enough to simply indicate `github`.
The same search strategy can be used for well-known libraries: `github express`.

## Search by error message

Before you search by error message, it’s necessary to understand where *the error message* is here exactly. Although the output contains a lot of relevant information, it’s not a description of this error. For example:

```sh
There was 1 failure:
1) App\SolutionTest::testResult with data set #2 (0, 2, 2, 1, 2)
Failed asserting that '1' matches expected 0.
/usr/src/app/tests/App/Tests/SolutionTest.php:15
FAILURES!
Tests: 3, Assertions: 3, Failures: 1.
Makefile:2: recipe for target 'test' failed
make: Leaving directory '/usr/src/app'
make: *** [test] Error 1
```

The output has a lot of text but there is only one real error message: `Failed asserting that '1' matches expected 0.`. In this particular case, it’s approximately clear what is wrong and where to look (the file and line are indicated in the stack trace below). But so happens not always. If you correctly identified the error message, you may also want to do one thing. Often such messages are personalized: they take specific values of parameters that relate to your environment. For example, paths to files. Hence, if you search throughout the error message, then most likely Google won’t find anything. For example, in the message above, such parameters are `'1'` and `0`. If you clear the phrase, there will be `Failed asserting that matches expected`. That’s what you have to look for. You can also add language name: `php Failed asserting that matches expected`.

## Behavior search

Sometimes an error message is either missing or cannot lead to a correct answer (since it’s a consequence, not a cause). At this point, you need to be creative and make a sentence in English. A set of keywords will also work. If the search wasn’t successful then try to add `site:stackoverflow.com`. Stackoverflow is a unique place having answers to almost all similar questions.
If you know which library or program exactly the error belongs to, it would be useful to find its repository on Github and study the Issues section. If there definitely is an error, and it’s relevant, then most certainly someone has already mentioned it.

## Official documentation

Search is good but don’t forget to look into the official documentation for tools (including programming languages). Official (and not only) documentation, as a rule, is divided into following types:

1. [Getting Started](https://guides.rubyonrails.org/getting_started.html) is a small (not always) step-by-step guide helping to create a minimal working version and quickly start working with the tool to see it in action. It’s the first document you need to look for.
1. [Guides](https://laravel.com/docs/5.5/routing) are descriptions of the tool components. They are written in a narrative form, so it's not hard to read them from start to finish. They make it easier to learn large blocks of information.
1. [API](https://bit.ly/2uq98XM) is a concise documentation on all possible application functions. It is more intended for finding answers to specific questions.
1. [Tutorials](https://blog.codeship.com/an-introduction-to-apis-with-phoenix/), in contrast to quides, are aimed at various options for using the tool.
