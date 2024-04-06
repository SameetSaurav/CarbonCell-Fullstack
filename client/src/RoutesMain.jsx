import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './pages/Dashboard'
import Assets from './pages/Assets'
import Trade from './pages/Trade'
import History from './pages/History'
import Register from "./pages/Register";
import ApiCards from "./components/ApiCards";
import EthereumBalance from "./components/EthereumBalance";

export default function RoutesMain() {
    const {username, id} = useContext(UserContext)
    if(username){
        return(
            <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="/api" element={<ApiCards />} />
                        <Route path="/assets" element={<Assets />} />
                        <Route path="/trade" element={<Trade />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/wallet" element={<EthereumBalance />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Register />} />
                        <Route path="/logout" element={<Register />} />
                    </Route>
                </Routes>
            </Router>
            </>
        )
    }else{
        return (
            <>
            <Register />
            
            </>
        )
    }
    
}