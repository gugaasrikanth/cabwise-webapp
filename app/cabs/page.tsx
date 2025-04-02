"use client";

import React from "react";
import MapComponent from "../components/MapComponent";
import { useSearchParams } from "next/navigation";

const Cabs = () => {
  const searchParams = useSearchParams();
  const pickUpLat = Number(searchParams.get("pickUpLat"));
  const pickUpLng = Number(searchParams.get("pickUpLng"));
  const dropOffLat = Number(searchParams.get("dropOffLat"));
  const dropOffLng = Number(searchParams.get("dropOffLng"));

  const location1 = { lat: pickUpLat, lng: pickUpLng };
  const location2 = { lat: dropOffLat, lng: dropOffLng };

  return (
    <div>
      <MapComponent location1={location1} location2={location2} />
    </div>
  );
};

export default Cabs;
