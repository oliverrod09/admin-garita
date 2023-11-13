import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Link } from 'react-router-dom';

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);
  const qrCodeId = "reader"
  let qrCodeScanner

  useEffect(() => {
    if(!qrCodeScanner?.getState()){
      const qrCodeScanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 300,
          height: 300,
        },
        fps: 5,
        useBarCodeDetectorIfSupported: true,
      });

      const onScanSuccess = (qrCodeMessage) => {
        setScanResult(qrCodeMessage);
        qrCodeScanner.clear();
      };

      const onScanError = (errorMessage) => {
        console.log(errorMessage);
      };

      qrCodeScanner.render(onScanSuccess, onScanError);
      setScanner(qrCodeScanner);
    }

    return () => {
      
    };
  }, []);

  return (
    <div className='w-10/12 md:w-8/12 mx-auto flex justify-center'>
      {scanResult ? (
        // <p>{scanResult}</p>
        <Link className='my-6' to={`/invitation_verif/${scanResult}`}>
          <button className='bg-black text-white rounded-md px-4 py-2'>Usar Invitación</button>
        </Link>
      ) : (
        <div id={qrCodeId}></div>
      )}
    </div>
  );
}

export default Scanner;
