import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate, useParams, Link } from "react-router-dom";
import Axios from "axios";
import { back } from "../const/urls";
import { ButtonBack } from "../components/ButtonBack";
import {
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  PencilIcon,
  CogIcon,
  Square3Stack3DIcon,
  TrashIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
  Alert,
} from "@material-tailwind/react";

function DetailsResidence() {
  const { auth } = useContext(ContextMain);
  const { id } = useParams();
  const [residence, setResidence] = useState({});
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverOk, setServerOk] = useState("");

  useEffect(() => {
    getResidence();
  }, []);

  async function deleteResidence() {
    const url = `${back}/residence/${residence.id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    try {
      const response = await Axios.delete(url, config);
      if (response.status == 200) {
        console.log("Eliminado correctamente");
        setServerOk("Eliminado correctamente");
        setAlertOk(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setServerError(error.response.data.message);
      setAlertError(true);
    }
  }

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

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
        <Alert
          color="green"
          open={alertOk}
          onClose={() => setAlertOk(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          {serverOk}
        </Alert>

        <Alert
          color="red"
          open={alertError}
          onClose={() => setAlertError(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          {serverError}
        </Alert>
        <div className="flex gap-4 items-center px-4 py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Residencia</p>
        </div>
        {residence.id ? (
          <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
            <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
              <ButtonBack></ButtonBack>
            </div>
            <div className="mx-auto text-sm md:text-base w-10/12 bg-white p-6 mt-6 rounded-lg shadow-md">
              <p className="text-2xl font-bold mb-4">
                Detalles de la Residencia
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex gap-2">
                  <p className="font-semibold w-1/4">ID:</p>
                  <p className="mt-6 lg:mt-0">{residence.id}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold w-1/4">Número:</p>
                  <p className="mt-6 lg:mt-0">{residence.number}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold w-1/4">Dirección:</p>
                  <p className="mt-6 lg:mt-0">{residence.address}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold w-1/4">Identificador:</p>
                  <p className="mt-6 lg:mt-0">{residence.identifier}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold w-1/4">Creado en:</p>
                  <p className="mt-6 lg:mt-0">{residence.createdAt}</p>
                </div>
              </div>
            </div>
            {/* SpeedDial */}
            <div className="fixed bottom-8 right-8">
              <SpeedDial>
                <SpeedDialHandler>
                  <IconButton size="lg" className="rounded-full">
                    <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                  </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                  <SpeedDialAction
                    className="h-16 w-16"
                    onClick={deleteResidence}
                  >
                    <TrashIcon className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Eliminar
                    </Typography>
                  </SpeedDialAction>

                  <Link to={`/edit_residence/${id}`} className="">
                    <SpeedDialAction className="h-16 w-16">
                      <PencilIcon className="h-5 w-5" />
                      <Typography
                        color="blue-gray"
                        className="text-xs font-normal"
                      >
                        Editar
                      </Typography>
                    </SpeedDialAction>
                  </Link>
                </SpeedDialContent>
              </SpeedDial>
            </div>
          </div>
        ) : (
          <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
            <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
              <ButtonBack></ButtonBack>
            </div>
            <div className="bg-white p-10 mt-24 md:mt-0 rounded-xl flex justify-center items-center flex-col">
              <p className="text-3xl font-bold">Residencia no encontrada</p>
              <NoSymbolIcon className="w-24 h-24"></NoSymbolIcon>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default DetailsResidence;
