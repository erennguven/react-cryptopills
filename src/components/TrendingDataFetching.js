import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import btcImage from '../assets/images/btc.png';
import ethImage from '../assets/images/eth-diamond-black.png';
import altImage from '../assets/images/alts.png';
import usdtImage from '../assets/images/usdt.png';
import './TrendingDataFetching.css';
import { GoGraph } from "react-icons/go";
import { FiTrendingUp } from "react-icons/fi";
import { TfiCrown } from 'react-icons/tfi';



function TrendingDataFetching() {
  const [favourite, setFavourite] = useState([]);
 
   useEffect(() => {
    const fetchData = () => {
      fetch("https://api.coingecko.com/api/v3/search/trending/")
        .then(response => response.json())
        .then((response) => {
          const firstTrending = response.coins[0].item;
          const secondTrending = response.coins[1].item;
          const thirdTrending = response.coins[2].item;
          const fourthTrending = response.coins[3].item;
          
          console.log("trends", firstTrending, secondTrending, thirdTrending, fourthTrending);
          setFavourite([firstTrending, secondTrending, thirdTrending, fourthTrending]);
         
        });
      };
      fetchData();
     const intervalId = setInterval(fetchData, 100000);
     return () => clearInterval(intervalId);
   }, []);
   
   
    const [coinbaseBtcVolume, setCoinbaseBtcVolume] = useState([]);
    const [binanceBtcVolume, setBinanceBtcVolume] = useState([]);
    const [okxBtcVolume, setOkxBtcVolume] = useState([]);
    const [coinbaseImage, setCoinbaseImage] = useState([]);
    const [binanceImage, setBinanceImage] = useState([]);
    const [okxImage, setOkxImage] = useState([]);
    const [bybit, setBybit] = useState([]);
    
    useEffect(() => {
      const fetchData = () => {
      Promise.all([
        fetch("https://api.coingecko.com/api/v3/exchanges/okex").then(responseOkx => responseOkx.json()),
        fetch("https://api.coingecko.com/api/v3/exchanges/gdax").then(responseCoin => responseCoin.json()),
        fetch("https://api.coingecko.com/api/v3/exchanges/binance").then(responseBinance => responseBinance.json()),
        fetch("https://api.coingecko.com/api/v3/exchanges/bybit_spot").then(responseBybit => responseBybit.json()),
      ]).then(([responseOkx, responseCoin, responseBinance, responseBybit]) => {
        const okxBtcVolume = responseOkx.trade_volume_24h_btc_normalized.toLocaleString(undefined, {maximumFractionDigits:1});
        const okxImage = responseOkx.image;

        const coinbaseBtcVolume = responseCoin.trade_volume_24h_btc_normalized.toLocaleString(undefined, {maximumFractionDigits:1});
        const coinbaseImage = responseCoin.image;

        const binanceBtcVolume = responseBinance.trade_volume_24h_btc_normalized.toLocaleString(undefined, {maximumFractionDigits:1});
        const binanceImage = responseBinance.image;


        setBybit(responseBybit);
        setOkxBtcVolume(okxBtcVolume);
        setCoinbaseBtcVolume(coinbaseBtcVolume);
        setBinanceBtcVolume(binanceBtcVolume);
        setBinanceImage(binanceImage);
        setCoinbaseImage(coinbaseImage);
        setOkxImage(okxImage);

      });
    };
      fetchData();
      const intervalId = setInterval(fetchData, 100000);
      return () => clearInterval(intervalId);
    }, []);
    const [dominance, setDominance] = useState([]);
    const [btcCash, setbtcCash] = useState([]);
    const [btcCashSv, setbtcCashSv] = useState([]);
     useEffect(() => {
      const fetchData = () => {
      fetch("https://api.domination.finance/api/v0/price") // api'den data çağırılır.
      .then((response) => response.json()) // veriyi json'a döndürürüz.
      .then((response) => {
        const btcCash = response.data['bitcoin-cash'];
        const btcCashSv = response.data['bitcoin-cash-sv'];
        setbtcCash(btcCash);
        setbtcCashSv(btcCashSv);
        setDominance(response.data);
     }); 
    };
    fetchData();
      const intervalId = setInterval(fetchData, 100000);
      return () => clearInterval(intervalId);
     
  }, []);
  return (
    <div>
    <Container>
    <Row responsive>
      <Col xs={6} md={4}>
      <div className="trending-dominance">
   <h5 className="text-start">Crypto Dominance <TfiCrown/> </h5>
    
        <Row>
          <tr>
            <th>1</th>
            <th><img style={{marginRight:"5px"}}  src={btcImage}></img></th>
            <th>Bitcoin</th>
            <th>{dominance?.bitcoin}</th>
          </tr>
          <tr>
            <th>2</th>
            <th><img src={ethImage}></img></th>
            <th>Ethereum</th>
            <th>{dominance?.ethereum}</th>
          </tr>
          <tr>
            <th>3</th>
            <th><img   src={altImage}></img></th>
            <th>Altcoin</th>
            <th>{(
          parseFloat(dominance?.ripple) + parseFloat(dominance?.litecoin) + 
          parseFloat(dominance?.others)+ parseFloat(dominance?.chainlink)+ 
          parseFloat(dominance?.polkadot)+ parseFloat(dominance?.binancecoin)+ parseFloat(btcCash) + parseFloat(btcCashSv)).toFixed(2)}</th>
          </tr>
          <tr>
            <th>4</th>
            <th><img   src={usdtImage}></img></th>
            <th>USDT</th>
            <th>{dominance?.tether}</th>
          </tr>
        </Row>
        </div>
    
        </Col>     
        <Col xs={6} md={4} >  
        <div className="trending-dominance">
        <h5 className="text-start">Trending <FiTrendingUp /></h5>
        {favourite.map((item, index) => (
            <tr  key={item.id}>
              <th>{index + 1 }</th>
            <th><img  src={item.thumb}/></th>
            <th  >{item.name}</th>
            <th  >{item.symbol}</th>
            </tr>
        ))}</div>
          
              </Col> 
            <Col xs={6} md={4}>
         <div className="trending-dominance">
          <h5 className="text-start">Exchange Volumes ฿ <GoGraph/></h5>
                <Row>
                <tr>
                  <th className="exchange-data">1</th>
                  <th><img style={{width:"25px",height:"25px"}} src={binanceImage}/></th>
                  <th>Binance</th>
                  <th>{binanceBtcVolume}฿</th>
                </tr>
                <tr>
                  <th>2</th>
                  <th><img style={{width:"25px",height:"25px"}} src={coinbaseImage}/></th>
                  <th>Coinbase</th>
                  <th>{coinbaseBtcVolume}฿</th>
                </tr>
                <tr>
                  <th>3</th>
                  <th><img style={{width:"25px",height:"25px"}} src={okxImage}/></th>
                  <th>OKX</th>
                  <th>{okxBtcVolume}฿</th>
                </tr>
                <tr>
                  <th>4</th>
                  <th><img style={{width:"25px",height:"25px"}} src={bybit?.image}/></th>
                  <th>Bybit</th>
                  <th>{bybit.trade_volume_24h_btc_normalized?.toLocaleString(undefined, {maximumFractionDigits:1})}฿</th>
                </tr>
                </Row>
                </div>
         
                </Col>
        </Row>
        </Container>
        </div>
  );

}
export default TrendingDataFetching;