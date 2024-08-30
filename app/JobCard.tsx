import { Calendar, Heart, Pin } from "lucide-react";
import Image from "next/image";
import React from "react";

const JobCard = () => {
  return (
    <section className="p-5 relative flex flex-col gap-5 md:bg-[#f3fdf3] bg-white border md:border-emerald-500 border-gray-200 rounded-lg">
      <Heart
        className="absolute p-1 right-5 top-5 bg-white rounded-full border md:scale-100 scale-75"
        size={35}
        fill="gray"
        stroke="gray"
      />
      <div className="flex items-center">
        <Image
          src={"/logo.webp"}
          alt="logo"
          width={100}
          height={100}
          className="md:w-20 w-12 aspect-square object-contain"
        />
        <span>
          <p className="font-semibold md:text-xl my-1">Gaming UI designer</p>
          <p className="text-emerald-700 text-sm font-semibold">
            Rockstar Games
          </p>
        </span>
      </div>
      <div className="flex gap-5 items-center md:text-sm text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Pin size={15} />
          ElMansoura, Egypt
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={15} />
          10 Days ago
        </span>
      </div>
      <div className="flex items-center md:gap-5 gap-2 md:text-sm text-xs">
        <span className="md:bg-white bg-[#F6F5F3] rounded-md py-1 md:px-3 px-1">
          0 - 3y exp
        </span>
        <span className="md:bg-white bg-[#F6F5F3] rounded-md py-1 md:px-3 px-1">
          Full time
        </span>
        <span className="md:bg-white bg-[#F6F5F3] rounded-md py-1 md:px-3 px-1">
          Remote
        </span>
      </div>
      <hr />
      <div className="flex md:gap-5 gap-1 text-gray-500 md:text-sm text-[10px]">
        <span>Creative/Design</span>-<span>IT/Software development</span>-
        <span>Gaming</span>
      </div>
    </section>
  );
};

export default JobCard;
