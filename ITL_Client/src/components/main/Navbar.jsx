import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../modals/LoginModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("login");
  return (
    <nav className="bg-gray-800 p-4 min-h-[100px] flex items-center rounded-md">
      <div className="max-w-7xl mx-auto px-4 w-full ">
        <div className="flex justify-between">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="hidden lg:block h-8 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/2760/2760947.png"
              alt="Workflow logo"
            />
            <span className="text-white text-lg font-semibold ml-2">
              <strong>Trafik Işıkları Projesi</strong>{" "}
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to={"/"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Ana Sayfa
              </Link>
              <Link
                to={"/live"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Canli
              </Link>
              <Link
                to={"/cameras"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Istatistikler
              </Link>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setSelectedTab("login");
                    setIsModalOpen(true);
                  }}
                  className="text-sm bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => {
                    setSelectedTab("register");
                    setIsModalOpen(true);
                  }}
                  className=" text-sm border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  Kayıt Ol
                </button>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <LoginModal tab={selectedTab} setIsModaActive={setIsModalOpen} />
      )}
    </nav>
  );
};

export default Navbar;
