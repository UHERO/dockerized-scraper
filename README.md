# dockerized-scraper

## Description
This software scrapes building permit data and stores it in a MongoDB instance.

## How to use

1. Run `npm install` in both property_scraper and screst folders 

2. Install Docker from https://www.docker.com/get-docker

3. Start Docker and run `docker-machine ip`

4. Create environment variables MONGO_URL, MONGO_USER, MONGO_PASS, and DOCKER_SERVER using your own credentials, address of your MongoDB instance, and docker machine ip you got from the previous step.

5. In property-scraper folder run `docker build -t scrimage .`

6. In screst folder run `docker build -t restimage .`

7. In docker console `docker swarm init --advertise-addr $DOCKER_SERVER`

8. `docker stack deploy -c docker-compose.yml scaledScraper`

9. To check the workers `docker service logs scaledScraper_scraper`
