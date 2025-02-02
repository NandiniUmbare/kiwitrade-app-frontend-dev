// import React from "react";
// import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons
// import "./Footer.css"; // Import the CSS file

// const Footer: React.FC = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         {/* Category Section */}
//         <div className="footer-section">
//           <h4 className="footer-title">Category</h4>
//           <ul className="footer-list">
//             <li>Real Estate</li>
//             <li>Cars & Boats</li>
//             <li>Industrial Jobs</li>
//             <li>Restaurants</li>
//             <li>Events</li>
//             <li>Services & Specials</li>
//           </ul>
//         </div>

//         {/* Company Section */}
//         <div className="footer-section">
//           <h4 className="footer-title">Company</h4>
//           <ul className="footer-list">
//             <li>How to Post Ad with us</li>
//             <li>How to Sell with us</li>
//             <li>About Us</li>
//             <li>F.A.Q</li>
//             <li>Our Brand</li>
//           </ul>
//         </div>

//         {/* Logo & Social Links */}
//         <div className="footer-section">
//           <h4 className="footer-logo">PROTrader</h4>
//           <p className="footer-subtitle">Trade Like A Real Pro</p>
//           <p>Social Just You Connected Us!</p>
//           <div className="footer-social">
//             <a href="#" className="social-icon">
//               <FaLinkedin size={20} />
//               <p className="font-name">LinkedIn</p>
//             </a>
//             <a href="#" className="social-icon">
//               <FaFacebook size={20} />
//               <p className="font-name">Facebook</p>
//             </a>
//             <a href="#" className="social-icon">
//               <FaTwitter size={20} />
//               <p className="font-name">Twitter</p>
//             </a>
//             <a href="#" className="social-icon">
//               <FaInstagram size={20} />
//               <p className="font-name">Instagram</p>
//             </a>
//           </div>
//         </div>

//         {/* Newsletter Section */}
//         <div className="footer-section">
//           <h4 className="footer-title">Join Our Newsletter & More information.</h4>
//           <div className="newsletter">
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="newsletter-input"
//             />
//             <button className="newsletter-button">→</button>
//           </div>
//           <h4 className="footer-title">Secured Payment Gateways</h4>
//           <div className="payment-icons">
//             <span className="payment-icon">Visa</span>
//             <span className="payment-icon">MasterCard</span>
//             <span className="payment-icon">Amex</span>
//             <span className="payment-icon">Discover</span>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Footer */}
//       <div className="footer-bottom">
//         <p>©Copyright 2024 Probid | Design By DevKey</p>
//         <div className="footer-links">
//           <a href="#">Support Center</a>
//           <a href="#">Terms & Conditions</a>
//           <a href="#">Privacy Policy</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-4  ">
        {/* Category Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">Category</h4>
          <ul className="space-y-2">
            <li>Real Estate</li>
            <li>Cars & Boats</li>
            <li>Industrial Jobs</li>
            <li>Restaurants</li>
            <li>Events</li>
            <li>Services & Specials</li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>How to Post Ad with us</li>
            <li>How to Sell with us</li>
            <li>About Us</li>
            <li>F.A.Q</li>
            <li>Our Brand</li>
          </ul>
        </div>

        {/* Logo & Social Links */}
        <div>
          <h4 className="text-xl font-bold mb-2">PROTrader</h4>
          <p className="text-sm mb-4">Trade Like A Real Pro</p>
          <p className="text-sm mb-2">Social Just You Connected Us!</p>
          <div className="flex gap-4">
            <a href="#" className="text-white flex flex-col items-center hover:text-blue-500">
              <FaLinkedin size={20} />
              <p className="text-xs font-light">LinkedIn</p>
            </a>
            <a href="#" className="text-white flex flex-col items-center hover:text-blue-600">
              <FaFacebook size={20} />
              <p className="text-xs font-light">Facebook</p>
            </a>
            <a href="#" className="text-white flex flex-col items-center hover:text-blue-400">
              <FaTwitter size={20} />
              <p className="text-xs font-light">Twitter</p>
            </a>
            <a href="#" className="text-white flex flex-col items-center hover:text-pink-500">
              <FaInstagram size={20} />
              <p className="text-xs font-light">Instagram</p>
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div >
          <h4 className="text-lg font-bold mb-4 ">Join Our Newsletter & More information.</h4>
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-3 py-2 border border-gray-700 bg-gray-800 text-white text-sm rounded"
            />
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">→</button>
          </div>
          <h4 className="text-lg font-bold mb-2">Secured Payment Gateways</h4>
          <div className="flex gap-2">
            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded">Visa</span>
            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded">MasterCard</span>
            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded">Amex</span>
            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded">Discover</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>©Copyright 2024 Probid | Design By DevKey</p>
        <div className="flex justify-center gap-6 mt-2">
          <a href="#" className="hover:underline">Support Center</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
