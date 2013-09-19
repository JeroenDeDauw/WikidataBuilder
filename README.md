# Wikidata builder

Building tool for creating builds of the Wikibase software for the Wikidata project.

[![Build Status](https://travis-ci.org/JeroenDeDauw/Wikidata.png?branch=master)](https://travis-ci.org/JeroenDeDauw/Wikidata)

## Creating a build

Requirements:

* [Node.js](http://nodejs.org/) 0.8 or later
* [npm](https://npmjs.org/) 1.1 or later
* [PHP](http://php.net/) 5.3 or later
* Debian like environment (production code might run on Windows, some tests do not run on Windows)
* Suggested: grunt-cli (npm install -g grunt-cli)

Steps to create a build:

* npm install
* grunt build

In case grunt-cli is not installed, replace "grunt" by "./node_modules/.bin/grunt"

Other commands:

* Running linting and tests: grunt integrate (or npm test)
* Removing the builds: grunt clean
* To see all available commands: grunt --help

## Build structure

Builds are placed in build/. 

## Using a build

Requirements:

* PHP 5.3 or later
* A recent [MediaWiki](https://mediawiki.org/) installation

A build can be seen as a big MediaWiki extension that has no further dependencies.
