import MapboxGeocoder, { GeocodeRequest, GeocodeService } from "@mapbox/mapbox-sdk/services/geocoding";
import { Constants } from "utils";

const geocoderClient: GeocodeService = MapboxGeocoder({
  accessToken: String(Constants.MAPBOX.API_KEY),
});

/**
 * function to call the Geocoder search engine provided by Mapbox
 * @param {GeocodeRequest} props it contains the search parameters
 */

export const searchEngine = async (props: GeocodeRequest) => {
  try {
    const response = await geocoderClient
      .forwardGeocode(props)
      .send();

    return response.body.features;
  } catch (error: any) {
    console.error("Error:", error.message);
  }
  return []
};

/**
 * function to call the Geocoder reverse function to get the address from coordinates
 * @param {number} latitude the latitude of the location
 * @param {number} longitude the longitude of the location
 */

export const fetchAddress = async (latitude: number, longitude: number) => {
  try {
    const response = await geocoderClient
      .reverseGeocode({
        query: [longitude, latitude],
      })
      .send();

    if (
      response &&
      response.body &&
      response.body.features &&
      response.body.features.length > 0
    ) {
      return response.body.features[0].place_name;
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  }
  return ""
};