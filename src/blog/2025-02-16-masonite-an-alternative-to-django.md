---
title: Masonite, an Alternative to Django
date: 2025-02-11 10:09:00
summary: Ruby on Rails, Laravel, and Django are the heavy-hitters in full-stack web development frameworks written in Ruby, PHP, and Python, respectively. Rails has been around since 2004, Laravel since 2011, and Django since 2005. I recently came across Masonite (released in 2018) and had to look into it.
image:
categories: [Web Development]
tags: [Masonite]
---

Ruby on Rails, Laravel, and Django are the heavy-hitters in full-stack web development frameworks written in Ruby, PHP, and Python, respectively. Rails has been around since 2004, Laravel since 2011, and Django since 2005. I recently came across Masonite (released in 2018) and had to look into it.

<!--more-->

The Masonite framework is built with Python and so is a Django competitor. It borrows heavily from Laravel and I think that's a good thing, overall. Django is a bit of an odd duck in its code organization -- it expects there to be multiple small apps contained within one project. Masonite is an MVC framework (Django is MTV - Model, Template, View), and has a code scaffolding feature that Django does not.

Masonite uses `python craft` in place of Laravel's `php artisan` to create the boilerplate code for such things as controllers, views, models, and database migrations. Ruby on Rails has the same ability using `rails generate`. Django doesn't have any scaffolding out-of-the-box, but it can be added.

It's cool, but not all that meaningful, I suppose, that you can get Masonite up and running in four lines:

```bash
pip install masonite
project start .
project install
python craft serve
```

You get some of the nicer syntax of Ruby with the _explicit over implicit_ philosophy of Laravel. Just as Laravel and Rails do, Masonite prides itself being developer-focused and full-featured.

Creating a Route to a View shows mild syntactical differences between PHP and Python, in this case.

Laravel:

```php
Route::view("/home", "home")->name("home");
```

Masonite:

```python
Route.view('/home', 'home').name('home'),
```

Rails doesn't have the concept of a simple View Route. All Routes go through Controllers. Django calls views Templates and has no such simple Routes.

In creating a named Route through a Controller (or View in Django's case), the syntactical differences are sharper, especially for Rails.

Laravel:

```php
Route::get("/colors", [ColorController::class, "index"])->name("colors");
```

Masonite:

```python
Route.get('/colors', 'ColorController@index').name('colors'),
```

Django:

```python
path('home/', home, name='home')
```

Rails:

```ruby
get "colors", to: "colors#colors"
```

Rails Routes automatically have names, so there's no need for more typing.

Having said all that, I find that Python syntax is nicer than PHP's, but not as elegant as Ruby's. Which is getting away from the point that Masonite is more like Rails than it is like Django. So if you don't like some of Django's concepts, but you like Python, you may well be happy with Masonite.

Django also goes against the grain with its MVT architecture. Django Models are like everyone else's Models. Django has Views where Masonite has Controllers. And Masonite's Views are Django's Templates.

If you stick with Django long enough, those differences won't matter. But for a while, especially if you have experience with an MCV framework, you'll find yourself constantly making the translation.

Both Django and Masonite are 'batteries included' frameworks. Django just has a few more batteries. Notably, Masonite has no built-in logging or Admin. And there's more information available for Django in its extensive documentation and wide community support.

Experienced Django developers are likely to have little interest in Masonite beyond some weekend experimenting. But for developers thinking about a Python-based framework, Masonite has a lot to offer.
