
import './App.css';
import Header from './component/Header';
import MainRoute from './component/Routes'
import {BrowserRouter} from 'react-router-dom'
import { AssetManagerContext } from './component/NodeContext';
import { useState } from 'react';
import { List_asset, List_assets_assigned, List_Employe } from './component/Interfacess';



 let assetsid=199;
 export function assetsidd(){
    assetsid=assetsid+1;
    return assetsid;

}
 let assignedid=399;
 export function assigndidd(){
    assignedid=assignedid+1;
    return assignedid;

}

function App() {
    
    //state of list of employee
    const [employees, setEmployees] = useState<List_Employe[]>([],);
    //state of list of assets
    const [assets, setAssets] = useState<List_asset[]>([],);
    //state of list of assigned assets
    const [assignedAssets, setAssignedAssets] = useState<List_assets_assigned[]>([],);
    //inital id generation global state
    const [empid, setempid] = useState(199);
    const [asstesidd, setasstesidd] = useState(99);
    const [assignidd, setassignidd] = useState(999);
    
    //id increment 
    const empidd=()=>{
      setempid(empid+1);
      return empid;
    }
    const assetsidd=()=>{
      setasstesidd(asstesidd+1);
      return asstesidd;
    }
    const assignedid=()=>{
      setassignidd(assignidd+1);
      return assignidd;
    }


  return (
   
    <BrowserRouter>
    <AssetManagerContext.Provider value={{employees,assets,assignedAssets,setEmployees,setAssets,setAssignedAssets,empidd,assetsidd,assignedid}}>
    <div className='app'>
      <Header></Header>
      </div>
      <MainRoute/>
   
   </AssetManagerContext.Provider>
    
    </BrowserRouter>
  
  );
}

export default App;
