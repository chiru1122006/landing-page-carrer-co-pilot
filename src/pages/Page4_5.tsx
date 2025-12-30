import React from "react";
import nextEra from "../../images/next era.png";

export default function Page4_5() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <img
        src={nextEra}
        alt="Next Era"
        className="max-w-full h-auto rounded-xl shadow-lg"
        style={{ background: "white" }}
      />
    </div>
  );
}
