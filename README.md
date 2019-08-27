# swapi-wrapper

NodeJS rest api to get star wars movie data from https://swapi.co

API documentation.

HTTP verb | endpoint | Parameters | Response | Description
|------|------|------|-----|-----|
GET | api/v1/people | **sortBy**: sorts movies by either gender, name, height e.g **api/v1/people?sortBy=gender**<br/> <br/> **sortIn**: used along with sortBy. Can either be desc descending order] or asc: [ascending order]; <br/> it defaults to desc if not passed. e.g **api/v1/people?sortBy=gender&sortIn=asc** <br/> <br/> **gender**: filters movies by gender- male or female e.g **api/v1/people?gender=female** | success: boolean, message: [success or an error message (if any)], data: [all star wars characters]| This resource fetches all star wars film characters. 
GET | api/v1/film/:id/people/ | **sortBy**: sorts movies by either gender, name, height e.g **api/v1/people?sortBy=gender**<br/> <br/> **sortIn**: used along with sortBy. Can either be desc descending order] or asc: [ascending order]; <br/> it defaults to desc if not passed. e.g **api/v1/people?sortBy=gender&sortIn=asc** <br/> <br/> **gender**: filters movies by gender- male or female e.g **api/v1/people?gender=female** | success: boolean, message: [success or an error message (if any)], data: [all star wars characters with the film id]| This resource accepts url parameter- **id** and fetches all star wars film characters with that film episode_id. 
