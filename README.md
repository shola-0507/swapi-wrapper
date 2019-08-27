# swapi-wrapper

NodeJS rest api to get star wars movie data from https://swapi.co

# API documentation.

Base url for deployed version of this project: https://swapi-stack.herokuapp.com/

HTTP verb | endpoint | Parameters (query parameters unless otherwise specified) | Response | Description
|------|------|------|-----|-----|
GET | api/v1/films | None | success: boolean, message: [success or an error message (if any)], data: [all star wars movies data]| This resource fetches all star wars films with number of comments (anonynous). 
GET | api/v1/people | **sortBy**: sorts movies by either gender, name, height e.g **api/v1/people?sortBy=gender**<br/> <br/> **sortIn**: used along with sortBy. Can either be desc descending order] or asc: [ascending order]; <br/> it defaults to desc if not passed. e.g **api/v1/people?sortBy=gender&sortIn=asc** <br/> <br/> **gender**: filters movies by gender- male or female e.g **api/v1/people?gender=female** | success: boolean, message: [success or an error message (if any)], data: [all star wars characters]| This resource fetches all star wars film characters. 
GET | api/v1/film/:id/people/ | **sortBy**: sorts movies by either gender, name, height e.g **api/v1/people?sortBy=gender**<br/> <br/> **sortIn**: used along with sortBy. Can either be desc descending order] or asc: [ascending order]; <br/> it defaults to desc if not passed. e.g **api/v1/people?sortBy=gender&sortIn=asc** <br/> <br/> **gender**: filters movies by gender- male or female e.g **api/v1/people?gender=female** <br /> <br /> **id**: a Url parameter that represents the episode_id for which to get comments | success: boolean, message: [success or an error message (if any)], data: [all star wars characters with the film id]| This resource accepts url parameter- **id** and fetches all star wars film characters with that film episode_id.
GET | api/v1/film/:id/comments | **id**: a Url parameter that represents the episode_id for which to get comments | success: boolean, message: [success or an error message (if any)], data: [Star wars movie comments]| This resource fetches all comments for the requested star wars movie 
POST | api/v1/film/:id/comments | **id**: a Url parameter that represents the episode_id for which to get comments <br /> <br /> **comments**: to be send along with the request body. Should be of type string and must be less than 500 characters | success: boolean, message: [success or an error message (if any)], data: [Star wars movie comment]| This resource fetches posts comments to the requested star wars movie

# Development and Testing

For testing this project locally.
 - Enusre you have docker installed and running on your machine.
 - Pull the master branch of the codebase
 - Convert the env.example file to .env
 - Update the Database configuration environment variables
 - Run *docker-compose up* in your terminal
 
To run test suite
  - Run *npm install*
  - Run *npm run test*
