import { ModalContext } from "@/Context/ModalContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () =>{
   const router = useRouter()
   const id:string | undefined = router.asPath.split("/").at(-1);

  const { InfoCoursessArr } = useContext<any>(ModalContext);

  const name:any  = InfoCoursessArr.filter( (item :any) => {
    if(item.id.toString() === id){
        return item.courses
    }
  })

    return(
        <div className="mt-20 p-5">
            {name[0]?.courses}
        </div>
    )
}

export default Home