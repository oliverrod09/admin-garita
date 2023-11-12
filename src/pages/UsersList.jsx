import { useState, useEffect, useContext } from "react";
import TableOne from "../components/TableOne";
import { back } from "../const/urls";
import Axios from "axios";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate } from "react-router-dom";

function UsersList() {
  const [data, setData] = useState([]);
  const columns = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Correo",
      accessorKey: "email",
    },
    {
      header: "Residencia",
      accessorKey: "residenceIdenti",
    },
    {
      header: "Residence dirección",
      accessorKey: "residence.address"
    }
  ];
  const { auth } = useContext(ContextMain);
  const linkDet = '/user/'
  useEffect(() => {
    getUsers();
  }, []);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

  async function getUsers() {
    const url = `${back}/users/admin`;
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
          <p className="font-extrabold">Usuarios</p>
        </div>
        <TableOne data={data} columns={columns} linkDet={linkDet}></TableOne>
      </main>
    </>
  );
}

export default UsersList;
