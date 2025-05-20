---
title: The Frameworks
image:
categories: [Web Development]
tags:
toc: false
date: 2025-03-07 18:53:00
---

Getting my simple web application started and then deployed has been an excellent learning experience. And thank goodness for the fine documentation and guides to the frameworks I've tried. As a bonus, it's all almost free!

<!--more-->

## CSS Frameworks

I wanted to pick a CSS framework with CSS Variable support that I didn't have to compile from SASS/SCSS and would be easy to customize. And I had hoped to be able to do what I needed without JavaScript. That wasn't possible, but otherwise, Bootstrap has worked well for me.

Bootstrap
: A complete system. Bootstrap was created by Twitter and includes about all you'd need to get started on your web app design: CSS, JavaScript, and even icons, if you want them. I thought I wanted to go with a simpler CSS framework, such as Bulma or Tailwind, but I found Bootstrap to be more complete.

Bulma
: A JavaScript-less system. It's modern, well thought out, and I almost chose to use it. But it turns out that I just had to have some JavaScript for the more advanced components I wanted to use and it would be a pain to add individual scripts for each.

Tailwinds
: Utility-based, but without components. Each Tailwind class is a small, focused bit of code -- the result is that you end up adding many, many classes over and over again. It does not include any components, such as a navbar or 'hamburger' menu, but such library are available.

## App Frameworks

I've used a number of different PHP-based CMS systems and wanted to go beyond those and learn about what the big companies are using. Ruby on Rails is my favorite to work with, but in the end I picked Laravel.

Ruby on Rails
: Focused on developer happiness. Among the first full-stack, batteries-included app frameworks, you'll find Rails to be all it claims to be. Big companies use it, GitHub and Basecamp are famous for it, and it really is smooth as butter. The _convention over configuration_ approach is cool and it's amazing how enjoyable Rails is to work with. Sadly, deploying Rails apps on sharded hosting is almost unheard of.

Laravel
: The leading PHP-based framework. And that's for good reason; its documentation is top notch, the framework includes just about anything you could want, and a number of first-party utilities are offered. Since PHP v8.0, the language has shed most of its old school reputation and is now about as modern as the others. The syntax is not a clean as Ruby or Python, but it is well known and well supported.

Django
: For perfectionists with deadlines. Maybe so, but I found it unwieldy and strange. On the good side, Django includes many useful conveniences such as a complete admin interface and user authentication. Python is a wonderful language, but deploying apps written in Python is evil.

Flask
: A Python micro-framework. Well designed and intended for expansion -- which is good because if you want much besides the basics, you'll be hunting for database drivers, admin panels, authentication, and everything in between. If you know what you want to add, you're good, but if not, you'll be hunting and testing for a while. And then you have to deploy your app -- Python deployment nightmares are real.

Masonite
: An interesting alternative to Django and Flask. And it might have gotten more of my attention if not for the difficulty in deploying Python apps and the lack of documentation or support.

## Hosts

This turned out to be the deciding factor for me. I wanted to deploy my test app without a great deal of trouble and I didn't want to pay much to have it hosted. Because Laravel could be hosted on my existing shared hosting plan, it made the decision easier.

HelioHost
: Free, or almost free, shared hosting. This just an amazing host! You can get up and running today for $1 and host several sites. A few more bucks and you can get on a faster server. The whole outfit is run by volunteers who do a fabulous job and I got both Laravel and Rails running there without too, too much trouble. Unfortunately, to keep such low costs, sites are put to sleep when not in use and take a minute or two to spin up when accessed. My little experiments run well there, but if I did anything more serious, the sleeping would be a problem.

Reclaim Hosting
: Inexpensive shared hosting with great technical support. I've been using this company for several years to host my Grav, and now my WordPress, blog. It turns out that with a little work, I can host my Laravel site there, too. Unfortunately, they do not support Rails. But for $35/year, it's a great deal and more than capable of doing what I need.

Reclaim Cloud
: A modern cloud architecture for hosting more advanced apps. This is above my head and would end up costing more than the little bit I wanted to spend each month on an experiment. And even more than that if you need a database such as MySQL. But it will allow hosting almost anything you could want, _if_ you can figure out how to provision and run your own Cloudlet-based server.
