# generator-ju
Easily generate Ju webapps and components using [Yo](https://www.npmjs.com/package/yo)

## Getting started
From zero to _nihao world_ in a few steps.

### Creating a new project
* [Install yo](https://www.npmjs.com/package/yo#usage)
* Install this generator
```
npm install -g generator-ju
```
* Run CLI util and answer _all_ the questions
```
yo ju
```

#### Running your project using docker
We provide a [docker](https://www.docker.com/) container with [nginx](https://www.nginx.com/) webserver, as it is required to load resources (like HTML files) from the browser. To use it:

1. Install [docker](https://docs.docker.com/engine/installation/)
2. Install [docker-compose](https://docs.docker.com/compose/install/)
3. In the generated project root, run:
```
docker-compose up -d
```

#### Testing the generated app
If the installation was fine, you can go to [http://localhost:8080](http://localhost:8080) and you should see a message saying "nihao Ju!".

Please note that you can also test your app by opening the `index.html` file located at `your_project_root/public`, but you won't be able to dynamically load resources.

#### Next steps

Refer to the Github repositories of Ju framework for details about app development:
* [ju-shared](https://github.com/hulilabs/ju-shared) for Object Oriented Javascript and utils
* [ju-mvc](https://github.com/hulilabs/ju-mvc) for dynamic webapps
* [ju-components](https://github.com/hulilabs/ju-components) for web components development
* [ju-model](https://github.com/hulilabs/ju-model) for progressive data management

### Generating Ju components
Run `yo ju:components` and answers all the questions.

You will obtain a basic component that can handle resources and remote data.

### Generating Ju Object-Oriented Javascript modules
Run `yo ju:module` and answers all the questions.

You will obtain a class like structure, either using plain prototypes (module), a class with inheritance, singleton and static members or everything plus observer pattern.

### Generating Ju Models
Run `yo ju:model` and specify the Model Definition name, the file name and path, and the middleware you wish to add (AJAX and WebStorage providers are avilable now, there are more in the way).

You will obtain a Model definition, that you can modify to inject middleware to every API method, to instatiate it later and perform data operations.

### Generating README files
Run `yo ju:readme` and follow the steps to generate a README markdown file for your library (:

It will include common sections, like getting started, references and all the stuff you may want to make a good documentation