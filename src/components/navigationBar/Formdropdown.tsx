"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const formOptions = [
  { name: "Custom Inquiry", path: "/dashboard/forms/custom-inquiry" },
  { name: "Credit Application", path: "/dashboard/forms/credit-application" },
  {
    name: "Vehicle Appraisal Form",
    path: "/dashboard/forms/vehicle-appraisal",
  },
];

export function FormDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formOptions[0]); // Default to the first option

  const handleOptionSelect = (option: { name: string; path: string }) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-[250px] px-4 py-2 text-sm bg-[#ECF0F1] rounded-md focus:outline-none"
      >
        <span>{selectedOption.name}</span> {/* Display selected option */}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-[250px] mt-1 bg-white rounded-md shadow-lg">
          {formOptions.map((option) => (
            <Link
              key={option.name}
              href={option.path}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EFF9FF]"
              onClick={() => handleOptionSelect(option)} // Update selected option
            >
              {option.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}