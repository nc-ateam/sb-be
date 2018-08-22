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
              expect(res.body).to.contain.keys("newUser")
              expect(res.body.newUser).to.contain.keys("username", "picture_url",
                "fullname",
                "email",
                "visitedLandmarks");
            });
        });
      });
    });
  });
});
