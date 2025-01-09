import React from "react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky-500 text-white dark:text-gray-900 py-6 mt-8">
      <div className="w-full mx-auto px-4 gap-3 flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center">
        <div className="flex gap-y-1 flex-col items-start">
          <Logo />
          <p className="font-bold"> rendyyoshizawa@gmail.com</p>
        </div>
        <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
          <p className="text-lg font-bold">
            &copy; {currentYear} Rendev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
