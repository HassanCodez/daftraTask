import { BriefcaseBusiness, House, Menu, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-[#161516] h-20 grid grid-cols-5 gap-10 place-items-center">
      <div className="flex items-center gap-5 col-span-2  md:hidden">
        <div className="relative w-fit">
          <Image
            src={"/profile.jpg"}
            alt="profile"
            width={100}
            height={100}
            className="relative rounded-full w-10 h-10"
          />
          <Menu
            className="absolute bg-white rounded-full p-1 right-0 -bottom-1"
            size={20}
          />
        </div>
        <Search
          color="white"
          className="bg-[#47a64b] rounded-full p-1"
          size={30}
        />
      </div>
      <div className="md:hidden block" />
      <h1 className="text-3xl text-white font-semibold col-auto">
        I<span className="text-[#47a64b]">Z</span>AM
      </h1>
      <div className="border min-w-96 bg-white my-auto col-span-3 p-1 rounded-3xl place-self-start hidden md:flex">
        <Search className="bg-[#47a64b] text-white size-9 p-2 rounded-full " />
        <input
          placeholder="Search by name,job title..."
          type="text"
          className="outline-none border-none w-full bg-transparent px-2"
        />
      </div>
      <div className="md:flex hidden justify-center items-center gap-10 text-white">
        <span className="flex flex-col justify-center items-center cursor-pointer">
          <House />
          <span>Home</span>
        </span>
        <span className="flex flex-col justify-center items-center cursor-pointer">
          <BriefcaseBusiness />
          Jobs
        </span>
      </div>
    </div>
  );
};

export default Navbar;
