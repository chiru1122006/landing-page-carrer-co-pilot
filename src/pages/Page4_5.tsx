import React from "react";

export default function Page4_5() {
  const nextEra = new URL('../images/next era.png', import.meta.url).href;
  
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
