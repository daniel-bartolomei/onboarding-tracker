1. build App:

    A. to run the app from a docker container:

    #### Run in docker on Windows

    ```bash
    docker build -t project-plato-image .

    docker run -d --name project-plato-container -p 3000:3000 project-plato-image
    ```

    B. to run the app normally:

    ```bash
    npm install
    npm start
    ```

2. start App: go to http://localhost:3000


## Recording:
![](recording.gif)
