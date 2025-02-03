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

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<BrowseByCategory />} />
          <Route path="/post-add" element={<PostAd />} />
          <Route path='/real-estate' element={<RealEstate/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;