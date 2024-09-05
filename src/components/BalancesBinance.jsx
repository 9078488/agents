import axios from 'axios';
import { useEffect, useState } from 'react';

const filterNonZeroBalances = (balances) => {
  return balances.filter(asset => 
    parseFloat(asset.free) !== 0 || parseFloat(asset.locked) !== 0
  );
};

const BalancesBinance = () => {
  const [balances, setBalances] = useState(null);

  useEffect(() => {
    axios.get('https://f2tvcmqhluns4lp6vtdeniwyka0qjwtl.lambda-url.ap-southeast-1.on.aws/')
      .then(response => {
        const filteredBalances = filterNonZeroBalances(response.data.balances);
        setBalances(filteredBalances);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Binance Balances</h1>
      {balances ? (balances.map((balance, index) => <ul><li index={index}><div>{balance['asset']}</div><div>{balance["free"]}</div></li></ul>)) : <div>loading...</div>}
    </div>
  );
};

export default BalancesBinance;