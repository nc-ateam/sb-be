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
    })
  })
  after(() => {
    return mongoose.disconnect();
  })
  describe("StampBook", () => {
    describe("countries", () => {
      it("Country1-GET responds 200 and all countries", () => {
        return request
          .get("/api/countries")
          .expect(200)
          .then(res => {
            expect(res.body.countries[0]).to.contain.keys("country", "geolocation", "picture_url");
            expect(res.body.countries).to.be.an("Array");
            expect(res.body.countries.length).to.equal(2);
          });
      })
      it("Country2-GET responds 200 and specific country of given country- united kingdom", () => {
        const countryId = countryDocs[0]._id;
        return request
          .get(`/api/countries/${countryId}`)
          .expect(200)
          .then(res => {
            expect(res.body.country).to.be.an("Object");
            expect(res.body).to.contain.keys("country");
            expect(res.body.country).to.contain.keys("country", "geolocation", "picture_url");
            expect(res.body.country.country).to.equal("United Kingdom");
            expect(res.body.country.geolocation).to.be.an("Array");
            expect(res.body.country.geolocation.length).to.equal(2);
            expect(res.body.country.geolocation[0]).to.equal("0.1278");
            expect(res.body.country.geolocation[1]).to.equal("51.5074");
          });
      })
      it("Country3-GET responds 200 and specific country of given country- france", () => {
        const countryId = countryDocs[1]._id;
        return request
          .get(`/api/countries/${countryId}`)
          .expect(200)
          .then(res => {
            expect(res.body.country).to.be.an("Object");
            expect(res.body).to.contain.keys("country");
            expect(res.body.country).to.contain.keys("country", "geolocation", "picture_url");
            expect(res.body.country.country).to.equal("France");
            expect(res.body.country.geolocation).to.be.an("Array");
            expect(res.body.country.geolocation.length).to.equal(2);
            expect(res.body.country.geolocation[0]).to.equal("2.2069771");
            expect(res.body.country.geolocation[1]).to.equal("48.8587741");
          });
      })
      it.only("Country4-GET responds 200 and array of cities is served", () => {
        const countryId = countryDocs[0]._id;
        return request
          .get(`/api/countries/${countryId}/cities`)
          .expect(200)
          .then(res => {
            console.log(res.body.cities[0]);
            expect(res.body).to.be.an("Object");
            expect(res.body).to.contain.keys("cities");
            expect(res.body.cities).to.be.an("Array");
            expect(res.body.cities[0]).to.be.an("Object");
            expect(res.body.cities[0]).to.contain.keys("geolocation", "belongs_to", "picture_url", "city");
            expect(res.body.cities[0].belongs_to).to.be.an("Object");
            expect(res.body.cities[0].belongs_to).to.contain.keys("country", "geolocation", "picture_url");
            // expect(res.body.country).to.contain.keys("country", "geolocation", "picture_url");
          });
      });
    });
  });
});
