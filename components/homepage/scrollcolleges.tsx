"use client";

import Image from "next/image";
import React from "react";

const colleges = [
  {
    name: "Google",
    logo: "/colleges/google.webp",
  },
  {
    name: "Cambridge",
    logo: "/colleges/cambridge.webp",
  },
  {
    name: "USC",
    logo: "/colleges/usc.webp",
  },
  {
    name: "NYU",
    logo: "/colleges/nyu.webp",
  },
  {
    name: "Stanford",
    logo: "/colleges/stanford.webp",
  },
  {
    name: "Harvard",
    logo: "/colleges/harvard.webp",
  },
  {
    name: "UPenn",
    logo: "/colleges/upenn.webp",
  },
  {
    name: "Princeton",
    logo: "/colleges/princeton.webp",
  },
  {
    name: "Google",
    logo: "/colleges/google.webp",
  },
  {
    name: "Cambridge",
    logo: "/colleges/cambridge.webp",
  },
  {
    name: "USC",
    logo: "/colleges/usc.webp",
  },
  {
    name: "NYU",
    logo: "/colleges/nyu.webp",
  },
  {
    name: "Stanford",
    logo: "/colleges/stanford.webp",
  },
  {
    name: "Harvard",
    logo: "/colleges/harvard.webp",
  },
  {
    name: "UPenn",
    logo: "/colleges/upenn.webp",
  },
  {
    name: "Princeton",
    logo: "/colleges/princeton.webp",
  },
  {
    name: "Google",
    logo: "/colleges/google.webp",
  },
  {
    name: "Cambridge",
    logo: "/colleges/cambridge.webp",
  },
  {
    name: "USC",
    logo: "/colleges/usc.webp",
  },
  {
    name: "NYU",
    logo: "/colleges/nyu.webp",
  },
  {
    name: "Stanford",
    logo: "/colleges/stanford.webp",
  },
  {
    name: "Harvard",
    logo: "/colleges/harvard.webp",
  },
  {
    name: "UPenn",
    logo: "/colleges/upenn.webp",
  },
  {
    name: "Princeton",
    logo: "/colleges/princeton.webp",
  },
];

const ScrollColleges = () => {
  return (
    <div className="py-12">
      <h2 className="text-center text-xl font-semibold text-gray-500 mb-8">
        TRUSTED BY TOP WRITERS EVERYWHERE
      </h2>
      <div
        className="relative m-auto w-full overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']"
      >
        <div className="flex w-max animate-infinite-scroll">
          {colleges.concat(colleges).map((college, index) => (
            <div
              className="slide flex w-[200px] items-center justify-center"
              key={index}
            >
              <Image
                src={college.logo}
                alt={college.name}
                width={100}
                height={70}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollColleges;

