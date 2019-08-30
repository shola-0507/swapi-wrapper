# swapi-wrapper

NodeJS rest api to get star wars movie data from https://swapi.co

# API documentation.

Base url for deployed version of this project: https://swapi-stack.herokuapp.com/

HTTP verb | endpoint | Parameters (query parameters unless otherwise specified) | Response | Description
|------|------|------|-----|-----|
GET | api/v1/films | None | success: boolean, message: [success or an error message (if any)], data: [all star wars movies data]| This resource fetches all star wars films with number of comments (anonynous). 
GET | api/v1/people | **episodeId**: an integer value representing the episode_id for which to get characters e.g **api/v1/people?episodeId=1**<br/> <br/> **sortBy**: sorts movies by either gender, name, height e.g **api/v1/people?sortBy=gender**<br/> <br/> **sortIn**: used along with sortBy. Can either be desc descending order] or asc: [ascending order]; <br/> it defaults to desc if not passed. e.g **api/v1/people?sortBy=gender&sortIn=asc** <br/> <br/> **gender**: filters movies by gender- male or female e.g **api/v1/people?gender=female** | **success**: boolean, <br/> <br/> **message**: [success or an error message (if any)],<br/> <br/> **count**: number of characters in the result set,<br/><br/> **previous**: previous page for paginated data,<br/><br/> **next**: next page for paginated data, <br/> <br/> **meta**: Contains MetaData <br/> **totalHeight(Cm)**: total height of the characters in the result set in centimeters,<br/> **totalHeight(Ft)**: total height of the characters in the result set in feet,<br/> **totalHeight(In)**: total height of the characters in the result set in inches,<br/><br/> **results**: [Movie characters]| This resource fetches all star wars film characters or film characters for a particular star wars movie. 
GET | api/v1/film/:id/comments | **id**: a Url parameter that represents the episode_id for which to get comments | success: boolean, message: [success or an error message (if any)], data: [Star wars movie comments]| This resource fetches all comments for the requested star wars movie 
POST | api/v1/film/:id/comments | **id**: a Url parameter that represents the episode_id for which to get comments <br /> <br /> **comments**: to be sent along with the request body. Should be of type string and must be less than 500 characters | success: boolean, message: [success or an error message (if any)], data: [Star wars movie comment]| This resource posts comments to the requested star wars movie

# Development and Testing

For testing this project locally.
 - Ensure you have docker installed and running on your machine.
 - Pull the master branch of the codebase
 - Convert the env.example file to .env
 - Update the Database configuration environment variables
 - Run *docker-compose up* in your terminal
 - Visit localhost:5000/api/v1/test in your browser or postman
 
To run test suite
  - Run *npm install*
  - Run *npm run test*
