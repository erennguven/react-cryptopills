import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from './components/NavbarComponent';
import GeneralDataFetching from './components/GeneralDataFetching';
import TrendingDataFetching from './components/TrendingDataFetching';
import CryptoData from './components/CryptoData';
import NftData from './components/NftData';

function App() {



  return (
    <div className="App">
           <GeneralDataFetching/>
     <NavbarComponent/>
     <TrendingDataFetching/>
     <NftData/>
    <CryptoData/>
       </div>
  
  );
}
export default App;
