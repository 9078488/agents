import Layout from "./routes/Layout";
import CryptoPrivateInfo from "./routes/CryptoPrivateInfo";
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./routes/SignIn";
import SignUp from './routes/SignUp';
import Profile from "./routes/Profile";
import Home from './routes/Home';
import Solidity from "./routes/Solidity";


function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/crypto-private-info" element={<CryptoPrivateInfo />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/solidity" element={<Solidity />}></Route>
          </Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
