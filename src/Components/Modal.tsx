import { ModalContext } from "@/Context/ModalContext";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ModalProps {}

type Inputs = {
  email: string;
  password: string;
  name: string;
  exampleRequired: string;
};

const Modal: React.FC<ModalProps> = () => {
  const { setUserInfo, setModalHendel } = useContext<any>(ModalContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("http://192.168.68.132:3030/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.name !== "Conflict") {
          setModalHendel(false);
          router.push("/me");
          setUserInfo(data);
        } else {
          alert("ddd");
        }
      });
  };

  const singIn: SubmitHandler<Inputs> = (data) => {
    fetch("http://192.168.68.132:3030/authentication", {
      method: "POST",
      body: JSON.stringify({ ...data, strategy: "local" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.accessToken.length > 0) {
          setModalHendel(false);
          router.push("/me");
          setUserInfo(data);
        } else {
          alert("ddd");
        }
      });
  };

  const [log, setLog] = useState<boolean>(false);

  return (
    <div
      id="authentication-modal"
      className="absolute top-0 left-0 z-50 p-4 w-full h-screen backdrop-blur-md backdrop-opacity-7"
    >
      <div className="fixed w-2/6 h-auto max-w-md md:h-auto top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/4">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => setModalHendel(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <div className="mb-5 flex items-center justify-center gap-5">
              <div
                onClick={() => setLog(false)}
                className="bg-[#1D4ED8FF] px-7 rounded-md py-2 cursor-pointer"
              >
                <p className="text-white font-semibold">Registation</p>
              </div>
              <div
                onClick={() => setLog(true)}
                className="bg-[#1D4ED8FF] px-7 rounded-md py-2 cursor-pointer"
              >
                <p className="text-white font-semibold">Log In</p>
              </div>
            </div>
            {log ? (
              <form
                onSubmit={handleSubmit(singIn)}
                className="space-y-6"
                name="singin"
              >
                <div>
                  <label
                    htmlFor="email1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password1"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    {...register("password", { required: true })}
                  />
                </div>
                {errors.exampleRequired && <span>This field is required</span>}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Log up
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                name="singin"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Create password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    {...register("password", { required: true })}
                  />
                </div>
                {errors.exampleRequired && <span>This field is required</span>}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
