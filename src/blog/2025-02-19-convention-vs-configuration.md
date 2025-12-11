---
title: Convention vs. Configuration
date: 2025-02-19 12:09:00
categories: [Web Development]
tags: [Ruby on Rails, Laravel]
---

Ruby on Rails is well known for its philosophy of _convention over configuration_. And there are definitely benefits to that approach. But are there also significant disadvantages?

<!--more-->

Rails' _convention over configuration_ is basically the opposite of Django's and Laravel's _explicit over implicit_. Relying on convention reduces a certain amount of programmer overhead when writing code because Rails 'knows' what to do in many circumstances without have to be 'told'. For example, there's no need for PHP's `uses` in Laravel nor Python's `import` in Django. And Rails' routes 'know' about controllers, and controllers 'know' about views without having to be 'told'. Views even know about their Controller's variables and can use them without them having to be passed.

Less code means fewer places for mistakes and faster reading. But it also means that programmers have to understand those conventions and what that means in code. That's a big disadvantage to _convention over configuration_.

A programmer with a strong background in other frameworks will take a while to get up to speed with Rails, but an experienced Rails developer understands right away. I tend to jump around from one framework to another experimenting and then come back to Rails needing to relearn those conventions. Laravel and Django code may be more verbose, but its meaning is clearer because everything is spelled out.

Here's an example of how Laravel and Rails use their database abstractions (Eloquent ORM in Laravel and Active Record in Rails). To access the first record of a database and assign it to a variable, Laravel uses:

```php
$color = DB::table("colors")->find(1);
```

-- go to the database table `colors` and find the first record. In Rails, that's:

```ruby
@color = Color.first
```

-- Rails 'knows' there's a table named `Color` in the database and gets the first record.

Creating a Laravel named Route is:

```php
Route::get("/colors", [ColorController::class, "index"])->name("colors");
```

-- the url `/colors` routes to the ColorController's `index` method and is named `colors`. For Rails you use:

```ruby
get "colors", to: "colors#colors"
```

-- Rails knows' that there's a Controller named `colors_controller` and that it has a method `colors`. All Rails routes are automatically named, no extra syntax required.

This might partially explain why I have more trouble finding solutions to my novice problems in Rails over Laravel. The combination of documentation and community resources for Laravel get me to an answer faster. And I might even have fewer problems in Laravel with its more explicit syntax.
