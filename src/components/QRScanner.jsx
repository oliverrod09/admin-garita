import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export function QRScanner({ onScan }) {
  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5,
      useBarCodeDetectorIfSupported: true,
    });

    const onScanSuccess = (qrCodeMessage) => {
      onScan(qrCodeMessage);
      qrCodeScanner.clear();
    };

    const onScanError = (errorMessage) => {
      console.log(errorMessage);
    };

    qrCodeScanner.render(onScanSuccess, onScanError);

    return () => {
      qrCodeScanner.clear();
    };
  }, [onScan]);

  return <div id="reader"></div>;
}


