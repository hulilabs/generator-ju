# generator-ju
Easily generate Ju webapps and components using [Yo](https://www.npmjs.com/package/yo)

## Creating a new project
* [Install yo](https://www.npmjs.com/package/yo#usage)
* Install this generator
```
npm install -g generator-ju
```
* Run CLI util and answer _all_ the questions
```
yo ju
```

## Running your project using docker
We provide a [docker](https://www.docker.com/) container with [nginx](https://www.nginx.com/) webserver, as it is required to load resources (like HTML files) from the browser. To use it:

1. Install [docker](https://docs.docker.com/engine/installation/)
2. Install [docker-compose](https://docs.docker.com/compose/install/)
3. In the generated project root, run:
```
docker-compose up -d
```
4. If everything was fine, you can go to [http://localhost:8080](http://localhost:8080) and you should see a message saying "nihao Ju!"

Please note that you can also test your app by opening the `index.html` file located at `your_project_root/public`, but you won't be able to dynamically load resources.