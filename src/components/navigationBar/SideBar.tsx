/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import MainNavLink from "./Navlink";

export default function SideBar({
  user,
  navRef,
  isOpen,
  additionalRoutes,
  navLink,
}: {
  user: any;
  navRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  navLink: any;
  additionalRoutes: any;
}) {
  return (
    <div ref={navRef && navRef} className="min-h-screen h-full flex  text-black">
      <div>
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 md:w-56 lg:w-72 shadow-2xl h-full transform transition-transform duration-300 ease-in-out bg-white  text-black",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <MainNavLink
            additionalRoutes={additionalRoutes}
            navLink={navLink}
            user={user}
          />
        </div>
      </div>
      {/* Sidebar for large screens */}
      <div className="hidden lg:block lg:w-72 h-full ">
        <MainNavLink
          additionalRoutes={additionalRoutes}
          navLink={navLink}
          user={user}
        />
      </div>
    </div>
  );
}