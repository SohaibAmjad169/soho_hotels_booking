import React from "react";
import headerIcon from "../../database/headerIcon.json";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-4 sm:px-[10px] md:px-[10px] lg:px-[60px] ">
      <div className="flex items-center space-x-5">
        {headerIcon.map((item, index) => (
          <React.Fragment key={index}>
            {/* Icon Section */}
            <div className="flex items-center justify-center bg-[#b99470] text-white w-[30px] h-[30px] rounded-full">
              <img src={item.icon} alt={item.alt} className="w-4 h-4" />
            </div>
            {/* Associated Text */}
            <div className={`${item.showOnMobile ? "" : "hidden sm:inline-block"}`}>
              {item.text}
            </div>
          </React.Fragment>
        ))}
      </div>

      <button className="bg-[#b99470] text-white px-6 py-2 text-lg font-[300] hover:bg-[#b99470]/80 transition">
        Book Now
      </button>
    </div>
  );
};

export default Header;
