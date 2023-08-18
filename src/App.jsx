import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Usermanage from './components/Usermanage'
import SingleUser from "./components/SingleUser";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Usermanage />}></Route>
          <Route path="user/:userId" element={<SingleUser />} />
      </Routes>
    </BrowserRouter>
    {/* <Usermanage/> */}
    </>
  )
}

export default App
