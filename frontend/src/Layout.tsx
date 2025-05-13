import { Outlet } from "react-router-dom";
import { Header } from "./Component/Header/Header";


const Layout = () => {
  return (
   <>
   <Header/>
   <Outlet/>
   
   </>
  )
}

export default Layout


