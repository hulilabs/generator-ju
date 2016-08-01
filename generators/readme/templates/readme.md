#Introduction
[SAY GOOD STUFF TO GET PEOPLE INTERESTED HERE]<% if (addGettingStarted) { %>

# Getting started
[WHAT TO DO FIRST]

## Requirements
- [REPLACE WITH A REQUIREMENT]

## Installation
[INSTALLATION OVERVIEW]

### [INSTALLATION STEP]
1. [do this]
2. [then this]

## Configuration

### [STUFF TO CONFIGURE]
1. [do this]
2. [then this]<% } %><% if (addModules) { %>

# Modules
[OPTIONAL. ADD IF MODULES HAVE SEPARATE DOCS]

- Library Name : description
    - [How to use it?](#) should be a link to the readme file
    - [How it works?](#) should be a link to the wiki<% } %><% if (addApiReference) { %>

# API reference / How to use it. / Usage
[USE IF YOU NEED TO EXAPLAIN API USAGE]

## API endpoint example
[THIS ENDPOINT DOES API STUFF]

###### Params
Param | Required | Type | Description
---- | --- | --- | ---
[PARAM] | Yes | String | [A PARAM]
[PARAM2] | Yes | String| [ANOTHER PARAM]

###### Example
```javascript
api.doStuff({
    param : paramValue,
    param2 : param2Value
}}, function(error) {
    if (error) {
        log(error);
    } else {
        ...
    }
});
```<% } %><% if (addTroubleshooting) { %>

# Troubleshooting

## Issue:
Must explain how to resolve the issue.<% } %><% if (addFaq) { %>

# FAQ

## Why?
Because this is.....
<% } %>
<% if (addReferences) { %>
# References

## Wiki
If you want to know more about how it works? please check this [Wiki](https://github.com/hulilabs)

## What is bla?
- [Introduction to ..](http://www.funcage.com/gif/)
- [Understanding ..](http://www.funcage.com/gif/)

## Why use bla?

- [The Ins and Outs of bla](http://www.funcage.com/gif/)
- [Why the need for bla](http://www.funcage.com/gif/)

## Examples and tutorials

- [Using bla in ..](http://www.funcage.com/gif/)
- [Architecting a bla application](http://www.funcage.com/gif/)<% } %><% if (addLicense) { %>

#License

TBD
<% } %>