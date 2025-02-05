
import Dashboard from "./Pages/Dashboard";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Start from "./Pages/Start";

export default function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/signin"element={<Signin/>}/>
        <Route path="/signup"element={<Signup/>}/>
        <Route path="/dashboard"element={<Dashboard/>}/>
       
      </Routes>
      <script src="https://platform.linkedin.com/in.js" type="text/javascript"></script>
    </BrowserRouter>
  )
}