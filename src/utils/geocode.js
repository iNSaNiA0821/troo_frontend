// import Geocode from "react-geocode";

// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey("AIzaSyCAa8ZgPpTBMcCV7lrNJXvE70JoRs9Wl8I");

// // set response language. Defaults to english.
// Geocode.setLanguage("en");

// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("es");

// // set location_type filter . Its optional.
// // google geocoder returns more that one address for given lat/lng.
// // In some case we need one address as response for which google itself provides a location_type filter.
// // So we can easily parse the result for fetching address components
// // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
// Geocode.setLocationType("APPROXIMATE");

// // Enable or disable logs. Its optional.
// Geocode.enableDebug();

// export default Geocode;