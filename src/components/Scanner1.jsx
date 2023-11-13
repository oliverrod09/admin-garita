import React from 'react'
import {Html5QrcodePlugin} from './qr/Html5QrcodePlugin';

function Scanner1() {
    const onNewScanResult = (decodedText, decodedResult) => {
        console.log(decodedResult)
        // handle decoded results here
    };
  return (
    <>
    <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
    </>
  )
}

export default Scanner1