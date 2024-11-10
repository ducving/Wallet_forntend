import { Route, Routes } from "react-router-dom"
import Login from './pages/Login/Login';
import Test from './pages/Login/Test';
import Home from "./pages/Home/Home";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Detail from "./pages/Detail/Detail";



function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/test' element={<Test/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/detail/:id' element={<Detail/>}></Route>
            </Routes>
        </>
    );
}
export default App;