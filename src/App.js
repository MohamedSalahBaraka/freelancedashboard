import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from './pages/login';
import CreateBid from './pages/Bids/CreateBid';
import EditBid from './pages/Bids/EditBid';
import ViewBid from './pages/Bids/ViewBid';
import ShowBid from './pages/Bids/ShowBid';

import CreateCity from './pages/City/CreateCity';
import EditCity from './pages/City/EditCity';
import ViewCity from './pages/City/ViewCity';
import ShowCity from './pages/City/ShowCity';

import ViewProposals from './pages/Proposals/ViewProposals';
import ShowProposals from './pages/Proposals/ShowProposals';

import CreateSkils from './pages/Skils/CreateSkils';
import EditSkils from './pages/Skils/EditSkils';
import ViewSkils from './pages/Skils/ViewSkils';
import ShowSkils from './pages/Skils/ShowSkils';

import CreateUser from './pages/Users/CreateUser';
import EditUser from './pages/Users/EditUser';
import Subscriptions from './pages/Users/Subscriptions';
import ViewUser from './pages/Users/ViewUser';
import ShowUser from './pages/Users/ShowUser';

import CreateAdmin from './pages/Admins/CreateAdmin';
import EditAdmin from './pages/Admins/EditAdmin';
import ShowAdmin from './pages/Admins/ShowAdmin';
import ViewAdmin from './pages/Admins/ViewAdmin';

import CreateSubscriptions from './pages/Subscriptions/CreateSubscriptions';
import EditSubscriptions from './pages/Subscriptions/EditSubscriptions';
import ShowSubscriptions from './pages/Subscriptions/ShowSubscriptions';
import ViewSubscriptions from './pages/Subscriptions/ViewSubscriptions';

import CreatePhones from './pages/Phones/CreatePhones';
import EditPhones from './pages/Phones/EditPhones';
import ShowPhones from './pages/Phones/ShowPhones';
import ViewPhones from './pages/Phones/ViewPhones';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route index element={<Home />} />
        <Route path="/" element={<Layout />}>
          <Route path="CreateBid" element={<CreateBid />} />
          <Route path="EditBid/:id" element={<EditBid />} />
          <Route path="ShowBid/:id" element={<ShowBid />} />
          <Route path="ViewBid" element={<ViewBid />} />

          <Route path="CreateCity" element={<CreateCity />} />
          <Route path="EditCity/:id" element={<EditCity />} />
          <Route path="ShowCity/:id" element={<ShowCity />} />
          <Route path="ViewCity" element={<ViewCity />} />

          <Route path="ShowProposals/:id" element={<ShowProposals />} />
          <Route path="ViewProposals/:id" element={<ViewProposals />} />

          <Route path="CreateSkils" element={<CreateSkils />} />
          <Route path="EditSkils/:id" element={<EditSkils />} />
          <Route path="ShowSkils/:id" element={<ShowSkils />} />
          <Route path="ViewSkils" element={<ViewSkils />} />

          <Route path="CreateUser" element={<CreateUser />} />
          <Route path="Subscriptions/:id" element={<Subscriptions />} />
          <Route path="EditUser/:id" element={<EditUser />} />
          <Route path="ShowUser/:id" element={<ShowUser />} />
          <Route path="ViewUser" element={<ViewUser />} />


          <Route path="CreateAdmin" element={<CreateAdmin />} />
          <Route path="EditAdmin/:id" element={<EditAdmin />} />
          <Route path="ShowAdmin/:id" element={<ShowAdmin />} />
          <Route path="ViewAdmin" element={<ViewAdmin />} />


          <Route path="CreateSubscriptions" element={<CreateSubscriptions />} />
          <Route path="EditSubscriptions/:id" element={<EditSubscriptions />} />
          <Route path="ShowSubscriptions/:id" element={<ShowSubscriptions />} />
          <Route path="ViewSubscriptions" element={<ViewSubscriptions />} />


          <Route path="CreatePhones" element={<CreatePhones />} />
          <Route path="EditPhones/:id" element={<EditPhones />} />
          <Route path="ShowPhones/:id" element={<ShowPhones />} />
          <Route path="ViewPhones" element={<ViewPhones />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
