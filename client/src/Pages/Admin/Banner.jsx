import React from "react";
import Header from "../../Components/Admin/Header";

const Banner = () => {
  return (
    <div>
      <div x-data="setup()" class="{ 'dark': isDark }">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header />
          <LeftLayout active="products" />
          <div className="h-full flex flex-col ml-14 mt-14 mb-10 md:ml-64"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
