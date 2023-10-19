
import './App.css';
import Layout from './layout';
import NpmDataTable from './npmdatatable';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Update from './updateitem';

function App() {
  return (
  
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <NpmDataTable 
                />
              }
            />
            <Route
              path="Update/:item"
              element={<Update/>}
            />
            {/* <Route
              path="ADD"
              element={<Adddata onadddata={adddata}/>}
            /> */}
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
