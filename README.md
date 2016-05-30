# Shadow of the Demon Lord - Character Generator

[![Build Status](https://travis-ci.org/ScottMaclure/sotdl-chargen.svg?branch=master)](https://travis-ci.org/ScottMaclure/sotdl-chargen)


Hosted here:

http://scott.maclure.com.au/sotdl-chargen/

More about SotDL here:

http://schwalbentertainment.com/shadow-of-the-demon-lord/

## Local Dev

```
npm start
```

http://localhost:8080/webpack-dev-server/

Read more about webpack-dev-server here:

https://webpack.github.io/docs/webpack-dev-server.html

## Deploying to gh-pages

Assumes `sotdl-chargen-gh-pages` folder is sitting next to `sotdl-chargen`, with `gh-pages` branch active.

- From `sotdl-chargen`
    - `git fetch && git fetch --tags && git rebase`
    - `npm version minor` (or `major` or `patch`, depending)
    - `npm run build` (check to ensure test suite passed)
    - `git push && git push --tags`
- From `sotdl-chargen-gh-pages`
    - `git pull -r`
    - `cp -pr ../sotdl-chargen/public/* .`
    - `git commit -am "gh-pages publish."`
    - `git push`
    - View <http://scott.maclure.com.au/sotdl-chargen/>
