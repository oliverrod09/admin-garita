import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../../components/DrawerDash";
import { ButtonBack } from "../../components/ButtonBack";
import { ContextMain } from "../../context/ContextMain";
import { useParams, Navigate, Link } from "react-router-dom";
import Axios from "axios";
import { back } from "../../const/urls";
import { Alert, Card, Typography, Button } from "@material-tailwind/react";

function ResidenceEdit() {
  const { id } = useParams();
  const { auth } = useContext(ContextMain);
  const [residence, setResidence] = useState({
    number: "",
    identifier: "",
    address: "",
  });
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverOk, setServerOk] = useState("");

  useEffect(() => {
    getResidence();
  }, []);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

  function handdleChange(e) {
    setResidence({ ...residence, [e.target.name]: e.target.value });
  }

  async function handdleSubmit() {
    const url = `${back}/residence/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    try {
      const response = await Axios.put(url, residence, config);
      if (response.status === 200) {
        setServerOk("Actualizado correctamente");
        setAlertOk(true);
        setResidence({
          number: response.data.number,
          identifier: response.data.identifier,
          address: response.data.address,
        });
      }
    } catch (error) {
      setAlertError(true);
      setServerError(error.response.data.message);
      console.log(error.response.data.message); // Aquí deberías poder acceder al mensaje de error
    }
  }

  async function getResidence() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + sessionStorage.getItem("token"),
      },
    };
    const url = `${back}/residence/${id}`;
    try {
      const response = await Axios.get(url, config);
      if (response.status == 200) {
        setResidence({
          number: response.data.number,
          identifier: response.data.identifier,
          address: response.data.address,
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
          <p className="font-extrabold">Editar residencia {id}</p>
        </div>

        <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center my-10">
          <div className="absolute z-20 left-1 top-8 md:left-6 md:bottom-10 ">
            <ButtonBack></ButtonBack>
          </div>
          <Card
            color="transparent"
            shadow={false}
            className="w-11/12 md:w-max bg-white shadow-lg shadow-blue-gray-50 p-8"
          >
            <Typography variant="h4" color="blue-gray">
              Datos de la residencia
            </Typography>
            <form className="mt-8 mb-2 w-full md:w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <input
                  onChange={handdleChange}
                  className="border-2 border-gray-500 rounded-md p-2"
                  type="text"
                  name="number"
                  placeholder="number"
                  value={residence.number}
                />
                <input
                  onChange={handdleChange}
                  className="border-2 border-gray-500 rounded-md p-2"
                  type="text"
                  name="identifier"
                  placeholder="identifier"
                  value={residence.identifier}
                />
                <input
                  onChange={handdleChange}
                  className="border-2 border-gray-500 rounded-md p-2"
                  type="text"
                  name="address"
                  placeholder="address"
                  value={residence.address}
                />
              </div>
              <Button className="my-6" fullWidth onClick={handdleSubmit}>
                Crear
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}

export default ResidenceEdit;
