import React from "react";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] px-8 py-14 text-white w-[46rem] sm:w-[53rem] md:w-[70rem] xl:w-[79rem] ">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-12 max-w-[1200px] mx-auto">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">
            Home<span className="text-white">Rental</span>
          </h2>
          <p className="text-gray-300 mt-3 max-w-sm text-sm">
            Affordable and verified rental homes with hassle-free booking and support.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full md:w-[50rem]  ">
          {/* Resources */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4 uppercase text-sm">Resources</h3>
            <ul className="space-y-2 text-gray-300 text-sm font-medium">
              {[
                { name: "Home", to: "/" },
                { name: "Rent", to: "/rent" },
                { name: "Review", to: "/review" },
                { name: "Post Properties", to: "/post" },
                
              ].map(({ name, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `transition-colors duration-200 hover:text-yellow-400 ${
                        isActive ? "text-yellow-400" : "text-gray-300"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4 uppercase text-sm">Contact Us</h3>
            <ul className="text-sm space-y-2 text-gray-300 font-medium">
              <li>📞 +91 8145292065</li>
              <li>✉️ quickrent@gmail.com</li>
              <li>📍 Barasat, Kolkata</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4 uppercase text-sm">Follow Us</h3>
            <div className="flex gap-5 justify-center sm:justify-start text-white">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaTwitter size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
