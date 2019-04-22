# Build
To build clone this repository down, open up your favorite terminal and run:

For macOS:
```
./gradlew bootRun
```

For windows:
```
./gradlew.bat bootRun
```

## Build the angular app
To build the angular app, you must have npm installed:

For macOS:
```
$ brew install npm
$ npm install -g @angular/cli
$ cd frontend/ && ng build
```

Open the index.html generated under `frontend/e2e/index.html`

For windows:
You're on your own champ.

## Directory breakdown
Everything in `src/` is the java app. Everything under `frontend/` is the angular app. 