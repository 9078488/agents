import Layout from "./routes/Layout";
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./routes/SignIn";
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import Input from "./routes/Input";
import Output from "./routes/Output";
import InputSuccess from "./routes/InputSuccess";


function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/input" element={<Input />}></Route>
            <Route path="/output" element={<Output />}></Route>
            <Route path="/inputsuccess" element={<InputSuccess /> }></Route>
          </Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
