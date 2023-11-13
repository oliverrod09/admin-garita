import React from "react";
import { Button } from "@material-tailwind/react";
import Scanner from "../components/Scanner";
import { ButtonBack } from "../components/ButtonBack";
import { useState, useContext } from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate } from "react-router-dom";

function VerifyInv() {
  const { auth } = useContext(ContextMain);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <>
      <main className="min-h-screen bg-blue-700/90 pb-1">
        <div className="flex gap-4 items-center px-4 py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Verificar Invitación</p>
        </div>
        <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
          <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
            <ButtonBack></ButtonBack>
          </div>
          <div className="w-10/12 md:w-6/12 my-8 mx-auto bg-white p-4 rounded-md">
            <h1 className="text-3xl font-bold text-center ">
            Escanear codigo de invitación
          </h1>
          <div className="w-full">
            <Scanner></Scanner>
          </div>
          </div>
          
        </div>
      </main>
    </>
  );
}

export default VerifyInv;
