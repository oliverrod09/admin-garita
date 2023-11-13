import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../../components/DrawerDash";
import { ButtonBack } from "../../components/ButtonBack";
import { ContextMain } from "../../context/ContextMain";
import { useParams, Navigate, Link } from "react-router-dom";
import Axios from "axios";
import { back } from "../../const/urls";
import { Alert } from "@material-tailwind/react";

function UserEdit() {
  const { id } = useParams();
  const { auth } = useContext(ContextMain);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cedula: "",
    residenceIdenti: "",
  });
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverOk, setServerOk] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

  function handdleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handdleSubmit() {
    const url = `${back}/users/admin/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    try {
      const response = await Axios.put(url, user, config);
      if (response.status === 200) {
        setServerOk("Actualizado correctamente")
        setAlertOk(true);
        setUser({
          name: response.data.name,
          email: response.data.email,
          password: "",
          cedula: response.data.cedula,
          residenceIdenti: response.data.residenceIdenti,
        });
      }
    } catch (error) {
      setAlertError(true);
      setServerError(error.response.data.message);
      console.log(error.response.data.message); // Aquí deberías poder acceder al mensaje de error
    }
  }

  async function getUser() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + sessionStorage.getItem("token"),
      },
    };
    const url = `${back}/users/admin/${id}`;
    try {
      const response = await Axios.get(url, config);
      if (response.status == 200) {
        setUser({
          name: response.data.name,
          email: response.data.email,
          password: "",
          cedula: response.data.cedula,
          residenceIdenti: response.data.residenceIdenti,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      serverError(error.response.data.message);
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
        <div className="flex gap-4 items-center px-4 py-6 bg-white relative">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Editar Usuario {id}</p>
        </div>
        <div className="absolute z-20 left-1 top-40 md:left-6 md:bottom-10 ">
          <ButtonBack></ButtonBack>
        </div>
        <form
          action=""
          className="w-11/12 md:w-max py-4 px-8 rounded-md my-8 mx-auto bg-white shadow-lg shadow-white"
        >
          <h2 className="text-3xl">Editar Usuario</h2>
          <div className="">
            <div className="flex flex-col md:flex-row gap-4 my-4">
              <div className="flex flex-col">
                <label className="" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={user.name}
                />
              </div>
              <div className="flex flex-col">
                <label className="" htmlFor="cedula">
                  Cedula
                </label>
                <input
                  type="text"
                  name="cedula"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={user.cedula}
                />
              </div>
              <div className="flex flex-col">
                <label className="" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={user.email}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center gap-4 my-4">
              <div className="flex w-full md:w-6/12 flex-col">
                <label className="" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="text"
                  name="password"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={user.password}
                />
              </div>
              <div className="flex w-full md:w-6/12 flex-col">
                <label className="" htmlFor="residenceIdent">
                  Identificador de residencia
                </label>
                <input
                  type="text"
                  name="residenceIdenti"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={user.residenceIdenti}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-lg my-6 bg-black py-4 px-8 text-white"
            onClick={handdleSubmit}
          >
            Actualizar
          </button>
        </form>
      </main>
    </>
  );
}

export default UserEdit;
