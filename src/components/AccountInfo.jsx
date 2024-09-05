
// const apiKey = import.meta.env.VITE_BINANCE_API_KEY;
// const apiSecret = import.meta.env.VITE_BINANCE_SECRET_KEY;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';

// const BinanceAccountInfo = () => {
//     const [accountInfo, setAccountInfo] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const apiKey = import.meta.env.VITE_BINANCE_API_KEY;
//         const secretKey = import.meta.env.VITE_BINANCE_SECRET_KEY;
//         const timestamp = Date.now();
        
//         const query = `timestamp=${timestamp}`;
//         const signature = CryptoJS.HmacSHA256(query, secretKey).toString(CryptoJS.enc.Hex);

//         axios.get(`https://api.binance.com/api/v3/account?${query}&signature=${signature}`, {
//             headers: {
//                 'X-MBX-APIKEY': apiKey,
//             }
//         })
//         .then(response => {
//             setAccountInfo(response.data);
//             setLoading(false);
//         })
//         .catch(error => {
//             setError(error);
//             setLoading(false);
//         });
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <div>
//             <h2>Binance Account Information</h2>
//             <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
//         </div>
//     );
// };

// export default BinanceAccountInfo;
function BinanceAccountInfo() {
    return <div>AccountInfo</div>
}


export default BinanceAccountInfo