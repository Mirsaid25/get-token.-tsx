import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import { ModalContext } from "@/Context/ModalContext";
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const InfoCoursessArr = [
	{
		id:1,
		courses:"ПУТЬ В DIGITAL",
	},
	{
		id:2,
		courses:"FRONTEND РАЗРАБОТКА",
	},
	{
		id:3,
		courses:"ГРАФИЧЕСКИЙ ДИЗАЙН",
	},
	{
		id:4,
		courses:"REACT.JS",
	}
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [modalHendel, setModalHendel] = useState<any>(false);
  const [userInfo, setUserInfo] = useState<{ name: string }>({ name: "" });

  return (
    <ModalContext.Provider value={{setModalHendel, setUserInfo, userInfo, InfoCoursessArr }}>
      <div>
        <Header/>
        <main className="mt-16">{children}</main>
		{modalHendel ? <Modal /> : null}
      </div>
    </ModalContext.Provider>
  );
};

export default Layout;
