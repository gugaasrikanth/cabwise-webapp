import { useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const libraries: "places"[] = ["places"];

const MapComponent = (props: {
  location1: { lat: number; lng: number };
  location2: { lat: number; lng: number };
}) => {
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

  const handleDirectionsResponse = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === "OK" && result) {
      setDirectionsResponse(result); // Set the response if successful
    } else {
      console.error("Directions request failed due to ", status);
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={10}>
      {/* Markers for the two locations */}
      <Marker position={props.location1} />
      <Marker position={props.location2} />

      {/* Optional: Show directions between the two locations */}
      <DirectionsService
        options={{
          destination: props.location2,
          origin: props.location1,
          travelMode: google.maps.TravelMode.DRIVING,
        }}
        callback={handleDirectionsResponse}
      />

      {directionsResponse && (
        <DirectionsRenderer
          options={{
            directions: directionsResponse,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapComponent;
