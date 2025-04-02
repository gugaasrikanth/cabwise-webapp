"use client";

import React, { useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";

const libraries: "places"[] = ["places"];

const CabSearch = () => {
  const router = useRouter();

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
      setPickup(`${place.name}, ${place.formatted_address}` || place.name!);
    }
    if (type === "dropoff" && autocompleteDropoff) {
      const place = autocompleteDropoff.getPlace();
      setDropoff(`${place.name}, ${place.formatted_address}` || place.name!);
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex w-full flex-col lg:flex-row space-y-4 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <Autocomplete
            onLoad={(auto) => setAutocompletePickup(auto)}
            onPlaceChanged={() => handlePlaceSelect("pickup")}
          >
            <input
              type="text"
              className="card shadow-xl rounded-box w-full h-24 p-6"
              placeholder="Enter pick up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </Autocomplete>
        </div>
        <div className="flex justify-center pr-6 pl-6">
          <button
            onClick={() => {
              setPickup(dropoff);
              setDropoff(pickup);
              setAutocompleteDropoff(autocompletePickup);
              setAutocompletePickup(autocompleteDropoff);
            }}
          >
            <img
              src="/two-arrows.png"
              alt="Button Icon"
              className="w-12 h-12 hover:cursor-pointer"
            />
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <Autocomplete
            onLoad={(auto) => setAutocompleteDropoff(auto)}
            onPlaceChanged={() => handlePlaceSelect("dropoff")}
          >
            <input
              type="text"
              className="card shadow-xl rounded-box w-full h-24 p-6"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter drop off location"
            />
          </Autocomplete>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-full mt-8">
        <button
          onClick={() =>
            router.push(
              `/cabs?pickUpLat=${autocompletePickup
                ?.getPlace()
                .geometry?.location?.lat()}&pickUpLng=${autocompletePickup
                ?.getPlace()
                .geometry?.location?.lng()}&dropOffLat=${autocompleteDropoff
                ?.getPlace()
                .geometry?.location?.lat()}&dropOffLng=${autocompleteDropoff
                ?.getPlace()
                .geometry?.location?.lng()}`
            )
          }
          className="btn text-white lg:w-1/4 text-xl bg-gradient-to-r from-[#5B389B] to-[#975EFF] border-none shadow-xl"
        >
          Search Cabs
        </button>
      </div>
    </div>
  );
};

export default CabSearch;
