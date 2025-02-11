import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import {
  FaHome, FaUser, FaLock, FaWallet, FaDollarSign, FaUniversity, FaMoneyBill, FaHistory,
  FaClipboardList, FaChartLine, FaQuestionCircle, FaTrash, FaSignOutAlt, FaBars, FaTimes
} from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi";

import { useProfile } from '../../../context/ProfileContext';
import fastbetLogo from '../../../assets/brand/fastbetLogo.png';
const NavbarContainer = styled.nav`
  background-color: #0b3c68;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  padding: 20px 20px;
  color: white;
  position: sticky;
  box-sizing:border-box;
  top:0;
  left:0;
  right:0;
  

box-sizing:border-box;
  @media (max-width: 1024px) {
    padding: 15px 20px;
  }
    
`;

const Logo = styled.a`
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
border-radius:50%;
    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 30px;
  row-gap: 50px;
  width: 90%;
  // padding: 20px 0;
  box-sizing:border-box;

  @media (max-width: 1024px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
    background-color: #0b3c68;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 20px;
    z-index: 1000;
    border-top: 2px solid #ffcc00;
  }
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ active }) => (active ? "#00ff00" : "white")};  /* Active link is green */
  font-weight: medium;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    color: #ffcc00;
  }
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 22px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 80%;
  justify-content: space-between;
`;

const Wallet = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 18px;
`;

const MenuToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  color: white;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { profile } = useProfile();
  return (
    <NavbarContainer>
      <LeftContainer>
        <Logo href="/">
          <img src={fastbetLogo} alt="Shri Matka" />
        </Logo>
        <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
        <NavLinks open={menuOpen}>
          <NavLink active={location.pathname === "/dashboard"} href="/dashboard"><FaHome /> HOME</NavLink>
          <NavLink active={location.pathname === "/dashboard/my-profile"} href="/dashboard/my-profile"><FaUser /> MY PROFILE</NavLink>
          <NavLink active={location.pathname === "/change-password"} href="/change-password"><FaLock /> CHANGE PASSWORD</NavLink>
          <NavLink active={location.pathname === "/dashboard/wallet"} href="/dashboard/wallet"><FaWallet /> WALLET</NavLink>
          <NavLink active={location.pathname === "/dashboard/add-points"} href="/dashboard/add-points"><FaDollarSign /> ADD POINT</NavLink>
          <NavLink active={location.pathname === "/dashboard/payment-details"} href="/dashboard/payment-details"><FaUniversity /> ADD BANK DETAIL</NavLink>
          <NavLink active={location.pathname === "/dashboard/reedeem-points"} href="/dashboard/reedeem-points"><FaMoneyBill /> REDEEM POINT</NavLink>
          <NavLink active={location.pathname === "/dashboard/bidhistory"} href="/dashboard/bidhistory"><FaHistory /> BID HISTORY</NavLink>
          <NavLink active={location.pathname === "/dashboard/winhistory"} href="/dashboard/winhistory"><FaClipboardList /> WIN HISTORY</NavLink>
          <NavLink active={location.pathname === "/dashboard/game-rates"} href="/dashboard/game-rates"><FaChartLine /> GAME RATE</NavLink>
          <NavLink active={location.pathname === "/dashboard/how-to-play"} href="/dashboard/how-to-play"><FaQuestionCircle /> HOW TO PLAY</NavLink>
          <NavLink active={location.pathname === "/dashboard/help-support"} href="https://wa.me/9999999990" target="_blank" rel="noopener noreferrer"><FaQuestionCircle /> HELP & SUPPORT</NavLink>
          <NavLink active={location.pathname === "/dashboard/delete-account"} href="/dashboard/delete-account"><FaTrash /> DELETE ACCOUNT</NavLink>
          <NavLink active={location.pathname === "/dashboard/signup"} href="/" onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }}><FaSignOutAlt /> LOGOUT</NavLink>
        </NavLinks>
      </LeftContainer>

      <RightIcons>
        <Wallet>
          {profile.walletBalance}<IoWalletOutline title="Wallet" />
        </Wallet>
        <Wallet>
          {profile.username} <HiOutlineUserCircle title="User" /></Wallet>

      </RightIcons>
    </NavbarContainer>
  );
};

export default DashboardNavbar;
