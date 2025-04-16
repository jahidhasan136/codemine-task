"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IoIosArrowBack } from "react-icons/io";

interface ImageFile extends File {
  preview?: string;
}

interface FormData {
  name: string;
  theme: string;
  title: string;
  images: ImageFile[];
  logo: ImageFile | null; // For storing the logo image
}

export default function AddSchoolPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    theme: "",
    title: "",
    images: [],
    logo: null,
  });

  const mainInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Handle main image upload
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setFormData((prev) => ({
        ...prev,
        images: [imageFile, ...prev.images],
      }));
    }
  };

  // Handle additional images upload
  const handleAdditionalImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      const newImages = files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  // Handle logo image upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setFormData((prev) => ({
        ...prev,
        logo: imageFile, // Set the logo image
      }));
    }
  };

  // Remove image from the images array
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  // Reset the form data
  const handleReset = () => {
    setFormData({
      name: "",
      theme: "",
      title: "",
      images: [],
      logo: null, // Reset logo
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-4">
        <a
          href="/dashboard/schools"
          className="text-sm font-semibold flex items-center"
        >
          <IoIosArrowBack />
          Back to School List
        </a>
      </div>

      <h1 className="text-3xl font-semibold mb-8">Add School</h1>

      <form
        className="container max-w-4xl 2xl:max-w-7xl space-y-8"
      >
        {/* School Images Section */}
        <div>
          <h2 className="text-base font-medium mb-4">School Image</h2>
          <div className="mb-4">
            <div
              onClick={() => mainInputRef.current?.click()}
              className="relative bg-gray-100 rounded-lg h-80 cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              {formData.images[0] ? (
                <Image
                  src={formData.images[0].preview || "/placeholder.svg"}
                  alt="Main school image"
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImagePlus className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Upload main image
                  </span>
                </div>
              )}
              <input
                ref={mainInputRef}
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 xl:grid-cols-10 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={image.preview || "/placeholder.svg"}
                    alt={`School image ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <div
              onClick={() => additionalInputRef.current?.click()}
              className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <ImagePlus className="w-6 h-6 text-gray-400" />
              <input
                ref={additionalInputRef}
                type="file"
                accept="image/*"
                onChange={handleAdditionalImageUpload}
                multiple
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div>
          <h2 className="text-base font-medium mb-4">School Logo</h2>
          <div className="mb-4">
            <div
              onClick={() => logoInputRef.current?.click()}
              className="relative bg-gray-100 rounded-lg w-40 h-40 p-5 cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center "
            >
              {formData.logo ? (
                <Image
                  src={formData.logo.preview || "/placeholder.svg"}
                  alt="School logo"
                  fill
                  className="object-cover rounded-lg w-32 h-32"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImagePlus className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Upload school logo
                  </span>
                </div>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Basic Information Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-base mb-1">School Name</label>
              <Input
                className="py-6 rounded-xl"
                placeholder="Type school name here"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-base mb-1">Color Theme</label>
              <Input
                className=""
                type="color"
                value={formData.theme || "#8c00ff"}
                onChange={(e) => handleInputChange("theme", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-base mb-1">Title</label>
              <Input
                className="py-6 rounded-xl"
                placeholder="Type school description"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Form Submit and Reset */}
        <div className="flex gap-4">
          <button
            type="button"
            className="w-full rounded-xl py-3 border-2 border-black"
            onClick={handleReset}
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="w-full bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition-colors"
          >
            Add School
          </button>
        </div>
      </form>
    </div>
  );
}
