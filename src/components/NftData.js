import React from 'react'
import {useEffect, useState} from 'react';
import {Container, Table} from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import './NftData.css';
import { BsArrowDownUp } from "react-icons/bs";

function NftData() {
    const [nftData, setNftData] = useState([]);
    const [order, setOrder] = useState(["ASC"]);
    const sorting = (col) => {
      if (order === "ASC") {
        const sorted = [...nftData].sort((a, b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setNftData(sorted);
        setOrder("DSC");
      } else {
        const sorted = [...nftData].sort((a, b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setNftData(sorted);
        setOrder("ASC");
      }
    };
  
    useEffect(() => {
      fetch(
        "https://api.cryptorank.io/v1/exchanges?api_key=15f63de45183b684396b9bc72c17cb982f144f7c116d62c05ce3d44cb4cb"
      )
        .then((response) => response.json())
        .then((response) => {
          console.log("24h data", response);
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
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
        
    
      

  return (
    <div>
        <Container className="data">
        <div><h4 className="text-start" style={{marginTop:"4%"}}>Exchange Data</h4></div>
        <div><h6 className="text-start">See what's going on in the crypto exchanges</h6></div>
            <Table>
                <thead className="text-start">
                    <tr>
                    <th>Rank</th>
                    <th onClick={() => sorting("name")}>Exchanges <BsArrowDownUp/></th>
                    <th >24h Volume <BsArrowDownUp/></th>
                    <th >7d Volume <BsArrowDownUp/></th>
                    <th >30d Volume <BsArrowDownUp/></th>
                    </tr>
                </thead>
                <tbody className="text-start"> 
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
