import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-blue-900 text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-9"> iTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all duration-50">
          Home
        </li>
        <li className="cursor-pointer hover:font-bold transition-all duration-50">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
