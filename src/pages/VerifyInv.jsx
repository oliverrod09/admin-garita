import React from "react";
import { Button } from "@material-tailwind/react";
import Scanner from './components/Scanner'

function VerifyInv() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Hola</Button>
      <div className="w-6/12">
        <Scanner></Scanner>
      </div>
    </>
  );
}

export default VerifyInv;
