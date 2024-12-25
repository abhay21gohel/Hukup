import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { data: user } = useSelector((state) => state.user);
  const [ham, setHam] = useState(false);
  useEffect(() => {
    const hammer = document.getElementById("menu");
    if (ham) {
      hammer.classList.remove("hidden");
    } else {
      hammer.classList.add("hidden");
    }
  }, [ham]);

  return (
    <div className="absolute top-0 left-0 w-full">
      <nav class="bg-transparent border-gray-200 dark:bg-transparent shadow-md">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            /> */}
            <span class="self-center italic  text-2xl font-semibold whitespace-nowrap dark:text-white">
              HukUp
            </span>
          </a>
          <div class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
            <Menu>
              <MenuButton>
                <button
                  type="button"
                  data-dropdown-toggle="language-dropdown-menu"
                  class=" relative inline-flex items-center bg-white font-medium justify-center px-8 py-1.5 text-sm text-pink-500 dark:text-white rounded-3xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <Avatar
                    position={"absolute"}
                    left={0}
                    size="sm"
                    name="Kola Tioluwani"
                    src={user.img}
                  />{" "}
                  <Text ml={"1"}>{user?.name}</Text>
                  <span className="absolute  right-2">
                    {" "}
                    <IoIosArrowDown />
                  </span>
                </button>
              </MenuButton>
              <MenuList>
                <MenuItem mx={"auto"}> My Profile</MenuItem>
                <MenuItem mx={"auto"}>Membership Plan</MenuItem>
                <MenuItem mx={"auto"}> Payment History</MenuItem>
                <MenuItem mx={"auto"}>Account Setting</MenuItem>
              </MenuList>
            </Menu>
            {/* hamburger */}
            <button
              data-collapse-toggle="navbar-language"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => {
                setHam(!ham);
              }}
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between hidden z-10 w-full  md:flex md:w-auto md:order-1"
            id="menu"
          >
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Your Activity
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Saved
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Favourites
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-600 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Group Profiles
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
