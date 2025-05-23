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
import PostListing from './components/BrowseByCategory/PostListing';
import Register from './pages/User/Register';
import SignIn from './pages/User/SignIn';
import ForgetPassword from './pages/User/ForgetPassword';
import MyAccount from './pages/User/MyAccount';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header><BrowseByCategory /></Header>} />
            <Route path="/post-add" element={<Header><PostAd /></Header>} />
            <Route path="/real-estate" element={<Header><RealEstate /></Header>} />
            <Route path="/autos-boats" element={<Header><AutosAndBoats /></Header>} />
            <Route path="/buy-sell" element={<Header><BuyAndSell /></Header>} />
            <Route path="/jobs" element={<Header><Jobs /></Header>} />
            <Route path="/services-specials" element={<Header><ServicesAndSpecials /></Header>} />
            <Route path="/community-events" element={<Header><CommunityAndEvents /></Header>} />
            <Route path='/:category/:type' element={<Header><PostListing /></Header>} />
            <Route path='/user/register' element={<Register />} />
            <Route path='/user/login/:page' element={<SignIn onClose={() => {}} />} />
            <Route path='/user/forgetpassword' element={<ForgetPassword/>}/>
            <Route path='/user/account' element={<Header><MyAccount/></Header>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;