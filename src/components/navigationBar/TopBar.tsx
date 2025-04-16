
import { Menu, X } from "lucide-react";
// import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FormDropdown } from "./Formdropdown";

export default function TopBar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: profileData } = useGetMyProfileQuery();
  const profile = profileData?.data;

  const pathname = usePathname();
  const isFormsRoute =
    pathname === "/"  ||
    "/" ||
    "/";

  return (
    <header className="shadow-lg bg-white">
      <div className="flex items-center justify-between lg:justify-end  px-6 py-3 w-full">
        <button className="lg:hidden " onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
        {/* Center Section */}
        {/* {profile && (
          <div className="flex-1 max-w-[600px] mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 h-11 text-sm bg-borderColor/50 border-[1px] border-primary/10 rounded-xl"
              />
            </div>
          </div>
        )} */}
        <div className="flex w-full justify-between items-center">
          {/* Left section  */}
          {isFormsRoute && <FormDropdown />}

          {/* Right Section */}
          {profile && (
            <div className="md:flex items-center gap-4 hidden">
              <div className="flex items-center justify-center sm:text-lg sm:px-4 px-3 py-1 sm:py-2 gap-2">
                {/* <Image
                  className="w-10 h-10 rounded-full"
                  src={profile?.img}
                  alt="User Avatar"
                /> */}
                <div className="w-12 h-12 rounded-full bg-gray/20 place-content-center text-center">
                  {profile?.firstName?.[0].toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-medium">
                    {profile?.firstName} {profile?.lastName}
                  </h3>
                  <p className="text-xs text-light font-normal">
                    {profile?.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function useGetMyProfileQuery() {
  // Mock implementation of fetching profile data
  const data = {
    data: {
      firstName: "John",
      lastName: "Doe",
      role: "Admin",
      img: "/path/to/avatar.jpg",
    },
  };

  return { data };
}
