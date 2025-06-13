import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPhoneAlt,

} from 'react-icons/fa';
import { MdOutlineArticle, MdEmail } from 'react-icons/md';
import { motion } from 'framer-motion';


const slides: string[] = ['./room1.jpeg', './room2.jpeg', './room3.jpeg'];





interface Property {
  id: string;
  title: string;

}

const Rent: React.FC = () => {
  const [showBudget, setShowBudget] = useState(false);
  const [showBedroom, setShowBedroom] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [userContact, setUserContact] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [ack, setAck] = useState(false);
  const [error, setError] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedBedroom, setSelectedBedroom] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [slideIndices, setSlideIndices] = useState<number[]>([]);



  const handleSendRequest = () => {
    if (userContact.trim() === '' || userMessage.trim() === '') {
      setError("⚠️ Please fill in both fields before submitting.");
      setTimeout(() => setError(''), 3000);
      return;
    }

    setAck(true);
    setUserContact('');
    setUserMessage('');

    setTimeout(() => {
      setAck(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        {
          id: 1,
          address: '123 MG Road, Bengaluru',
          type: 'House',
          room: '2 BHK',
          washrooms: '2 Bathrooms',
          category: 'Family Room',
          description: 'Lift available',
          pgGender: '',
          price: 5000,
          owner: { name: 'Rakesh Mehta', phone: '+91 9876543210', email: 'rakesh@example.com' },
        },
        {
          id: 2,
          address: 'Baner Road, Kolkata',
          type: 'Apartment',
          room: '1 BHK',
          washrooms: '1 Bathroom',
          category: 'Single Room',
          description: 'Near bus stop',
          pgGender: '',
          price: 2500,
          owner: { name: 'Neha Sharma', phone: '+91 8888888888', email: 'neha@example.com' },
        },
        {
          id: 3,
          address: 'Salt Lake, Kolkata',
          type: 'Flat',
          room: '3 BHK',
          washrooms: '2 Bathrooms',
          category: 'Family Room',
          description: 'Garden view',
          pgGender: '',
          price: 7500,
          owner: { name: 'Amit Roy', phone: '+91 9999999999', email: 'amit@example.com' },
        },
      ];
      setAllProperties(dummyData);
      setFilteredProperties(dummyData); // Initial display
    };

    fetchData();
  }, []);


  useEffect(() => {
  const interval = setInterval(() => {
    setSlideIndices((prevIndices) =>
      prevIndices.map((prev) => (prev + 1) % slides.length)
    );
  }, 5000);

  return () => clearInterval(interval);
}, [slides.length]);



  // Initialize slide index per card
  useEffect(() => {
    if (filteredProperties.length > 0) {
      setSlideIndices(Array(filteredProperties.length).fill(0));
    }
  }, [filteredProperties]);



  const next = (index: number) => {
    setSlideIndices((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] + 1) % slides.length;
      return updated;
    });
  };

  const prev = (index: number) => {
    setSlideIndices((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] - 1 + slides.length) % slides.length;
      return updated;
    });
  };
  const goToSlide = (cardIndex: number, slideIndex: number) => {
    setSlideIndices((prev) => {
      const updated = [...prev];
      updated[cardIndex] = slideIndex;
      return updated;
    });
  };

  const toggleBudget = () => {
    setShowBudget(!showBudget);
    setShowBedroom(false);
    setShowCategory(false);
  };

  const toggleBedroom = () => {
    setShowBedroom(!showBedroom);
    setShowBudget(false);
    setShowCategory(false);
  };

  const toggleCategory = () => {
    setShowCategory(!showCategory);
    setShowBudget(false);
    setShowBedroom(false);
  };

  const openImageModal = (index: number) => {
    setActiveImage(index);
    setShowImageModal(true);
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % slides.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + slides.length) % slides.length);



  // debouncing for search


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      //  Call API or filter logic here
      console.log("Searching for:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);


  useEffect(() => {
    let filtered = allProperties;

    if (debouncedSearchTerm) {
      filtered = filtered.filter((p) =>
        p.address.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (selectedBudget) {
      const [min, max] = selectedBudget.split('-').map((val) => parseInt(val.replace(/[₹, ]/g, '')));
      filtered = filtered.filter((p) => p.price >= min && (max ? p.price <= max : true));
    }

    if (selectedBedroom) {
      filtered = filtered.filter((p) => p.room === selectedBedroom);
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProperties(filtered);
  }, [debouncedSearchTerm, selectedBudget, selectedBedroom, selectedCategory, allProperties]);








  return (

    <div className='bg-gray-100 h-full'>
    <motion.div
  className="p-5 w-[46rem] sm:w-[58rem] md:w-[69rem] lg:w-[64rem] xl:w-full bg-gray-100 h-[100vh]"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>

      {/* Search */}
      <div className="flex justify-center items-center">
        <div className="flex items-center my-12 w-[37rem] md:w-[44rem] bg-white shadow-xl rounded-full px-6 py-3 hover:shadow-2xl">
          <FaSearch className="text-gray-700 text-lg" />
          <input
            type="text"
            className="w-full px-5 py-3 bg-transparent text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0"
            placeholder="Search Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />


        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-6 flex-wrap">
        {[
          {
            label: 'Budget',
            show: showBudget,
            toggle: toggleBudget,
            options: ['₹500 - ₹1000', '₹1001 - ₹3000', '₹3001 - ₹5000', '₹5001 - ₹7000', '₹7000 and above'],
            width: 'w-64',
          },
          {
            label: 'Bedrooms',
            show: showBedroom,
            toggle: toggleBedroom,
            options: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'],
            width: 'w-48',
          },
          {
            label: 'Room Category',
            show: showCategory,
            toggle: toggleCategory,
            options: ['Single Room', 'Double Room', 'Family Room', 'Pg', 'others'],
            width: 'w-56',
          },
        ].map(({ label, show, toggle, options, width }, index) => (
          <div key={index} className="relative">
            <button
              onClick={toggle}
              className="bg-indigo-100 text-gray-800 px-5 py-3 rounded-full shadow-md hover:bg-indigo-200 flex items-center gap-2 font-medium"
            >
              {label} <FaChevronDown className="text-sm" />
            </button>
            {show && (
              <div className={`absolute mt-3 bg-white border border-gray-200 rounded-xl shadow-2xl ${width} z-20`}>
                <ul className="divide-y divide-gray-100">
                  {options.map((option, i) => (
                    <li
                      key={i}
                      className="p-3 hover:bg-indigo-50 cursor-pointer text-gray-700 transition-colors"
                      onClick={() => {
                        if (label === 'Budget') setSelectedBudget(option.includes('above') ? '7000-' : option.replace('₹', '').replace(' ', ''));
                        if (label === 'Bedrooms') setSelectedBedroom(option);
                        if (label === 'Room Category') setSelectedCategory(option);
                      }}
                    >
                      {option}
                    </li>
                  ))}

                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Property Cards */}
      {filteredProperties.length > 0 ? (
        <div className="flex flex-col items-center mt-10 gap-6">
          {filteredProperties.map((property, index) => (
            <div key={property.id} className="w-[40rem] sm:w-[50rem] md:w-[55rem] flex bg-white rounded-xl shadow-md overflow-hidden">
              {/* Image Slider */}
              <div className="w-[22rem] border-r border-gray-300 relative">
                <div className="w-full h-full overflow-hidden relative">
                  <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${slideIndices[index] * 100}%)` }}
                  >
                    {slides.map((src, slideIndex) => (
                      <img
                        key={slideIndex}
                        src={src}
                        alt={`Slide ${slideIndex + 1}`}
                        className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                        onClick={() => openImageModal(slideIndex)}
                      />
                    ))}
                  </div>


                  <button
                    onClick={() => prev(index)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={() => next(index)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FaChevronRight />
                  </button>

                  {/* Slider Dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {slides.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${dotIndex === slideIndices[index] ? 'bg-indigo-600 scale-125' : 'bg-gray-300'
                          }`}
                        onClick={() => goToSlide(index, dotIndex)}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="w-[31rem] p-5">
                <h2 className="text-2xl font-semibold text-gray-800">{`${property.room} ${property.type}`}</h2>
                <p className="text-gray-600 mt-1">📍 {property.address}</p>
                <p className="mt-2 text-gray-600">🏠 Type: {property.type} | 🛏️ {property.room} | 🚿 {property.washrooms}</p>
                <p className="mt-1 text-gray-600">👥 Category: {property.pgGender} {property.category}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <MdOutlineArticle />
                  <p>Description: {property.description}</p>
                </div>
                <p className="mt-3 text-indigo-600 font-bold text-lg">₹{property.price}/month</p>

                <div className="mt-5 flex gap-4">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setProperty(property);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    <FaPhoneAlt /> Contact
                  </button>
                  {/* <button className="flex items-center gap-2 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100">
                    <FaEye /> View
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No properties found for the selected filters.</p>
      )}


      {/* Contact Modal */}
      {showModal && property && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[32rem] p-6 relative">
            <button
              onClick={() => {
                setShowModal(false);
                setAck(false);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-3">Owner Contact Information</h3>
            <p className="mb-1"><strong>Name:</strong> {property.owner.name}</p>
            <p className="mb-1"><strong>Phone:</strong> {property.owner.phone}</p>
            <p className="mb-4"><strong>Email:</strong> {property.owner.email}</p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Email or Phone"
                value={userContact}
                onChange={(e) => setUserContact(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <textarea
                placeholder="Your Message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 resize-none"
              ></textarea>
              <button
                onClick={handleSendRequest}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                Send Request
              </button>

              {error && <p className="text-red-600 font-medium text-sm text-center animate-pulse">{error}</p>}
              {ack && <p className="text-green-600 font-medium text-sm text-center">✅ Request sent successfully!</p>}
            </div>
          </div>
        </div>
      )}

      {/* Full Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative  w-[36rem]">
            <button
              className="absolute top-14 sm:top-4 right-6 text-gray-800 text-3xl font-bold"
              onClick={() => setShowImageModal(false)}
            >
              &times;
            </button>
            <img
              src={slides[activeImage]}
              alt={`Large ${activeImage}`}
              className="w-full h-[60vh] object-contain rounded-xl"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
   </motion.div>
   </div>
  );
};

export default Rent;
