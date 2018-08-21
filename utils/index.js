const formatSingleCountry = countryDatum => {
  return { ...countryDatum };
};

const formatSingleUser = UserDatum => {
  return { ...UserDatum };
};

const formatData = (data, formatter) => {
  return data.map(formatter);
};

const formatRef = (data, docs) => {
  return data.reduce((acc, current, index) => {
    if (current.country) {
      acc[current.country] = docs[index]._id;
    }
    if (current.city) {
      acc[current.city] = docs[index]._id;
    }
    if (current.username) {
      acc[current.username] = docs[index]._id;
    }
    if (current.landmark) {
      acc[current.landmark] = docs[index]._id;
    }
    return acc;
  }, {});
};

const formatCityData = (citiesData, countryRef) => {
  return citiesData.map(cityDatum => {
    const { belongs_to: country } = cityDatum;
    return {
      ...cityDatum,
      belongs_to: exchangeIDs(country, countryRef)
    };
  });
};

const formatPhotoData = (photosData, landmarkRef, userRef, cityRef) => {
  return photosData.map(photoDatum => {
    const {
      belongs_to_user: user,
      belongs_to_city: city,
      belongs_to_landmark: landmark
    } = photoDatum;
    return {
      ...photoDatum,
      belongs_to_user: exchangeIDs(user, userRef),
      belongs_to_city: exchangeIDs(city, cityRef),
      belongs_to_landmark: exchangeIDs(landmark, landmarkRef)
    };
  });
};

const formatLandmarkData = (landmarksData, cityRef) => {
  return landmarksData.map(landmarkDatum => {
    const { belongs_to: city } = landmarkDatum;
    return {
      ...landmarkDatum,
      belongs_to: exchangeIDs(city, cityRef)
    };
  });
};

const exchangeIDs = (oldItem, ref) => {
  if (typeof oldItem === "string") {
    return ref[oldItem];
  }
};

module.exports = {
  formatData,
  formatSingleCountry,
  formatRef,
  formatCityData,
  formatLandmarkData,
  formatSingleUser,
  formatPhotoData
};
