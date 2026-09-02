import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <Link
        to="/services"
        className="text-xl font-bold text-gray-900 hover:text-blue-600"
      >
        Customer Service Booking System
      </Link>
      <nav className="flex gap-6">
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-gray-900"
            }`
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-gray-900"
            }`
          }
        >
          My Bookings
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
