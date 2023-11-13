import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate, useParams, Link } from "react-router-dom";
import { ButtonBack } from "../components/ButtonBack";
import { back } from "../const/urls";
import Axios from "axios";
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

function DetailsUser() {
  const { auth } = useContext(ContextMain);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverOk, setServerOk] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const url = `${back}/users/admin/${id}`;
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
        setUser(response.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  async function deleteUser() {
    try {
      const url = `${back}/users/admin/${user.id}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const response = await Axios.delete(url, config);
      if (response.status == 200) {
        console.log("usuario eliminado");
        setServerOk("usuario eliminado");
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
  return (
    <>
      <main className="min-h-screen bg-blue-700/90 pb-1 ">
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
          <p className="font-extrabold">Usuario</p>
        </div>
        {user.id ? (
          <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
            {/* Button back */}
            <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
              <ButtonBack></ButtonBack>
            </div>
            {/* Show user */}
            <div className="mx-auto w-10/12 bg-white p-6 mt-6 rounded-lg shadow-md">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2">
                  <p className="text-2xl font-bold mb-4">
                    Detalles del Usuario
                  </p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <p className="font-semibold w-1/4">ID:</p>
                      <p className="mt-1">{user.id}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Nombre:</p>
                      <p className="mt-1">{user.name}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Email:</p>
                      <p className="mt-1">{user.email}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Cédula:</p>
                      <p className="mt-1">{user.cedula}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Identi. R:</p>
                      <p className="mt-1">{user.residenceIdenti}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Creado en:</p>
                      <p className="mt-1">{user.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                  <p className="text-2xl font-bold mb-4">
                    Detalles de la Residencia
                    <Link
                      to={`/residence/${user.residence?.id}`}
                      className="inline-block"
                    >
                      <ArrowTopRightOnSquareIcon className="w-5 h-5"></ArrowTopRightOnSquareIcon>
                    </Link>
                  </p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <p className="font-semibold w-1/4">ID:</p>
                      <p className="mt-1">{user.residence?.id}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Número:</p>
                      <p className="mt-1">{user.residence?.number}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Dirección:</p>
                      <p className="mt-1">{user.residence?.address}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Creado en:</p>
                      <p className="mt-1">{user.residence?.createdAt}</p>
                    </div>
                  </div>
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
                  <SpeedDialAction className="h-16 w-16" onClick={deleteUser}>
                    <TrashIcon className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Eliminar
                    </Typography>
                  </SpeedDialAction>

                  <Link to={`/edit_user/${id}`} className="">
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
              <p className="text-3xl font-bold">Usuario no encontrado</p>
              <NoSymbolIcon className="w-24 h-24"></NoSymbolIcon>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default DetailsUser;
