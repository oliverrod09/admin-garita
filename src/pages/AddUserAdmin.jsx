import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";
import { back } from "../const/urls";
import { Alert } from "@material-tailwind/react";

function AddUserAdmin() {
  const { auth } = useContext(ContextMain);
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [role, setRole] = useState([]);
  const [control, setControl] = useState({
    name: "",
    email: "",
    password: "",
    roleId: 0,
  });
  const options = [
    { value: 15, label: "15 minutos" },
    { value: 30, label: "30 minutos" },
    { value: 60, label: "1 hora" },
    { value: 120, label: "2 horas" },
    { value: 180, label: "3 horas" },
    { value: 300, label: "5 horas" },
  ];
  useEffect(() => {
    getRole();
  }, []);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
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
    setControl((prevControl) => ({
      ...prevControl,
      roleId: e.value,
    }));
  }

  function handdleChange(e) {
    setControl({ ...control, [e.target.name]: e.target.value });
  }

  async function handdleSubmit() {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const url = `${back}/control/`;
    try {
      const response = await Axios.post(url, control, config);
      if (response.status === 201) {
        setControl({
          name: "",
          email: "",
          password: "",
          roleId: 0,
        });
        setAlertOk(true);
      }
    } catch (error) {
      setServerError(error.response.data.message);
      setAlertError(true);
      console.log(error.response.data.message);
    }
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
          Agregado correctamente
        </Alert>

        <Alert
          color="red"
          open={alertError}
          onClose={() => setAlertError(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          {serverError}
        </Alert>

        <form
          action=""
          className="w-max py-4 px-8 rounded-md my-10 md:mt-10 mx-auto bg-white shadow-lg shadow-white"
        >
          <h2 className="text-3xl">Crear una usuario de control</h2>
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
                  value={control.name}
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
                  value={control.email}
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
                  value={control.password}
                />
              </div>
              <div className="flex w-full md:w-6/12 flex-col">
                <label className="" htmlFor="expiresAt">
                  Rol:
                </label>
                <Select
                  defaultValue={role[1]}
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
      </main>
    </>
  );
}

export default AddUserAdmin;
