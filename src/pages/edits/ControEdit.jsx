import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../../components/DrawerDash";
import { ButtonBack } from "../../components/ButtonBack";
import { ContextMain } from "../../context/ContextMain";
import Select from "react-select";
import { useParams, Navigate, Link } from "react-router-dom";
import Axios from "axios";
import { back } from "../../const/urls";
import { Alert } from "@material-tailwind/react";

function ControlEdit() {
  const { id } = useParams();
  const { auth } = useContext(ContextMain);
  const [role, setRole] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cedula: "",
    roleId: 0,
  });
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverOk, setServerOk] = useState("");

  useEffect(() => {
    getUser();
    getRole()
  }, []);

  

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

  function handdleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handdleSubmit() {
    const url = `${back}/control/admin/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    try {
      const response = await Axios.put(url, user, config);
      if (response.status === 200) {
        setServerOk("Actualizado correctamente");
        setAlertOk(true);
        setUser({
          name: response.data.name,
          email: response.data.email,
          password: "",
          roleId: response.data.roleId,
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
    const url = `${back}/control/${id}`;
    try {
      const response = await Axios.get(url, config);
      if (response.status == 200) {
        setUser({
          name: response.data.name,
          email: response.data.email,
          password: "",
          roleId: response.data.roleId,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      setServerError(error.response.data.message);
    }
  }

  async function getRole() {
    try {
      const url = `${back}/role/`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const response = await Axios.get(url, config);
      if (response.status == 200) {
        const formattedRoles = response.data.map((role) => ({
          value: role.id,
          label: role.name,
        }));
        setRole(formattedRoles);
      }
    } catch (error) {
      setAlertError(error.response.data.message);
      setAlertError(true);
    }
  }
  function handdleSelect(e) {
    setUser((prevControl) => ({
      ...prevControl,
      roleId: e.value,
    }));
  }

  return (
    <>
      <main className="min-h-screen bg-blue-700/90 pb-1">
        <div className="flex gap-4 items-center py-6 bg-white px-4">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Crear User Control</p>
        </div>
        <Alert
          color="green"
          open={alertOk}
          onClose={() => setAlertOk(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          Editado correctamente
        </Alert>

        <Alert
          color="red"
          open={alertError}
          onClose={() => setAlertError(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          {serverError}
        </Alert>

        <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center my-10">
          <div className="absolute z-20 left-1 top-8 md:left-6 md:bottom-10 ">
            <ButtonBack></ButtonBack>
          </div>
          <form
            action=""
            className="w-max py-4 px-8 rounded-md mx-auto bg-white shadow-lg shadow-white"
          >
            <h2 className="text-3xl">Editar usuario de control</h2>
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
                  <label className="" htmlFor="email">
                    email
                  </label>
                  <input
                    type="text"
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
                    password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="p-4 rounded-lg border-gray-300 border-2"
                    onChange={handdleChange}
                    value={user.password}
                  />
                </div>
                <div className="flex w-full md:w-6/12 flex-col">
                  <label className="" htmlFor="expiresAt">
                    Rol:
                  </label>
                  <Select
                  defaultValue={user.roleId}
                    options={role}
                    onChange={handdleSelect}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary25: "darkgray",
                        primary: "black",
                      },
                    })}
                    className="p-2 rounded-lg border-gray-300 border-2 focus:border-black"
                  ></Select>
                  {/* <label className="" htmlFor="expiresAt">Fecha</label>
                <input type="date" name="expiresAt" className="p-4 rounded-lg border-gray-300 border-2" /> */}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-black py-4 px-8 text-white"
              onClick={handdleSubmit}
            >
              Crear
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default ControlEdit;
