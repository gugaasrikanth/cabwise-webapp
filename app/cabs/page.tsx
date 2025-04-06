"use client";

import React from "react";
import MapComponent from "../components/MapComponent";
import { useSearchParams } from "next/navigation";
import CabListing from "../components/CabListing";

const Cabs = () => {
  const searchParams = useSearchParams();
  const pickUpLat = Number(searchParams.get("pickUpLat"));
  const pickUpLng = Number(searchParams.get("pickUpLng"));
  const dropOffLat = Number(searchParams.get("dropOffLat"));
  const dropOffLng = Number(searchParams.get("dropOffLng"));

  const location1 = { lat: pickUpLat, lng: pickUpLng };
  const location2 = { lat: dropOffLat, lng: dropOffLng };

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <div>
        <MapComponent location1={location1} location2={location2} />
      </div>
      <div>
        <CabListing />
      </div>
    </div>
  );
};

export default Cabs;
