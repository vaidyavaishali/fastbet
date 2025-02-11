import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './Pages/SignUp/Signup';
import Login from './Pages/Login/Login';
import ReadMore from './Pages/MoreArticles/ReadMoreArticle';
import MoreArticles from './Pages/MoreArticles/MoreArticles';
import HomePage from './Pages/Homepage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Wallet from './Pages/Dashboard/Wallet';
import Profile from './Pages/Dashboard/Profile/Profile';
import ChangePasswordForm from './Pages/Dashboard/Profile/ChangePasswordForm';
import Addpoints from './Pages/Dashboard/AddPoints/Addpoints';
import Play from './Pages/Dashboard/Play';
import PaymentDetails from './Pages/Dashboard/BankDetails/BankDetails';
import Reedeempoints from './Pages/Dashboard/ReedeemPoints/ReedeemPoints';
import BidHistory from './Pages/Dashboard/BidHistory/BidHistory';
import WinHistory from './Pages/Dashboard/WinHistory/WinHistory';
import GameRate from './Pages/Dashboard/GameRate/GameRate';
import DeleteAccount from './Pages/Dashboard/DeleteAccount';
import { ProfileProvider } from './context/ProfileContext';
import HowToPlay from './Pages/Dashboard/HowToPlay/HowToPlay';
import BidPage from './Pages/Dashboard/bidPage';
import Cricket from './Pages/Dashboard/Cricket/Cricket';


function App() {
  
  return (
    <ProfileProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signUp" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/read-more' element={<ReadMore />} />
          <Route path='/more-articles' element={<MoreArticles />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/wallet' element={<Wallet />} />
          <Route path='/dashboard/my-profile' element={<Profile />} />
          <Route path='/change-password' element={<ChangePasswordForm />} />
          <Route path='/dashboard/add-points' element={<Addpoints />} />
          <Route path='/dashboard/play/:gameName' element={<Play />} />
          <Route path='/dashboard/payment-details' element={<PaymentDetails />} />
          <Route path='/dashboard/reedeem-points' element={<Reedeempoints />} />
          <Route path='/dashboard/bidhistory' element={<BidHistory />} />
          <Route path='/dashboard/winhistory' element={<WinHistory />} />
          <Route path='/dashboard/game-rates' element={<GameRate />} />
          <Route path='/dashboard/delete-account' element={<DeleteAccount />} />
          <Route path='/dashboard/how-to-play' element={<HowToPlay />} />
          <Route path='/dashboard/Cricket' element={<Cricket />} />
          <Route path='/dashboard/bidpage/:gameName' element={<BidPage />} />
        </Routes>
      </div>
    </ProfileProvider>
  );
}

export default App;
