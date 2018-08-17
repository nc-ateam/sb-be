const mongoose = require("mongoose");
mongoose.Promise = Promise;
const { City, Country, Landmark } = require("../models");
const {
  formatData,
  formatSingleCountry,
  formatRef,
  formatCityData,
  formatLandmarkData
} = require("../utils/index");

const seedDB = ({ citiesData, countriesData, landmarksData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      let formattedCountryData = formatData(countriesData, formatSingleCountry);
      return Promise.all([Country.insertMany(formattedCountryData)]);
    })
    .then(([countryDocs]) => {
      let countryRef = formatRef(countriesData, countryDocs);
      const formattedCityData = formatCityData(citiesData, countryRef);
      return Promise.all([City.insertMany(formattedCityData)]);
    })
    .then(([cityDocs]) => {
      let cityRef = formatRef(citiesData, cityDocs)
      const formattedLandmarkData= formatLandmarkData(landmarksData, cityRef)
      return Promise.all([Landmark.insertMany(formattedLandmarkData)]);
    }).catch(console.log)
};

module.exports = seedDB;
