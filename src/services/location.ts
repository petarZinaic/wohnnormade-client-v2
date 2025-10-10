export interface LocationSuggestion {
  id: string;
  name: string;
  fullName: string;
  type: string;
}

export interface NominatimResponse {
  place_id: number;
  name: string;
  display_name: string;
  type: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    country?: string;
  };
}

class LocationService {
  private static readonly NOMINATIM_BASE_URL =
    "https://nominatim.openstreetmap.org";

  /**
   * Search for cities and countries using OpenStreetMap Nominatim API
   * @param query - Search query (minimum 2 characters)
   * @returns Promise<LocationSuggestion[]> - Array of location suggestions
   */
  static async searchLocations(query: string): Promise<LocationSuggestion[]> {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const response = await fetch(
        `${this.NOMINATIM_BASE_URL}/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1&limit=5&countrycodes=&featuretype=city,country`
      );

      if (!response.ok) {
        throw new Error(`Nominatim API error: ${response.status}`);
      }

      const data: NominatimResponse[] = await response.json();

      return data.map((item, index) => ({
        id: `${item.place_id}-${index}`,
        name: item.name || item.display_name.split(",")[0],
        fullName: item.display_name,
        type: item.type || "unknown",
      }));
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      throw new Error("Failed to fetch location suggestions");
    }
  }

  /**
   * Get location details by place ID
   * @param placeId - OpenStreetMap place ID
   * @returns Promise<LocationSuggestion> - Location details
   */
  static async getLocationDetails(
    placeId: string
  ): Promise<LocationSuggestion> {
    try {
      const response = await fetch(
        `${this.NOMINATIM_BASE_URL}/lookup?osm_ids=${placeId}&format=json`
      );

      if (!response.ok) {
        throw new Error(`Nominatim API error: ${response.status}`);
      }

      const data: NominatimResponse[] = await response.json();

      if (data.length === 0) {
        throw new Error("Location not found");
      }

      const item = data[0];
      return {
        id: item.place_id.toString(),
        name: item.name || item.display_name.split(",")[0],
        fullName: item.display_name,
        type: item.type || "unknown",
      };
    } catch (error) {
      console.error("Error fetching location details:", error);
      throw new Error("Failed to fetch location details");
    }
  }

  /**
   * Validate if a location exists
   * @param locationName - Name of the location to validate
   * @returns Promise<boolean> - True if location exists
   */
  static async validateLocation(locationName: string): Promise<boolean> {
    try {
      const suggestions = await this.searchLocations(locationName);
      return suggestions.some(
        (suggestion) =>
          suggestion.name.toLowerCase() === locationName.toLowerCase()
      );
    } catch (error) {
      console.error("Error validating location:", error);
      return false;
    }
  }
}

export default LocationService;
