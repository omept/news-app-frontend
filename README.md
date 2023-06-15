# Dockerized NewsFeed Frontend App Built With Next.js



# Set-up with Docker

Follow the instructions below to run the application

## Usage

To get started, make sure you have [Docker installed](https://docs.docker.com/docker-for-mac/install/) on your system, and then clone this repository.

Next, navigate in your terminal to the directory you cloned this repo and execute the instructions below to create .env.local file. 

*** Update the `NEXT_PUBLIC_BACKEND_API` key if you changed the port of the backend api. 

```bash

$ cd <application-name>/src

$ cp .env.example .env.local # Update database credentials

$ cp .. # Go back one folder to get to root

$ docker-compose up -d --build # bring up service
```


Use the logs to verify when the build has successfully completed. It can take up to 3 minutes before the app is available.

Next, open browser and visit:

-   `localhost:3001`

---

