import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {useEffect, useState} from 'react';
import { NumericFormat } from 'react-number-format';

 function NavbarComponent() {
  const [currentPrice, setCurrentPrice] = useState({ethereum: 0, bitcoin:0});



  // her APInin data refresh süresi farklı olacağından dolayı apilere bakıp genel bir refresh süresi yazmak lazım.
  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cbitcoin&vs_currencies=usd')
      .then((response) => response.json())
      .then((response) => {
        const ethereum = response.ethereum.usd;
        const bitcoin = response.bitcoin.usd;
        setCurrentPrice({ethereum, bitcoin});
      });
    };

      fetchData();
      const intervalId = setInterval(fetchData, 500);
       return () => clearInterval(intervalId);
 }, []);


    return (
      <div>
         <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home"><th>Cryptopills</th></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><th>Exchanges</th></Nav.Link>
            <Nav.Link><th>Crypto</th></Nav.Link>
            </Nav>
            <Nav className="me-auto"><Nav.Item><strong>All Cumulated & Ready For Use</strong></Nav.Item></Nav>
           
              <Nav>

            <Nav.Item>
            <strong><text className="btc" alt="Bitcoin's price">Bitcoin</text></strong>
              <th><NumericFormat value={currentPrice.bitcoin} displayType={'text'} thousandSeparator={true} prefix={'$'} /></th>

              </Nav.Item>
            <Nav.Item>
            <strong><text alt="Ethereum's price">Ethereum</text></strong>
            <th><NumericFormat value={currentPrice.ethereum} displayType={'text'} thousandSeparator={true} prefix={'$'} /></th>
              </Nav.Item>
              </Nav>
       
        </Container>
      </Navbar>
    
  
  
      </div>
    )
  }
export default NavbarComponent;
