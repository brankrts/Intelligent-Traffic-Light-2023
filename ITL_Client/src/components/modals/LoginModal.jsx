import React, { useEffect, useState } from "react";

const LoginModal = ({ tab, setIsModaActive }) => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto ">
      <div className=" flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className=" fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="h-[700px] inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-gradient-to-b from-black to-blue-500 px-4 py-5 sm:px-6 flex justify-end">
            <button
              onClick={() => {
                setIsModaActive(false);
              }}
              className="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="border-b border-gray-200 mb-4">
              <div className="flex justify-between">
                <div className="w-full">
                  <div
                    className={`w-1/2 text-center py-2 cursor-pointer ${activeTab === "login"
                        ? "text-black font-bold"
                        : "text-gray-500"
                      }`}
                    onClick={() => handleTabChange("login")}
                  >
                    Giriş Yap
                  </div>
                  <div
                    className={`h-1 ${activeTab === "login" && "bg-red-500"}`}
                  ></div>
                </div>
                <div className="w-full h-full flex flex-col  justify-center text-center">
                  <div
                    className={`w-1/2 text-center py-2 cursor-pointer ${activeTab === "register"
                        ? "text-black font-bold"
                        : "text-gray-500"
                      }`}
                    onClick={() => handleTabChange("register")}
                  >
                    Kayıt Ol
                  </div>
                  <div
                    className={`h-1 ${activeTab === "register" && "bg-red-500"
                      }`}
                  ></div>
                </div>
              </div>
            </div>
            {activeTab === "login" ? (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Kullanıcı adınızı girin"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Şifre
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Şifrenizi girin"
                  />
                </div>
                <div className="flex items-center justify-center mt-20">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Giriş Yap
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="İsminizi girin"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="surname"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Soyisim
                  </label>
                  <input
                    type="text"
                    id="surname"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Soyisminizi girin"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email adresinizi girin"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Kullanıcı adınızı girin"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Şifre
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Şifrenizi girin"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password-confirm"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Şifre Tekrar
                  </label>
                  <input
                    type="password"
                    id="password-confirm"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Şifrenizi tekrar girin"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Kayıt Ol
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
