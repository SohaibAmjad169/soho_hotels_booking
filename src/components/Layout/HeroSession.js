import React from "react";
import heroData from "../../database/heroData.json";
import SearchHotels from "../Hotels/SearchHotels";

const Hero = () => {
    return (
        <section
            className="h-screen bg-cover bg-center px-4 sm:px-[10px] md:px-[10px] lg:px-[60px] overflow-visible"
            style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            {/* Content Area */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white z-20">
                <div className="space-y-4">
                    <h1 className="text-5xl font-normal tracking-wide pt-[70px]">
                        {heroData.title}
                    </h1>
                    <center>
                        <hr className="border-b-8 w-[50px] border-[#cbb198]" />
                    </center>
                    <p className="text-xl font-normal">{heroData.subtitle}</p>

                    {/* Search Component */}
                    <SearchHotels />
                </div>
            </div>
        </section>
    );
};

export default Hero;
