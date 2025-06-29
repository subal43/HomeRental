import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexs/btnContex";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useSubmission } from "../Contexs/SubmissionContext";





export default function Post() {
  const [form, setForm] = useState({
 
    type: "",
    category: "",						//post
    pgGender: "",
    room: "",
    washroom: "",
    description: "",
    price: "",
    location: "",
    photos: [] as string[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialFormState = {
 
    type: "",
    category: "",
    pgGender: "",
    room: "",
    washroom: "",
    description: "",
    price: "",
    location: "",

    photos: [] as string[],
  };

  const { isAuthenticated, setIsAuthenticated ,user } = useAuth();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { markSubmission } = useSubmission();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "photos" && files) {
      const photoArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setForm((prevForm) => ({
        ...prevForm,
        photos: [...prevForm.photos, ...photoArray],
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isAuthenticated) {
    setShowSignUpModal(true);
    return;
  }


// 🟢 Mark submission status true
  if (user?.name) {
    markSubmission(true, user.name);
  }




  // Submit logic here
  // Simulate form submission delay
  //await new Promise((resolve) => setTimeout(resolve, 1000));

  // Reset form
  setForm(initialFormState);
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  // Show success popup using SweetAlert2
  Swal.fire({
    title: "Submitted!",
    text: "Your property listing has been successfully posted.",
    icon: "success",
    confirmButtonColor: "#10B981", // Tailwind green-600
    confirmButtonText: "Awesome!",
    customClass: {
      popup: "rounded-2xl shadow-lg border border-green-300",
      title: "text-green-700 font-bold text-xl",
      htmlContainer: "text-gray-600 text-sm",
      confirmButton: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md",
    },
  });
};

  
  return (
    <div className="relative from-indigo-50 to-white min-h-screen w-[46rem] sm:w-[57rem] md:w-[70rem] lg:w-full">
      {/* SignUP Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2 text-red-700">
              Sign UP Required
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please Sign up then to submit a rental listing.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSignUpModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <Link
                to="/SignUp"
                onClick={() => {
                  setShowSignUpModal(false);
                }}
                className="px-4 py-2 bg-green-800 text-white rounded-md"
              >
                Go to Sign UP
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Form UI */}
      <div className="flex flex-col sm:flex-row justify-evenly items-center sm:items-start  bg-gray-100">
        {/* Left Side */}
        <div className="w-[37rem] flex flex-col justify-center items-center">
          <div className="h-32 mt-9 ml-9 font-semibold">
            <div>
              <div className="text-gray-700 text-7xl sm:text-[3.5rem]">
                <h2>
                  Quick <span className="text-gray-800">Upload</span>
                </h2>
              </div>
              <div className="text-[3.5rem] ml-12 sm:text-[2.5rem] text-gray-500">
                <h2>
                  Faster <span className="text-red-800">Rentals</span>
                </h2>
              </div>
              <div className="ml-12 sm:ml-0">
                <p className="text-base text-gray-900">
                  Post your rental in seconds and get leads fast.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 ml-8 sm:ml-12">
            <img
              src="/home_rental1.jpg"
              alt="Rental home"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Animated Form Section */}
        <motion.div
          className="w-[44rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-xl sm:w-[26rem] lg:w-[31rem] xl:w-[34rem] mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Create a Rent Listing
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
        
            

              <div className="flex px-4 items-center space-x-6">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  type:
                </p>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="apartment"

                    className="accent-green-800"
                    disabled={!isAuthenticated}
                  />
                  <span className="text-gray-600 font-medium">Apartment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="boys"

                    className="accent-green-800"
                    disabled={!isAuthenticated}
                  />
                  <span className="text-gray-600 font-medium">House</span>
                </label>
              </div>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 border text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isAuthenticated}
              >
                <option value="">Select Category</option>
                <option value="individual">Single</option>
                <option value="individual">Double</option>
                <option value="family">Family</option>
                <option value="pg">Pg</option>
                <option value="others">Others</option>
              </select>

              {form.category === "pg" && (
                <div className="mt-4 p-4 bg-purple-50 border border-purple-300 rounded-lg shadow-inner">
                  <p className="text-sm font-medium text-purple-700 mb-2">
                    PG For:
                  </p>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="pgGender"
                        value="girls"
                        checked={form.pgGender === "girls"}
                        onChange={handleChange}
                        className="accent-purple-600"
                        disabled={!isAuthenticated}
                      />
                      <span className="text-purple-800 font-medium">Girls</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="pgGender"
                        value="boys"
                        checked={form.pgGender === "boys"}
                        onChange={handleChange}
                        className="accent-purple-600"
                        disabled={!isAuthenticated}
                      />
                      <span className="text-purple-800 font-medium">Boys</span>
                    </label>
                  </div>
                </div>
              )}

              <select
                name="room"
                value={form.room}
                onChange={handleChange}
                className="w-full p-3 border text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isAuthenticated}
              >
                <option value="">Select room </option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4+ BHK">4+ BHK</option>

              </select>

              <input
                name="washroom"
                placeholder="washroom"
                value={form.washroom}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isAuthenticated}
              />
              <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isAuthenticated}
              />
              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isAuthenticated}
              />
              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isAuthenticated}
              />



              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Photos
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  name="photos"
                  multiple
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  className="block w-full text-sm text-gray-900
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-100 file:text-green-700
                    hover:file:bg-green-200
                    rounded-lg bg-white focus:outline-none"
                />

                {form.photos.length > 0 && form.photos[0] !== "" && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`preview-${index}`}
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Submit Listing
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}