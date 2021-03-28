# Heroku setup

- This Express server is still fucking slow! It can only handle 9.5k QPS while
  my Go application could handles 40k on the same machine (Mac Pro 2019, 2.6
  GHz, 6-Core i7).

## Other notes about FCC remote test

- The test is run right on the browser, thus, most FCC boilerplate projects need
  to allow request come from https://www.freecodecamp.org/ origin.

- The test is mostly rexgex matching our code to find expected patterns. This
  means **it's very sensitive with our coding styles** (your code works fine,
  but the test still fails). In my opinion, FCC code has terrible styles (use
  `var` instead of `let` or `const`, no blank line between `app.route`, `if`
  block, ...). There should be a course about coding style or general Software
  Engineering practices (I might contribute such course ... one day).

- [localtunnel](https://localtunnel.github.io/www/) is a cool tool. It doesn't
  have much features like ngrok, but look likes it have a more generoues
  connection rate limit. On startup, the local page won't be immediately
  accessible (unlike ngrok). We much open the page and click the Accept button
  first (to declare that we know the link is serve from someone's local machine
  and might be dangerous). FCC in browser tests won't work until we do that.
