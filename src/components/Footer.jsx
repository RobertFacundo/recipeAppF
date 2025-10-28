import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-4 text-center text-gray-700 text-sm mt-12 shadow-inner">
      Designed & developed &gt;{" "}
      <a
        href="https://github.com/RobertFacundo"
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
      >
        Robert
      </a>
    </footer>
  )
}

export default Footer;