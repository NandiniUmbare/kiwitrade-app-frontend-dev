import './App.css';
// import BrowseByCategory from '@components/BrowseByCategory'
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import BrowseByCategory from '@components/BrowseByCategory';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostAd from './pages/PostAd';
import { Provider } from 'react-redux';
import store from './redux/store';
import RealEstate from './components/BrowseByCategory/RealEstate';
import AutosAndBoats from './components/BrowseByCategory/AutosAndBoats';
import BuyAndSell from './components/BrowseByCategory/BuyAndSell';
import Jobs from './components/BrowseByCategory/Jobs';
import ServicesAndSpecials from './components/BrowseByCategory/ServicesAndSpecials';
import CommunityAndEvents from './components/BrowseByCategory/CommunityAndEvents';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<BrowseByCategory />} />
            <Route path="/post-add" element={<PostAd />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/autos-boats" element={<AutosAndBoats />} />
            <Route path="/buy-sell" element={<BuyAndSell />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/services-specials" element={<ServicesAndSpecials />} />
            <Route path="/community-events" element={<CommunityAndEvents />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;