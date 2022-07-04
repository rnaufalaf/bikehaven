import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MdLogout, MdOutlineDirectionsBike } from "react-icons/md";
import Swal from "sweetalert2";

const Header = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-darkColor h-auto">
      <div className="container flex py-1 mx-auto border-0">
        <div className="w-2/12 lg:h-20 flex justify-center items-center flex-1">
          <Link to="/user/home" className="text-2xl text-white font-semibold">
            <MdOutlineDirectionsBike color="white" />
          </Link>
          <h1 className="text-lightColor font-semibold ml-3 text-lg">
            BikeHaven
          </h1>
        </div>
        <div className="w-4/12 flex justify-center items-center">
          <input
            className="rounded  p-2 w-3/5"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          ></input>
          {search === true ? (
            <button
              className="ml-1 p-3 rounded bg-white text-darkColor hover:bg-midColor hover:text-white"
              onClick={() => {
                setQuery("");
                setSearch(false);
                navigate(`/user/home/`);
              }}
            >
              <FaTimes />
            </button>
          ) : (
            <button
              className="ml-1 p-3 rounded bg-white text-darkColor hover:bg-midColor hover:text-white"
              onClick={() => {
                setSearch(true);
                navigate(`/user/home/${query}`);
              }}
            >
              <FaSearch />
            </button>
          )}
        </div>

        <div className="w-4/12 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium text-lightColor">
            <Link
              to="/user/cart"
              className="inline-block rounded hover:text-white text-lg"
              aria-current="page"
            >
              <h1 className="hover:text-midColor">My Cart</h1>
            </Link>

            <Link
              to="/user/orders"
              className="inline-block border-b  hover:text-white md:border-0 text-lg"
            >
              <h1 className="hover:text-midColor">My Orders</h1>
            </Link>

            <Link
              to="/user/profile"
              className="inline-block border-b  hover:text-white md:border-0 text-lg"
            >
              <h1 className="hover:text-midColor">My Profile</h1>
            </Link>
          </div>
        </div>

        <div className="w-2/12 flex justify-center items-center">
          <div className=" flex flex-col justify-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium text-lightColor">
            <Link
              to="/login"
              className="text-3xl hover:text-midColor md:inline sm:block py-2"
              onClick={() => {
                Swal.fire("Logout Success!", "See you later!", "success");
                localStorage.clear();
              }}
            >
              <MdLogout />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
