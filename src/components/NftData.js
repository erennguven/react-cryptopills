import React from 'react'
import {useEffect, useState} from 'react';
import {Container, Table} from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';

 
function NftData() {
    const [nftData, setNftData] = useState([]);
  
    useEffect(() => {
      fetch(
        "https://api.cryptorank.io/v1/exchanges?api_key=15f63de45183b684396b9bc72c17cb982f144f7c116d62c05ce3d44cb4cb"
      )
        .then((response) => response.json())
        .then((response) => {

          console.log("24h data", response.data);
          setNftData(response.data);
          
        })
        .catch((err) => console.error("err", err));

     
  
      const intervalId = setInterval(() => {
        fetch(
          "https://api.cryptorank.io/v1/exchanges?api_key=15f63de45183b684396b9bc72c17cb982f144f7c116d62c05ce3d44cb4cb"
        )
          .then((response) => response.json())
          .then((response) => {
            console.log("24h data", response);
            setNftData(response.data);
          })
          .catch((err) => console.error("err", err));
      }, 10000);
      return () => clearInterval(intervalId);
      
    },
    []);
        
    
  return (
    <div>
        <Container className="data">
        <div><h4 className="text-start" id="exchange-title">Exchange Data</h4></div>
        <div><h6 className="text-start">See what's going on in the crypto exchanges.</h6></div>
            <Table>
                <thead className="text-start">
                    <tr>
                    <th>Rank</th>
                    <th>Exchanges</th>
                    <th>24h Volume</th>
                    <th>7d Volume</th>
                    <th>30d Volume</th>
                    </tr>
                </thead>
                <tbody className="text-start" id="exchange-data"> 
                {nftData.slice(0,20).map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
               <th>{item.name}</th>
          
               <th><NumericFormat value={item.values.USD.volume24h} displayType={'text'} thousandSeparator={true} prefix={'$'} /></th>
               <th><NumericFormat value={item.values.USD.volume7d} displayType={'text'} thousandSeparator={true} prefix={'$'} /></th>
               <th><NumericFormat value={item.values.USD.volume30d.toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></th>
           </tr>
))}

                </tbody>
            </Table>
        </Container>

    
    </div>
    
    
  )
 };          
export default NftData;
