import { useState, useContext } from "react";
import { DrawerDash } from "../../components/DrawerDash";
import { ContextMain } from "../../context/ContextMain";
import { Navigate } from "react-router-dom";

function NotAuth() {
  const { auth } = useContext(ContextMain);
  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <>
      <main className="min-h-screen bg-blue-700/90 pb-1">
        <div className="flex gap-4 items-center px-4 py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Acceso denegado</p>
        </div>
        <div className="w-11/12 py-9 max-w-7xl flex flex-col items-center mx-auto">
            <p className="text-xl xl:text-5xl">No tienes accesso permitido a esta vista</p>
            <figure className="w-full h-[20rem]">
                <img src="/ui/secure.svg" alt="imagen de acceso denegado" className="w-full h-full object-contain" />
            </figure>
        </div>
      </main>
    </>
  );
}

export default NotAuth;
