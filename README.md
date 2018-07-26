# dockerized-scraper

## Description
This software scrapes Honolulu county permitting data and stores it in the MongoDB instance.

## How to use

1. run `npm install`

2. Install Docker from https://www.docker.com/get-docker

3. Start Docker and run `docker machine ip`

4. Create environment variables MONGO_URL, MONGO_USER, MONGO_PASS, and DOCKER_SERVER using your own credentials, address of your MongoDB instance, and docker machine ip you got from the previous step.

5. In docker console `docker swarm init`

6. `docker stack deploy -c docker-compose.yml scaledScraper`

7. To check the workers `docker service logs scaledScraper_scraper`
