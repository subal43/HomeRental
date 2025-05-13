import { useState, useRef } from "react";
import { Link } from 'react-router-dom';

export default function Post() {
  const [form, setForm] = useState({
    owner: "",
    contact: "",
    description: "",
    price: "",
    location: "",
    category: "",
    pgGender: "",
    photos: [] as string[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialFormState = {
    owner: "",
    contact: "",
    description: "",
    price: "",
    location: "",
    category: "",
    pgGender: "",
    photos: [] as string[],
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); //  Auth state placeholder
  const [showLoginModal, setShowLoginModal] = useState(false); //   For popup modal


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

    if (!isLoggedIn) {
      setShowLoginModal(true); // Show popup
      return;
    }

    // Submit logic here
    setForm(initialFormState);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative bg-gray-100 min-h-screen w-[46rem] sm:w-[57rem] md:w-[70rem] lg:w-full">
      {/*  Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2 text-red-700">Login Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please log in to submit a rental listing.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <Link to="/Login"
                onClick={() => {
                  setShowLoginModal(false);
                  // Redirect to login or open login modal
                }}
                className="px-4 py-2 bg-green-800 text-white rounded-md"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      )}


      {/* Main Form UI */}

      <div className="flex flex-col sm:flex-row justify-evenly items-center sm:items-start bg-gray-100">

        {/* Left Side Image and Heading */}
        <div className="w-[37rem] flex flex-col justify-center items-center">
          <div className="h-32 mt-9 ml-9 font-semibold">
            <div>
              <div className="text-gray-700 text-7xl sm:text-[3.5rem]">
                <h2>Quick <span className="text-gray-800">Upload</span></h2>
              </div>
              <div className="text-[3.5rem] ml-12 sm:text-[2.5rem] text-gray-500">
                <h2>Faster <span className="text-red-800">Rentals</span></h2>
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

        {/* Form Section */}
        <div className="w-[44rem]">
          <div className="max-w-xl sm:w-[26rem] lg:w-[31rem] xl:w-[34rem] mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Create a Rent Listing
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="owner"
                placeholder="Owner name"
                value={form.owner}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isLoggedIn}
              />
              <input
                name="contact"
                placeholder="Contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isLoggedIn}
              />
              <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isLoggedIn}
              />
              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isLoggedIn}
              />
              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isLoggedIn}
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 border text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                disabled={!isLoggedIn}
              >
                <option value="">Select Category</option>
                <option value="individual">Individual</option>
                <option value="family">Family</option>
                <option value="pg">Pg</option>
                <option value="others">Others</option>
              </select>

              {form.category === "pg" && (
                <div className="mt-4 p-4 bg-purple-50 border border-purple-300 rounded-lg shadow-inner">
                  <p className="text-sm font-medium text-purple-700 mb-2">PG For:</p>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="pgGender"
                        value="girls"
                        checked={form.pgGender === "girls"}
                        onChange={handleChange}
                        className="accent-purple-600"
                        disabled={!isLoggedIn}
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
                        disabled={!isLoggedIn}
                      />
                      <span className="text-purple-800 font-medium">Boys</span>
                    </label>
                  </div>
                </div>
              )}

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
                  disabled={!isLoggedIn}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Submit Listing
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
