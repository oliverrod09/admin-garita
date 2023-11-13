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
        <Route path='/list_users' element={<UsersList></UsersList>}></Route>
        <Route path='/list_residences' element={<ResidenceList></ResidenceList>}></Route>
        <Route path='/user/:id' element={<DetailsUser></DetailsUser>}></Route>
        <Route path='/residence/:id' element={<DetailsResidence></DetailsResidence>}></Route>
        <Route path='/edit_user/:id' element={<UserEdit></UserEdit>}></Route>
        <Route path='/edit_residence/:id' element={<ResidenceEdit></ResidenceEdit>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
