import axios from 'axios'
import { UserContextProvider } from './UserContext'
import RoutesMain from './RoutesMain'


function App() {

    axios.defaults.baseURL = "http://localhost:4000/"
    axios.defaults.withCredentials = true
    
    return (
        <UserContextProvider>
            <RoutesMain />
        </UserContextProvider>
        
    )
}

export default App
