import React, {useEffect, useState}from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function GeneralDataFetching() {
  const [marketCap, setMarketCap] = useState([]);
  const [volume, setVolume] = useState([]);
  const [volumeChange, setVolumeChange] = useState([]);
  const [marketCapChange, setMarketCapChange] = useState([]);
  const [activeCrypto, setActiveCrypto] = useState([]);
  const [activeMarket, setActiveMarket] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.coinpaprika.com/v1/global')
        .then((response) => response.json())
        .then((response) => {
          const marketCap = response.market_cap_usd.toFixed(0);
          const marketCapChange = response.market_cap_change_24h;
          const volume = response.volume_24h_usd;
          const volumeChange = response.volume_24h_change_24h;
          setVolumeChange(volumeChange);
          setMarketCapChange(marketCapChange);
          setMarketCap(
            Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumSignificantDigits: 13,
            }).format(marketCap)
          );
          setVolume(
            Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumSignificantDigits: 12,
            }).format(volume)
          );
        });
      fetch('https://api.coingecko.com/api/v3/global')
        .then((response) => response.json())
        .then((response) => {
          const activeCrypto = response.data.active_cryptocurrencies;
          const activeMarket = response.data.markets;
          setActiveCrypto(activeCrypto);
          setActiveMarket(activeMarket);
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="generaldata">
      <Container>
        <Row>
          <Col sm={4}>
            <th>
              Market Cap: {marketCap} {marketCapChange}
            </th>
          </Col>
          <Col sm={2}>
            <th>Exchanges: {activeMarket}</th>
          </Col>
          <Col sm={2}>
            <th>Cryptos: {activeCrypto}</th>
          </Col>
          <Col sm={4}>
            <th>
              24h Volume: {volume} {volumeChange}
            </th>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GeneralDataFetching;
