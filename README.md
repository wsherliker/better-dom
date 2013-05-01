better-dom
==========
Modern javascript library for working with DOM. 

JSDoc - http://chemerisuk.github.io/better-dom/

Overview
--------
Everybody who manipulated DOM via vanilla javascript knows that it is an awful API. Current specification has bugs, browser behavior varies etc. The library tries to fix that: it introduces it's own more friednly prototypes for document nodes with developer-fiendly APIs.

Important to note that it doesn't cover everything, for instance there are no methods for working with AJAX.

Goals
-----
* ajax-friendly extensions
* as fast as possible
* clear, safe and useful APIs
* the smallest size

Ajax-friendly extensions
------------------------
Creating widgets has never been so simple. Just use `DOM.extend` to declare a new extension and it starts to work for all current and for any future content. No initialization calls required!

As fast as possible
-------------------
DOM is usually the main bottleneck of javascript programs. That's why performance question should be on the top for any library that works with it.

Browser support
---------------
* Chrome
* Firefox
* Opera
* IE8+