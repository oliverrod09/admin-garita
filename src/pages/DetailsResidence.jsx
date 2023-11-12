import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate, useParams } from "react-router-dom";
import Axios from "axios";
import { back } from "../const/urls";
import { ButtonBack } from "../components/ButtonBack";

function DetailsResidence() {
  const { auth } = useContext(ContextMain);
  const { id } = useParams();
  const [residence, setResidence] = useState({});

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

  useEffect(() => {
    getResidence();
  }, []);

  async function getResidence() {
    const url = `${back}/residence/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    try {
      const response = await Axios.get(url, config);
      if (response.status == 200) {
        console.log(response.data);
        setResidence(response.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <>
      <main className="min-h-screen bg-blue-700/90 pb-1">
        <div className="flex gap-4 items-center px-4 py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Residence</p>
        </div>
        <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
          <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
          <ButtonBack></ButtonBack>
        </div>
          <div className="mx-auto text-sm md:text-base w-10/12 bg-white p-6 mt-6 rounded-lg shadow-md">
            <p className="text-2xl font-bold mb-4">Detalles de la Residencia</p>
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <p className="font-semibold w-1/4">ID:</p>
                <p className="mt-1">{residence.id}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold w-1/4">Número:</p>
                <p className="mt-1">{residence.number}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold w-1/4">Dirección:</p>
                <p className="mt-1">{residence.address}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold w-1/4">Identificador:</p>
                <p className="mt-1">{residence.identifier}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold w-1/4">Creado en:</p>
                <p className="mt-1">{residence.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DetailsResidence;
