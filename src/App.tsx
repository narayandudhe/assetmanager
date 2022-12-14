
import './App.css';
import Header from './component/Header';
import MainRoute from './component/Routes'
import {BrowserRouter} from 'react-router-dom'
import { AssetManagerContext } from './component/NodeContext';
import { useEffect, useState } from 'react';
import { List_asset, List_assets_assigned, List_Employe } from './component/Interfacess';


function App() {
    //state of list of employee
    const [employees, setEmployees] = useState<List_Employe[]>([],);
    //state of list of assets
    const [assets, setAssets] = useState<List_asset[]>([],);
    //state of list of assigned assets
    const [assignedAssets, setAssignedAssets] = useState<List_assets_assigned[]>([],);
    
    useEffect(() => {
      fetch("http://localhost:51992/Employees")
        .then((response) => response.json())
        .then(
          (result) => {
           setEmployees(result);
          }
        )
        .catch((error) => console.log(error));

        fetch("http://localhost:51992/Asstes")
        .then((response) => response.json())
        .then(
          (result) => {
           setAssets(result);
          }
        )
        .catch((error) => console.log(error));

        let aa:number;
        fetch("http://localhost:51992/AsstsAssigned")
        .then((response) => {
          aa=response.status;
          if(response.status===200)
          {
            return response.json();
          }
          return response.text();
          
        }
        
        )
        .then(
          (result) => {
            if(aa===200)
            {
              setAssignedAssets(result);
            }
            console.log("No Data Found On Server");
            
          }
        )
        .catch((error) => console.log(error));
    }, []);
const apiurl="http://localhost:51992";
  return (
    <BrowserRouter>
    <AssetManagerContext.Provider value={{employees,assets,assignedAssets,setEmployees,setAssets,setAssignedAssets,apiurl}}>
    <div className='app'>
      <Header></Header>
      </div>
      <MainRoute/>
   
   </AssetManagerContext.Provider>
    
    </BrowserRouter>
  
  );
}

export default App;
