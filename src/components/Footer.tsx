import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          © {new Date().getFullYear()} Hospital Food Delivery Management System.
        </p>
      </div>
    </footer>
  );
}

export default Footer