"use client";

// import { user } from '@/lib/fakeData/user';
import React, { useEffect, useRef, useState } from "react";
import { RiCustomerServiceFill } from "react-icons/ri";
import SideBar from "../navigationBar/SideBar";
import TopBar from "../navigationBar/TopBar";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaFileCircleQuestion, FaRegImage } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  const navLink = [
    { name: "Overview", href: "/", icon: MdOutlineDashboard },
    { name: "Form’s", href: "/", icon: CgNotes },
    { name: "Images", href: "/", icon: FaRegImage },
    { name: "Car list", href: "/", icon: FaCar },
    {
      name: "Add review",
      href: "/",
      icon: MdOutlineRateReview,
    },
    {
      name: "FAQ",
      href: "/",
      icon: FaFileCircleQuestion,
    },
  ];

  const additionalRoutes = [
    {
      name: "Settings",
      href: "/",
      icon: IoSettingsSharp,
    },
    { name: " Help", href: "/", icon: RiCustomerServiceFill },
  ];
  const user = {
    name: "John Doe",
    role: "admin",
    email: "q4A0Q@example.com",
  };
  return (
    <div className="flex ">
      <div className="max-h-screen h-full sticky top-0 z-50 shadow-2xl">
        <SideBar
          additionalRoutes={additionalRoutes}
          navLink={navLink}
          isOpen={isOpen}
          user={user}
          navRef={navRef}
        />
      </div>
      <div className="w-full">
        <div className="sticky top-0 z-40">
          <TopBar setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;