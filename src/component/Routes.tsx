
import {Routes,Route} from 'react-router-dom'
import AddAssets from './AddAssets';
import AddEmployee from './AddEmployee';
import AssignAssets from './AssignAssets';
import Home from './Home';



function MainRoutes() {

  return (
    <div>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/AddAsset' element={<AddAssets />}></Route>
        <Route path='/AddEmployee' element={<AddEmployee/>}></Route>
        <Route path='/AssignAsset' element={<AssignAssets/>}></Route>
        </Routes>
    </div>
  );
}

export default MainRoutes;
