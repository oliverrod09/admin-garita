import { useState } from 'react'
import { Button } from "@material-tailwind/react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scanner from './components/Scanner'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddUserAdmin from './pages/AddUserAdmin';
import Invitations from './pages/Invitations';
import Register from './pages/Register';
import UsersList from './pages/UsersList';
import ResidenceList from './pages/ResidenceList';
import DetailsUser from './pages/DetailsUser'; 
import DetailsResidence from "./pages/DetailsResidence";
import UserEdit from './pages/edits/UserEdit';
import AddResidence from './pages/AddResidence';
import ResidenceEdit from './pages/edits/ResidenceEdit';
import ControlList from './pages/ControlList';
import InvitationList from './pages/InvitationList';
import DetailsInvitation from './pages/DetailsInvitation';
import VerifyInv from "./pages/VerifyInv";
import InvitationCod from './pages/InvitationCod';
import DetailsUserControl from './pages/DetailsUserControl';
import ControlEdit from './pages/edits/ControEdit';
import NotAuth from './pages/redirect/NotAuth';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/invitations' element={<Invitations></Invitations>}></Route>
        <Route path='/add_user_admin' element={<AddUserAdmin></AddUserAdmin>}></Route>
        <Route path='/add_residence' element={<AddResidence></AddResidence>}></Route>
        <Route path='/list_invitations' element={<InvitationList></InvitationList>}></Route>
        <Route path='/list_users' element={<UsersList></UsersList>}></Route>
        <Route path='/list_residences' element={<ResidenceList></ResidenceList>}></Route>
        <Route path='/list_controls' element={<ControlList></ControlList>}></Route>
        <Route path='/user/:id' element={<DetailsUser></DetailsUser>}></Route>
        <Route path='/userControl/:id' element={<DetailsUserControl></DetailsUserControl>}></Route>
        <Route path='/invitation/:id' element={<DetailsInvitation></DetailsInvitation>}></Route>
        <Route path='/residence/:id' element={<DetailsResidence></DetailsResidence>}></Route>
        <Route path='/edit_user/:id' element={<UserEdit></UserEdit>}></Route>
        <Route path='/edit_control/:id' element={<ControlEdit></ControlEdit>}></Route>
        <Route path='/edit_residence/:id' element={<ResidenceEdit></ResidenceEdit>}></Route>
        <Route path='/verify_cod' element={<VerifyInv></VerifyInv>}></Route>
        <Route path='/invitation_verif/:cod' element={<InvitationCod></InvitationCod>}></Route>
        <Route path='/not-authorized' element={<NotAuth></NotAuth>}></Route>

      </Routes>
    </Router>
    </>
  )
}

export default App
