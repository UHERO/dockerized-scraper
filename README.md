# dockerized-scraper

## Description
This software scrapes Honolulu county permitting data and stores it in the MongoDB instance.

## How to use

0. `git clone https://github.com/alestainer/dockerized-scraper'

1. Run `npm install` in both hnl_property_scraper and screst folders 

2. Install Docker from https://www.docker.com/get-docker

3. Start Docker and run `docker-machine ip`

4. Create environment variables MONGO_URL, MONGO_USER, MONGO_PASS, and DOCKER_SERVER using your own credentials, address of your MongoDB instance, and docker machine ip you got from the previous step.

5a. In hnl-property-scraper folder run `docker build -t scrimage .`

5b. In screst folder run `docker build -t restimage .`

6. In docker console `docker swarm init --advertise-addr $DOCKER_SERVER`

7. `docker stack deploy -c docker-compose.yml scaledScraper`

8. To check the workers `docker service logs scaledScraper_scraper`
