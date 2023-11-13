import { useState, useEffect, useContext } from "react";
import TableOne from "../components/TableOne";
import { back } from "../const/urls";
import Axios from "axios";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate, Link } from "react-router-dom";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";

function ResidenceList() {
  const [data, setData] = useState([]);
  const linkDet = "/residence/";
  const columns = [
    {
      header: "Numero",
      accessorKey: "number",
    },
    {
      header: "Dirección",
      accessorKey: "address",
    },
    {
      header: "Identificador",
      accessorKey: "identifier",
    },
    {
      header: "Creado",
      accessorKey: "createdAt",
    },
  ];
  const { auth } = useContext(ContextMain);

  useEffect(() => {
    getUsers();
  }, []);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

  async function getUsers() {
    const url = `${back}/residence/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    try {
      const response = await Axios.get(url, config);
      if (response.status == 200) {
        setData(response.data);
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
          <p className="font-extrabold">Residencias</p>
        </div>
        <TableOne data={data} columns={columns} linkDet={linkDet}></TableOne>
        <div className="fixed bottom-8 right-8">
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton size="lg" className="rounded-full">
                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>

              <Link to={`/add_residence/`} className="">
                <SpeedDialAction className="h-16 w-16">
                  <PlusCircleIcon className="h-5 w-5" />
                  <Typography color="blue-gray" className="text-xs font-normal">
                    Agregar
                  </Typography>
                </SpeedDialAction>
              </Link>

            </SpeedDialContent>
          </SpeedDial>
        </div>
      </main>
    </>
  );
}

export default ResidenceList;
