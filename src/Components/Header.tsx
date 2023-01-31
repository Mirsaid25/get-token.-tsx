import { ModalContext } from "@/Context/ModalContext";
import React, { useContext } from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { setModalHendel, userInfo } = useContext<any>(ModalContext);

  return (
    <header className="w-full p-4 bg-blue-400 fixed top-0 left-0 flex items-center justify-between ">
      <h1 className="text-3xl font-bold text-white">Wepro</h1>
      {userInfo?.name.length > 2 ? (
        <div className="p-1 px-3 flex items-center justify-center border-[3px] border-white rounded-xl cursor-pointer">
          <p className="text-white">{userInfo.name}</p>
        </div>
      ) : (
        <div
          onClick={(e) => setModalHendel(true)}
          className="p-1 w-20 flex items-center justify-center border-[3px] border-white rounded-xl cursor-pointer"
        >
          <p className="text-white">Sing in</p>
        </div>
      )}
    </header>
  );
};

export default Header;
