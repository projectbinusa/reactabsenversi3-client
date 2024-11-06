import React from "react";
import logo from "../components/logo.jpg";

const Loader = () => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div class="relative flex justify-center items-center">
      <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      <img src={logo} class="rounded-full h-28 w-28" />
    </div>
  </div>
);

export default Loader;
