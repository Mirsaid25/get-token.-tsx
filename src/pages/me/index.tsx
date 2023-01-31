import { ModalContext } from '@/Context/ModalContext';
import React, { useContext } from 'react'

interface meProps{}

const index: React.FC<meProps> =()=> {
    const {userInfo} = useContext<any>(ModalContext);

    
    
  return (
    <div>
        <h1>MeIndex</h1>
    </div>
  )
}

export default index