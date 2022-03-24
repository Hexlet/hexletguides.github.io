---
title: Code Complete: Naming In Programming
subtitle: What is the most difficult part of being a programmer? Naming variables.
image: "https://cdn2.hexlet.io/derivations/image/fill_webp/850/400/eyJpZCI6ImY1MmRjZTI3MGU5MjBlYjQwMTYyZGFmOWMxYjIwMmFhLmpwZyIsInN0b3JhZ2UiOiJzdG9yZSJ9?signature=8af4bfea19873ebac566f78594f1675b59c4a0bbc45d3a8cb120fc2aadbcbcd1"
author: Kirill Mokevnin
---

This joke seems to be popular for a reason among programmers. Naming often causes a lot of struggle. And indeed, how we name our entities (functions/variables/constants/classes/modules) is of great significance, because most of the time we read code, not write.

In this article, I will analyze the most general rules taken among developers. For examples I’m going to use  `javascript` , but it’s not that big a deal. Recommendations apply for every language.

## Naming notations
Before we turn to semantics, let's take a look at the syntax. There are several popular naming notations:

- Camel case (a word with capital letters except the first one): `myClass`
- Snake case (underscore is the separator): `my_const`
- Kebab case (hyphen is the separator): `my-data`
- [Hungarian Notation](https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BD%D0%B3%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F_%D0%BD%D0%BE%D1%82%D0%B0%D1%86%D0%B8%D1%8F) stands completely apart

In practice, there are much more of them, although many have outdated and are not used anymore, or are used extremely rarely (at least, hardly many remember `COBOL-CASE`).

Which begs the question, what naming style to choose? The answer is simple. Each specific programming language has a generally recognized, and often an official coding convention. That should become your guideline. Take some time to find a standard for your language and go through it, usually it can be found on GitHub and contains a large number of good examples.

## Size does matter
Those who took lab programming tests must clearly remember that most variables were single-letter. Interesting fact, in the first programming languages identifiers were the same single-character as mathematical notations. The first language, presumably, that started using words as identifiers was Lisp. Much has happened since then (the sixties) and the use of one-letter identifiers in today’s world is considered bad manners.

And yet they can and should be used in some situations. These are generally counters and indexes.

## Actions and values
Compare this:
```
bed(); // bad
sleep(); // good
```
When we implement a function, we describe some action, and actions in natural languages are expressed by verbs. So it must be obvious that the function name is also a verb. Even though this rule is simple and reasonable, beginners often refer to functions as nouns.

Usually there is no such problem with variables, no one uses verbs to name them, but just in case: values should be expressed in nouns.

## Booleans
Let me remind you that boolean is a data type checking the truthiness of expressions, it has only two possible variables: `true` and `false`.

In most languages, booleans are prefixed with `is`.
```
isEmpty();
isValid();
isBusy();
```

But not all languages follow this rule. In most Lisp languages, as well as in `ruby` (which borrowed this from Lisp), a question mark ? is used at the end of the word:
```
empty?
valid?
busy?
```
Considering that in these languages a function call does not require parentheses at the end, this form feels especially natural and more readable.

## Affirmative statements
Not all booleans can be expressed using `is`. For example, how to ask a question to check if there is an odd number in the list? In such situations, it’s agreed to use `has`:
```
node.hasChildren();
```
## Quantity
If you need a variable that contains a quantity of something, use this combination: plural entity + `count`.
```
symbolsCount
peopleCount
```
And this is an example of how you shouldn’t name a variable denoting quantity:
```
errors;
```
Such naming is certainly misleading. An entity in the plural should always denote only a collection.

## Examples 
```
// Data normalization 
normalizeDomainName('hexlet.io');

// Extracting part of the data 
getName(user);
getDomainFromEmail('support@hexlet.io');

// Getting an array with errors 
const errors= validate(user);
if (errors.length> 0) {
  // ...
}

// Calculations 
calculateDiff(first, second)

// Access verification 
canSwim(user)
canViewProfile(user)
```
