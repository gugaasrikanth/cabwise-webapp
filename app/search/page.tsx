"use client";

import React, { useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

const Search = () => {
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [autocompletePickup, setAutocompletePickup] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteDropoff, setAutocompleteDropoff] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const handlePlaceSelect = (type: "pickup" | "dropoff") => {
    if (type === "pickup" && autocompletePickup) {
      const place = autocompletePickup.getPlace();
      console.log(place.geometry?.location?.lat());
      setPickup(place.formatted_address || place.name!);
    }
    if (type === "dropoff" && autocompleteDropoff) {
      const place = autocompleteDropoff.getPlace();
      setDropoff(place.formatted_address || place.name!);
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box space-y-2">
        <legend className="fieldset-legend">Choose Your Ride</legend>

        <div className="flex flex-col space-y-2">
          <label className="fieldset-label">Pick Up</label>
          <Autocomplete
            onLoad={(auto) => setAutocompletePickup(auto)}
            onPlaceChanged={() => handlePlaceSelect("pickup")}
          >
            <input
              type="text"
              className="input input-sm"
              placeholder="Start typing to select your pick up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </Autocomplete>
        </div>

        <div className="flex justify-center">
          <button
            className="btn btn-circle border border-black flex items-center justify-center"
            onClick={() => {
              setPickup(dropoff);
              setDropoff(pickup);
              setAutocompleteDropoff(autocompletePickup);
              setAutocompletePickup(autocompleteDropoff);
            }}
          >
            <img
              src="/up-and-down-arrow.png"
              alt="Button Icon"
              className="w-6 h-6 p-1"
            />
          </button>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="fieldset-label">Drop Off</label>
          <Autocomplete
            onLoad={(auto) => setAutocompleteDropoff(auto)}
            onPlaceChanged={() => handlePlaceSelect("dropoff")}
          >
            <input
              type="text"
              className="input input-sm"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Start typing to select your drop off location"
            />
          </Autocomplete>
        </div>
        <button className="btn btn-primary">Search Cabs</button>
      </fieldset>
    </div>
  );
};

export default Search;
