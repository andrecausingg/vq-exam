import React, { useState } from "react";

const AlertUpdate: React.FC = () => {
  const [message] =
    useState<boolean>(true);

  return (
    <>
      {/* Success Container */}
      <div
        className={`z-50 bg-orange-500 text-2xl text-white px-4 py-3 text-center fixed top-0 left-0 right-0 w-[300px] md:w-[400px] mx-auto justify-center transition-all duration-300 ${
          message
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <p className="font-bold">Successfully Update:</p>
        <p className="text-sm">Data successfully updated into the database.</p>
      </div>
    </>
  );
};

export default AlertUpdate;
