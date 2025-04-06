import React from "react";
import data from "../../static/data.json";

const CabListing = () => {
  return (
    <>
      {data.map((ride, index) => (
        <div className="flex justify-center items-center" key={index}>
          <div
            className="stats shadow-xl mb-8 stats-vertical lg:stats-horizontal w-3xl items-center"
            key={index}
          >
            <div className="stat">
              <div className="stat-title">Price</div>
              <div className="stat-value text-primary">₹{ride.price}</div>{" "}
            </div>
            <div className="stat">
              <div className="stat-title">ETA</div>
              <div className="stat-value text-primary">
                {Math.round(ride.ETA / 60)} mins
              </div>{" "}
            </div>
            <div className="stat">
              <div className="stat-title">Provider</div>
              <div className="stat-value text-primary">
                {ride.provider}
              </div>{" "}
            </div>

            <div className="stat flex justify-center">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    {ride.provider === "Uber" ? (
                      <img src="/uber.svg" alt="Profile" />
                    ) : ride.provider === "Ola" ? (
                      <img src="/ola-cabs.svg" alt="Profile" />
                    ) : (
                      <img src="/namma-yatri.svg" alt="Profile" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CabListing;
