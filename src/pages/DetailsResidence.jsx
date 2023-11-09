import {useState, useContext} from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate } from "react-router-dom";

function DetailsResidence() {
    const { auth } = useContext(ContextMain)


  if (!auth) {
    return <Navigate to={"/"}></Navigate>
  }
  return (
    <>
      <main className="min-h-screen bg-blue-700/90 pb-1">
        <div className="flex gap-4 items-center px-4 py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Dashboard</p>
        </div>
        <div>DetailsResidence</div>
      </main>
    </>
    
  )
}

export default DetailsResidence