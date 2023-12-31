import React from "react";
import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate, useParams, Link } from "react-router-dom";
import { ButtonBack } from "../components/ButtonBack";
import { back } from "../const/urls";
import Axios from "axios";
import { Alert } from "@material-tailwind/react";
import {
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

function InvitationCod() {
  const { auth } = useContext(ContextMain);
  const { cod } = useParams();
  const [invitation, setInvitation] = useState({});
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverOk, setServerOk] = useState("");

  useEffect(() => {
    getInvitation();
  }, []);

  async function getInvitation() {
    const url = `${back}/invitations/security/${cod}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    try {
      const response = await Axios.get(url, config);
      if (response.status === 200) {
        console.log(response.data);
        setInvitation(response.data);
        // setServerOk("Invitación marcada como usada")
        // setAlertOk(true)
      }
    } catch (error) {
      console.log(error.response.data.message);
      setServerError(error.response.data.message)
      setAlertError(true)
    }
  }

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
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
          <p className="font-extrabold">Verificando Invitación</p>
        </div>
        {invitation.id ? (
          <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
            <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
              <ButtonBack />
            </div>
            <div className="mx-auto w-10/12 bg-white p-6 mt-6 rounded-lg shadow-md">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-4">
                  <p className="text-2xl font-bold mb-4">
                    Detalles de la Invitación
                  </p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <p className="font-semibold w-1/4">ID:</p>
                      <p className="mt-6 lg:mt-0">{invitation.id}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Nombre:</p>
                      <p className="mt-6 lg:mt-0">{invitation.name}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Estado:</p>
                      <p className="mt-6 lg:mt-0">{invitation.used ? (<>Usada</>):(<>No usada</>)}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Cédula:</p>
                      <p className="mt-6 lg:mt-0">{invitation.cedula}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Teléfono:</p>
                      <p className="mt-6 lg:mt-0">{invitation.cellphone}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Matricula:</p>
                      <p className="mt-6 lg:mt-0">{invitation.board}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold w-1/4">Descripción:</p>
                      <p className="mt-6 lg:mt-0">{invitation.description}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-1/4">Creado en:</p>
                      <p className="mt-6 lg:mt-0">{invitation.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                  <div className="my-4">
                    <p className="text-2xl font-bold mb-4">
                      Detalles de la Residencia
                      <Link
                        to={`/residence/${invitation.residence?.id}`}
                        className="inline-block"
                      >
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                      </Link>
                    </p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex">
                        <p className="font-semibold w-1/4">Número:</p>
                        <p className="mt-1">{invitation.residence?.number}</p>
                      </div>
                      <div className="flex">
                        <p className="font-semibold w-1/4">Ident.:</p>
                        <p className="mt-1">
                          {invitation.residence?.identifier}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="text-2xl font-bold mb-4">
                      Detalles del Usuario
                      <Link
                        to={`/user/${invitation.user?.id}`}
                        className="inline-block"
                      >
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                      </Link>
                    </p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex">
                        <p className="font-semibold w-1/4">Nombre:</p>
                        <p className="mt-1">{invitation.user?.name}</p>
                      </div>
                      <div className="flex">
                        <p className="font-semibold w-1/4">Correo:</p>
                        <p className="mt-1">{invitation.user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
            <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
              <ButtonBack />
            </div>
            <div className="bg-white p-10 mt-24 md:mt-0 rounded-xl flex justify-center items-center flex-col">
              <p className="text-3xl font-bold">Invitación no encontrada</p>
              <NoSymbolIcon className="w-24 h-24" />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default InvitationCod;
