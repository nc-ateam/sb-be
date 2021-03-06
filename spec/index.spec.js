process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const mongoose = require("mongoose");
const seedDB = require("../seed/seed.js");
const testData = require("../seed/testData");

describe("", () => {
  let cityDocs;
  let countryDocs;
  let landmarksDocs;
  let photosDocs;
  let usersDocs;
  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [cityDocs, countryDocs, landmarksDocs, photosDocs, usersDocs] = docs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("StampBook", () => {
    describe("countries", () => {
      it("Country1-GET responds 200 and all countries", () => {
        return request
          .get("/api/countries")
          .expect(200)
          .then(res => {
            expect(res.body.countries[0]).to.contain.keys(
              "country",
              "geolocation",
              "picture_url"
            );
            expect(res.body.countries).to.be.an("Array");
            expect(res.body.countries.length).to.equal(2);
          });
      });
      it("Country1A-GET responds 404 and appropriate message", () => {
        return request
          .get("/api/contries")
          .expect(404)
          .then(res => {
            expect(res.body).to.be.an("Object");
            expect(res.body).to.contain.keys("message");
            expect(res.body.message).to.equal("Page not found");
          });
      });
      it("Country2-GET responds 200 and specific country of given country- united kingdom", () => {
        const countryId = countryDocs[0]._id;
        return request
          .get(`/api/countries/${countryId}`)
          .expect(200)
          .then(res => {
            expect(res.body.country).to.be.an("Object");
            expect(res.body).to.contain.keys("country");
            expect(res.body.country).to.contain.keys(
              "country",
              "geolocation",
              "picture_url"
            );
            expect(res.body.country.country).to.equal("United Kingdom");
            expect(res.body.country.geolocation.coordinates).to.be.an("Array");
            expect(res.body.country.geolocation.coordinates.length).to.equal(2);
            expect(res.body.country.geolocation.coordinates[0]).to.equal(
              "0.1278"
            );
            expect(res.body.country.geolocation.coordinates[1]).to.equal(
              "51.5074"
            );
          });
      });
      it("Country2A-GET responds 400 and appropriate message", () => {
        const cityId = cityDocs[0]._id;
        return request
          .get(`/api/countries/${cityId}`)
          .expect(400)
          .then(res => {
            expect(res.body).to.be.an("Object");
            expect(res.body).to.contain.keys("message");
            expect(res.body.message).to.equal("Bad Request");
          });
      });
      it("Country2B-GET responds 400 and appropriate message", () => {
        return request
          .get(`/api/countries/france`)
          .expect(400)
          .then(res => {
            expect(res.body).to.be.an("Object");
            expect(res.body).to.contain.keys("message");
            expect(res.body.message).to.equal(
              "Bad Request: france is an invalid ID"
            );
          });
      });
      it("Country2C-GET responds 404 and appropriate message", () => {
        const countryId = countryDocs[0]._id;
        return request
          .get(`/api/countres/${countryId}`)
          .expect(404)
          .then(res => {
            expect(res.body).to.be.an("Object");
            expect(res.body).to.contain.keys("message");
            expect(res.body.message).to.equal("Page not found");
          });
      });
      it("Country3-GET responds 200 and specific country of given country- france", () => {
        const countryId = countryDocs[1]._id;
        return request
          .get(`/api/countries/${countryId}`)
          .expect(200)
          .then(res => {
            expect(res.body.country).to.be.an("Object");
            expect(res.body).to.contain.keys("country");
            expect(res.body.country).to.contain.keys(
              "country",
              "geolocation",
              "picture_url"
            );
            expect(res.body.country.country).to.equal("France");
            expect(res.body.country.geolocation.coordinates).to.be.an("Array");
            expect(res.body.country.geolocation.coordinates.length).to.equal(2);
            expect(res.body.country.geolocation.coordinates[0]).to.equal(
              "2.2069771"
            );
            expect(res.body.country.geolocation.coordinates[1]).to.equal(
              "48.8587741"
            );
          });
      });
      it("Country4-GET responds 200 and array of cities is served", () => {
        const countryId = countryDocs[0]._id;
        return request
          .get(`/api/countries/${countryId}/cities`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("Object");
            expect(res.body).to.contain.keys("cities");
            expect(res.body.cities).to.be.an("Array");
            expect(res.body.cities.length).to.equal(2);
            expect(res.body.cities[0]).to.be.an("Object");
            expect(res.body.cities[0]).to.contain.keys(
              "geolocation",
              "belongs_to",
              "picture_url",
              "city"
            );
            expect(res.body.cities[0].city).to.equal("Manchester");
            expect(res.body.cities[0].geolocation.coordinates.length).to.equal(
              2
            );
            expect(res.body.cities[0].geolocation.coordinates[0]).to.equal(
              "-2.2426"
            );
            expect(res.body.cities[0].geolocation.coordinates[1]).to.equal(
              "53.4808"
            );
            expect(res.body.cities[0].belongs_to).to.be.an("Object");
            expect(res.body.cities[0].belongs_to).to.contain.keys(
              "country",
              "geolocation",
              "picture_url"
            );
            expect(res.body.cities[0].belongs_to.country).to.equal(
              "United Kingdom"
            );
            expect(
              res.body.cities[0].belongs_to.geolocation.coordinates
            ).to.be.an("Array");
            expect(
              res.body.cities[0].belongs_to.geolocation.coordinates.length
            ).to.equal(2);
            expect(
              res.body.cities[0].belongs_to.geolocation.coordinates[0]
            ).to.equal("0.1278");
            expect(
              res.body.cities[0].belongs_to.geolocation.coordinates[1]
            ).to.equal("51.5074");
          });
      });
      it("Country4A-GET responds 404 and appropriate message", () => {
        const cityId = cityDocs[0]._id;
        return request
          .get(`/api/countries/${cityId}/cities`)
          .expect(404)
          .then(res => {
            expect(res.body).to.be.an("Object");
            expect(res.body).to.contain.keys("message");
            expect(res.body.message).to.equal("That country does not exist.");
          });
      });
      it("Country4B-GET responds 404 and appropriate message", () => {
        const countryId = countryDocs[0]._id;
        return request
          .get(`/api/countries/${countryId}/manchester`)
          .expect(404)
          .then(res => {
            expect(res.body).to.be.an("Object");
            expect(res.body).to.contain.keys("message");
            expect(res.body.message).to.equal("Page not found");
          });
      });
      describe("cities", () => {
        it("City1-GET responds 200 and all cities", () => {
          return request
            .get("/api/cities")
            .expect(200)
            .then(res => {
              expect(res.body.cities[0]).to.contain.keys(
                "geolocation",
                "belongs_to",
                "picture_url",
                "city"
              );
              expect(res.body.cities).to.be.an("Array");
              expect(res.body.cities.length).to.equal(2);
            });
        });
        it("City1A-GET responds 404 and appropriate message", () => {
          return request
            .get("/api/citis")
            .expect(404)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("Page not found");
            });
        });
        it("City2-GET responds 200 and specific city of given city- Manchester", () => {
          const cityId = cityDocs[0]._id;
          return request
            .get(`/api/cities/${cityId}`)
            .expect(200)
            .then(res => {
              expect(res.body.city).to.be.an("Object");
              expect(res.body).to.contain.keys("city");
              expect(res.body.city).to.contain.keys(
                "city",
                "geolocation",
                "picture_url"
              );
              expect(res.body.city.belongs_to.country).to.equal(
                "United Kingdom"
              );
              expect(res.body.city.geolocation.coordinates).to.be.an("Array");
              expect(res.body.city.geolocation.coordinates.length).to.equal(2);
              expect(res.body.city.geolocation.coordinates[0]).to.equal(
                "-2.2426"
              );
              expect(res.body.city.geolocation.coordinates[1]).to.equal(
                "53.4808"
              );
              expect(res.body.city.belongs_to.geolocation.coordinates).to.be.an(
                "Array"
              );
              expect(
                res.body.city.belongs_to.geolocation.coordinates.length
              ).to.equal(2);
              expect(
                res.body.city.belongs_to.geolocation.coordinates[0]
              ).to.equal("0.1278");
              expect(
                res.body.city.belongs_to.geolocation.coordinates[1]
              ).to.equal("51.5074");
            });
        });
        it("City2A-GET responds 400 and appropriate message", () => {
          const countryId = countryDocs[0]._id;
          return request
            .get(`/api/cities/${countryId}`)
            .expect(400)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("Bad Request");
            });
        });
        it("City2B-GET responds 400 and appropriate message", () => {
          return request
            .get(`/api/cities/manchester`)
            .expect(400)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal(
                "Bad Request: manchester is an invalid ID"
              );
            });
        });
        it("City2C-GET responds 404 and appropriate message", () => {
          const cityId = cityDocs[0]._id;
          return request
            .get(`/api/citis/${cityId}`)
            .expect(404)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("Page not found");
            });
        });
        it("City3-GET responds 200 and all landmarks for given city", () => {
          const cityId = cityDocs[0]._id;
          return request
            .get(`/api/cities/${cityId}/landmarks`)
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("landmarks");
              expect(res.body.landmarks).to.be.an("Array");
              expect(res.body.landmarks.length).to.equal(2);
              expect(res.body.landmarks[0]).to.contain.keys(
                "geolocation",
                "picture_url",
                "info",
                "belongs_to",
                "landmark"
              );
              expect(res.body.landmarks[0].landmark).to.equal(
                "Manchester Piccadilly Station"
              );
              expect(res.body.landmarks[0].geolocation).to.be.an("Object");
              expect(
                res.body.landmarks[0].geolocation.coordinates.length
              ).to.equal(2);
              expect(res.body.landmarks[0].geolocation.coordinates[0]).to.equal(
                -2.2309113
              );
              expect(res.body.landmarks[0].geolocation.coordinates[1]).to.equal(
                53.4774049
              );
              expect(res.body.landmarks[0].belongs_to).to.be.an("Object");
              expect(res.body.landmarks[0].belongs_to).to.contain.keys(
                "city",
                "geolocation",
                "picture_url",
                "belongs_to"
              );
            });
        });
        it("City3A-GET responds 404 and appropriate message", () => {
          const cityId = cityDocs[0]._id;
          return request
            .get(`/api/cities/${cityId}/Northcoders`)
            .expect(404)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("Page not found");
            });
        });
        it("City3B-GET responds 404 and appropriate message", () => {
          const countryId = countryDocs[0]._id;
          return request
            .get(`/api/cities/${countryId}/landmarks`)
            .expect(404)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("That city does not exist.");
            });
        });
      });
      describe("landmarks", () => {
        it("Landmark1-GET responds 200 and all landmarks", () => {
          return request
            .get("/api/landmarks")
            .expect(200)
            .then(res => {
              expect(res.body.landmarks).to.be.an("Array");
              expect(res.body.landmarks.length).to.equal(3);
              expect(res.body.landmarks[2]).to.contain.keys(
                "geolocation",
                "picture_url",
                "info",
                "belongs_to",
                "landmark"
              );
              expect(res.body.landmarks[0]).to.contain.keys(
                "geolocation",
                "picture_url",
                "info",
                "belongs_to",
                "landmark"
              );
              expect(res.body.landmarks[2].landmark).to.equal(
                "Lymefield Centre"
              );
              expect(res.body.landmarks[2].geolocation).to.be.an("Object");
              expect(
                res.body.landmarks[2].geolocation.coordinates.length
              ).to.equal(2);
              expect(res.body.landmarks[2].geolocation.coordinates[0]).to.equal(
                -2.0215345
              );
              expect(res.body.landmarks[2].geolocation.coordinates[1]).to.equal(
                53.4405305
              );
              expect(res.body.landmarks[2].belongs_to).to.be.an("Object");
              expect(res.body.landmarks[2].belongs_to).to.contain.keys(
                "city",
                "geolocation",
                "picture_url",
                "belongs_to"
              );
            });
        });
        it("Landmarks1A-GET responds 404 and appropriate message", () => {
          return request
            .get("/api/landmark")
            .expect(404)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("Page not found");
            });
        });
        it("Landmark2- POST request, to see how geolocation works with mongo", () => {
          const landmarkId = landmarksDocs[0]._id;
          const body =
            "https://firebasestorage.googleapis.com/v0/b/my-project-1531828203931.appspot.com/o/cwrighty92%2F~-2.232817%2C53.4779652~cwrighty92jpeg?alt=media&token=19672e68-2ec7-43ea-a8f7-0c3cfeb26b7c";
          return request
            .post(`/api/landmarks/${landmarkId}/checkLandmark`)
            .send({ body })
            .expect(201)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body.storedPhoto).to.be.an("Object");
              expect(res.body.storedPhoto).to.contain.keys(
                "belongs_to_user",
                "belongs_to_city",
                "belongs_to_landmark",
                "firebase_url"
              );
              expect(res.body.storedPhoto.firebase_url).to.equal(body);
            });
        });
        it("Landmark2A- POST request,responds 400 with a url we arent able to work with", () => {
          const landmarkId = landmarksDocs[0]._id;
          const body =
            "https://firebasestorage.googleapis.com/v0/b/my-project-1531828203931.appspot.com/o/cwright2F~-2.232817%2C53.4779652~cwrighpeg?alt=media&token=19672e68-2ec7-43ea-a8f7-0c3cfeb26b7c";
          return request
            .post(`/api/landmarks/${landmarkId}/checkLandmark`)
            .send({ body })
            .expect(400)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal(
                "User info deprecated"
              );
            });
        });
        it("Landmark2B- POST request,responds 400 with a cityId instead of landmark", () => {
          const cityId = cityDocs[0]._id;
          const body =
            "https://firebasestorage.googleapis.com/v0/b/my-project-1531828203931.appspot.com/o/cwright2F~-2.232817%2C53.4779652~cwrighpeg?alt=media&token=19672e68-2ec7-43ea-a8f7-0c3cfeb26b7c";
          return request
            .post(`/api/landmarks/${cityId}/checkLandmark`)
            .send({ body })
            .expect(400)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal(
                "Bad Request: TypeError: Cannot read property 'georadius' of undefined"
              );
            });
        });
        it("Landmark2C- POST request,responds 404 with a untrailed path", () => {
          const landmarkId = landmarksDocs[0]._id;
          const body =
            "https://firebasestorage.googleapis.com/v0/b/my-project-1531828203931.appspot.com/o/cwright2F~-2.232817%2C53.4779652~cwrighpeg?alt=media&token=19672e68-2ec7-43ea-a8f7-0c3cfeb26b7c";
          return request
            .post(`/api/landmarks/${landmarkId}/checkLadmark`)
            .send({ body })
            .expect(404)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("Page not found");
            });
        });
      });
      describe("Users", () => {
        it("User1-POST new user to db", () => {
          let body = {
            username: "stamp-book-tester",
            picture_url: null,
            fullname: "Stamp Book",
            email: "stampt@hotmail.com",
            visitedLandmarks: []
          };
          return request
            .post(`/api/users`)
            .send({ body })
            .expect(201)
            .then(res => {
              expect(res.body).to.contain.keys("newUser");
              expect(res.body.newUser).to.contain.keys(
                "username",
                "picture_url",
                "fullname",
                "email",
                "visitedLandmarks"
              );
            });
        });
        it("User1A-POST responds 404 with faulty path", () => {
          let body = {
            username: "stamp-book-tester",
            picture_url: null,
            fullname: "Stamp Book",
            email: "stampt@hotmail.com",
            visitedLandmarks: []
          };
          return request
            .post(`/api/usrs`)
            .send({ body })
            .expect(404)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("Page not found");
            });
        });
        it("User1B-POST responds 400 with faulty path", () => {
          let body = {
            picture_url: null,
            fullname: "Stamp Book",
            email: "stampt@hotmail.com",
            visitedLandmarks: []
          };
          return request
            .post(`/api/users`)
            .send({ body })
            .expect(400)
            .then(res => {
              expect(res.body).to.be.an("Object");
              expect(res.body).to.contain.keys("message");
              expect(res.body.message).to.equal("Bad Request: a required field is missing!");
            });
        });
      });
    });
  });
});
