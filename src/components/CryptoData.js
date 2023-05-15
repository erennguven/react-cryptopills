import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import React, {useEffect, useState} from 'react';



 function CryptoData() {
    const [coins, setCoins] = useState([{
        name:" ", symbol:"", rank:"", is_new:"", is_active:"", type:""
    }]);
    
    useEffect(() => {
     
       fetch("https://api.coinpaprika.com/v1/coins")
        .then(response => response.json())
        .then(response => {
          
            setCoins(response);
        })
      
      
    }, []);
  
  return (
    <div>
        <Container className="data">
        <div><h4 className="text-start" id="crypto-data">Crypto Data</h4></div>
        <div><h6 className="text-start">Get the fundamental knowledge of cryptos.</h6></div>
        <Table style={{marginTop:"2%"}}>
            <thead>
                <tr>
                    <th className="text-start">#</th>
                    <th className="text-start">Name</th>
                    <th>Symbol</th>
                    <th>Type</th>
                    <th>Activity Status</th>
                    <th>New or Old</th>

                </tr>
            </thead>
            <tbody>
  {coins.slice(0, 10).map((coin) => (
    <tr key={coin.id}>
      <th className="text-start">{coin.rank}</th>
      <th className="text-start">{coin.name}</th>
      <th>{coin.symbol}</th>
      <th>{coin.type ? 'Coin' : 'Token'}</th>
      <th>{coin.is_active ? 'Active' : 'Inactive'}</th>
      <th>{coin.is_new ? 'New' : 'Old'}</th>
    </tr>
  ))}
</tbody>
            
        </Table>
        </Container>
    </div>
  )
}
export default CryptoData;