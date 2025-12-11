---
title: What is Clean Syntax?
date: 2025-02-03 21:20:00
categories: [Web Development]
tags: [Ruby on Rails, Laravel]
---

Programmers talk about _clean syntax_ and say this or that language or framework has such a property. I've noted that Ruby and Ruby on Rails have this thing. So what is it?

<!--more-->

I think it means the syntax is easy to read and easy to follow. Further, it has few, if any, delimiters. Delimiters such as `[`, `(`, and `{`. Looking at any JavaScript code shows exactly what I referring to -- nested `[`, `(`, and `{` everywhere!

Because I've been working with Laravel and Ruby on Rails lately, I have examples from those.

Both of these code snippets do the same thing -- read the first record from a database.

Laravel is explicit in naming the table of interest and there's a fair number of expressions and parameters:

```php
$color = DB::table("colors")->find(1);
```

Rails, on the other hand, takes just a few expressions to get the job done:

```ruby
@color = Color.first
```

Both work just fine and neither is 'better' than the other. It's just that the Rails syntax is so much _cleaner_.

Another example is the way in which the two send the user to a view with a variable to use from a controller.

Laravel:

```php
return view("colors", ["color_hex" => $color_hex]);
```

Rails requires nothing at all. Rails controller methods 'know' where their views are and just send the browser there. Views 'know' about their controllers' variables and have access to them automatically.

One more. Both of these snippets define a route with a name.

Laravel:

```php
Route::get("/colors", [ColorController::class, "colors"])->name("colors");
```

Rails:

```ruby
get "colors", to: "colors#colors"
```

Here, Rails 'knows', since the definition is in the `routes.rb` file, that it must be a route definition. And it 'knows' there's a controller `colors` with a method `colors`.

So combining Rails _convention over configuration_ with Ruby's simple syntax results in less code that is easier to read. The downside is that you must understand Rails' conventions.

Needless to say, once you've worked with PHP and Laravel for a while, you eye will not notice the complexity of the code quite as much. And you may actually prefer being explicit about what you want the code to do.

But I'm a hobbyist without the experience to digest a block of PHP or to know what classes and namespaces to include as quickly as the professionals can. So I'm liking Ruby on Rails, so far.
