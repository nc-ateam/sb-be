# Stampbook (Back-End)

Stampbook is a collection album app, where users take photographs close to landmarks and check them off of their collections. This repo is for the back-end.

### Prerequisites

```
"body-parser": "^1.18.3",
"cors": "^2.8.4",
"express": "^4.16.3",
"mongoose": "^5.2.9"

"chai": "^4.1.2",
"eslint": "^5.3.0",
"eslint-plugin-react": "^7.11.1",
"mocha": "^5.2.0",
"nodemon": "^1.18.3",
"supertest": "^3.1.0"
```

## Getting Started

1.  First of all Fork and Clone this repository to your machine
2.  In the terminal CD to the cloned directory and run the following command:

```
npm install
```

3.  Run mongod within the terminal

```
mongod
```

## Seeding the database

You should now be listening to mongod and now you are ready to create your local DataBase to test/dev on.

run the following command to seed the database:

```
npm run seed:dev
```

You should receive a seed successfully done Console.log if the seed has completed

## Testing

To run the test database ensure you are CD'd to the repo and run the following command:

```
npm test
```

The test file tests:

1.  That the endpoints of the API function as they should do gaining the right results with the test data used
2.  That errors are being sent under given circumstances such as an invalid input which could be in a wrong format or a non exsisting ID

## Hosted App deployed on Heroku

The following link is the main API page of the application:

[Stamp-Book Heroku link](https://stamp-book-api.herokuapp.com/api/)

## Using the API

```
GET /api/countries
Returns a JSON object of all supported countries.

GET /api/countries/country_id
Returns a JSON object of a specific country by its ID.

GET /api/countries/country_id/cities
Returns a JSON object of cities within the specified country ID.

GET /api/cities
Returns a JSON object of all supported cities.

GET /api/cities/city_id
Returns a JSON object of a specific city based on its ID.

GET /api/cities/city_id/landmarks
Returns a JSON object of landmarks within the specific city ID.

GET /api/landmarks
Returns a JSON object of all supported landmarks.

GET /api/landmarks/landmark_id
Returns a JSON object of a specific landmark based on its ID.

POST /api/landmarks/:landmark_id/checkLandmark
Post request body must look like the following - {body: firebasedownloadURL}

GET /api/photos
Returns a JSON object of all photos.

GET /api/photos/:photo_id
Returns a JSON object of a specific photo by its ID.

GET /api/users
Returns a JSON object of all users.

GET /api/users/:user_id
Returns a JSON object of a specific user by their ID.

GET /api/users/:user_id/photos
Returns a JSON object of all photos owned by the specified user.
```

## MongoDB

MongoDB hosted on Mlabs

## Authors

See the list of [contributors](https://github.com/nc-ateam/sb-be/contributors) who participated in this project.
