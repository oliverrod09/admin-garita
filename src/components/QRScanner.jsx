import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export function QRScanner({ onScan }) {
  const [scannerInitialized, setScannerInitialized] = useState(false);

  useEffect(() => {
    // Si el escáner ya está inicializado, no hagas nada
    if (scannerInitialized) {
      return;
    }

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

    // Establece el estado para indicar que el escáner está inicializado
    setScannerInitialized(true);

    return () => {
      qrCodeScanner.clear();
    };
  }, [onScan, scannerInitialized]);

  return <div id="reader"></div>;
}
