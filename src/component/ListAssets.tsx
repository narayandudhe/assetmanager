import React, { useContext } from 'react';
import { AssetManagerContext } from './NodeContext';


function ListAssets() {
      //implement assets context
  const assetscontext=useContext(AssetManagerContext);

  const handleclickDelete=(event:React.MouseEvent<HTMLButtonElement>,id:number):void=>{
    var a=document.getElementById("aa"+id.toString());
    assetscontext.assets.splice(assetscontext.assets.findIndex(a => a.AssetsId === id) , 1);
    a?.remove();
   console.log("deleted");
   
   
  }
 

  return (
       <div   className='table_content list'>
        <table className='table'>
          <caption>List Of Assets Available</caption>
          <thead>
          <tr>
              <th>Assets Id</th>
              <th>Assets Name</th>
              <th>Assets Serial No.</th>
              <th>Assets Company Name</th>
              <th>Assets Model</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
          </thead>
          <tbody id='addass'>
          {

assetscontext.assets.map((assets,index)=>{
              return(
                
                  <tr key={index} id={"aa"+assets.AssetsId.toString()}>
                      <td key={assets.AssetsId}><span>{assets.AssetsId}</span></td>
                     
                      <td><p id={'name'+assets.AssetsId.toString()}>{assets.AsstsName}</p></td>
                      <td><p id={'serial'+assets.AssetsId.toString()}> {assets.AssetsSerialNo}</p></td>
                      <td><p id={'company'+assets.AssetsId.toString()}>{assets.AssetsCompanyName}</p></td>
                      <td><p id={'model'+assets.AssetsId.toString()}>{assets.AssetModel}</p></td>
                      <td><button id={"edit"+assets.AssetsId.toString()}>Edit</button></td>
                      <td><button onClick={(event)=>handleclickDelete(event,assets.AssetsId)}>Delete</button></td>
                  </tr>
              )
              
          })
          
          }
           </tbody>
  
        </table>
      </div>
  );
}

export default ListAssets;
