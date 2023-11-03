import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    if (!scanner) {
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
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  return (
    <div className='w-10/12 mx-auto'>
      <h1>Scanner</h1>
      {scanResult ? (
        <p>{scanResult}</p>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;
