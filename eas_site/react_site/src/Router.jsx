import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/main.css";
import Layout from "./Layout";
import ClassroomListing from "./components/ClasroomListing";
import LockerListing from "./components/LockersListing";
import ReserveLockers from "./components/ReserveLockers";
import ReserveClassrooms from "./components/ReserveClassrooms";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="classrooms" element={<ClassroomListing />}></Route>
            <Route path="lockers" element={<LockerListing />}></Route>
            <Route path="reserve_lockers" element={<ReserveLockers />}></Route>
            <Route
              path="reserve_classrooms"
              element={<ReserveClassrooms></ReserveClassrooms>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
