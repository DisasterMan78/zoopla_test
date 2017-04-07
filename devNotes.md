# Start Server

`$ node server/nodeserver.js`

# Access Server

In browser:
http://localhost:8080/

Cucumber support files from
https://github.com/Matt-B/cucumber-js-selenium-webdriver-example

Install Chromedriver from http://chromedriver.storage.googleapis.com/index.html
Be sure to add path to chromedrive file to your PATH variable

Run tests:
`node_modules/.bin/cucumber-js`

Express used to enable full HTML templates - 'vanilla' Node with handlebars wouldn't play nicely

Gulp and dependencies are locally installed and run to make this package portable and not interfere with any users globally installed packages.

```
  "scripts": {
    "gulp": "gulp"
  }
```
in package.json enables running gulp with `$ npm run gulp sass:watch`

TODO: By no means comprehensive!

Gulp - reload node on save for relevant files - autorun tests
     - Minify CSS
     - Minify & Concatenate JS
     - Optimise images

JS   - AJAX Error handling
     - Load pending / loading indicators.
     - Back routing - reload /search

Images - Use different source for different breakpoints - some images are far too poor quality at large sizes
       - Photos should be double res and highly compressed - this ensures pixel density for retina, while keeping file size down

In a lot of places I've written things to be expanded upon and reused as if this were the starting point of a real project. In others I have cut corners to save time while fulfilling the requirements.

I quite enjoyed the test - I aimed for writing tests first which is a satisfying process.
I'm not sure how long it took - significantly more than a couple of hours, but that time was in bits and bobs between endless phone calls, emails, working on a print flyer for an urgent deadline and minor distractions like sustenance and human interaction.
There was a fair amount of devops debugging included, which is usually only an overhead at the very start of a project.