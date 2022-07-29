import React,{useContext} from 'react';
import {AssetManagerContext} from './NodeContext'


function AssignedAssets() {
   
  //implement context
  const assetManagerContext=useContext(AssetManagerContext);

  const handleclick=(event:React.MouseEvent<HTMLButtonElement>,id:number,aid:number):void=>{
    var a=document.getElementById(id.toString());
    
    assetManagerContext.assignedAssets.splice(assetManagerContext.assignedAssets.findIndex(a => a.AssignedId === id) , 1)
    
    a?.remove();
    
    //change status to not assigned
    var objIndex = assetManagerContext.assets.findIndex((obj => obj.AssetsId === aid));
    assetManagerContext.assets[objIndex].AssetAsigned=false;
    
    }  
  if(assetManagerContext.assignedAssets.length>0)
  {
  
    return (
      <div  className='table_content'>
      <table className='table'>
        <caption>List Of Assigned Assets</caption>
        <tr>
          <th>Assigned Id</th>
            <th>Assets Name</th>
            <th>Assets Serial No.</th>
            <th>Assets Company Name</th>
            <th>Assets Model</th>
            <th>Assigned Emp. Id</th>
            <th>Assigned Emp. Name</th>
            <th>Assigned Date</th>
            <th>Delete Entry</th>
        </tr>
        {
          
          assetManagerContext.assignedAssets.map((assets,index)=>{
            return(
                <tr id={assets.AssignedId.toString()} >
                    <td><span>{assets.AssignedId}</span></td>
                    <td><span>{assets.AsstsName}</span></td>
                    <td><span>{assets.AssetsSerialNo}</span></td>
                    <td><span>{assets.AssetsCompanyName}</span></td>
                    <td><span>{assets.AssetModel}</span></td>
                    <td><span>{assets.EmployeeId}</span></td>
                    <td><span>{assets.EmployeeName}</span></td>
                    <td><span>{assets.DateOfAssigned}</span></td>
                    <td><button onClick={(event)=>handleclick(event,assets.AssignedId,assets.AssetsId)}>Delete</button></td>
                  
                  
                      
                    
                </tr>
            )
            
        })}
  
      </table>
    </div>
    );
  }
  else{

   
    return (
      <div  className='table_content'>
        <table className='table'>
          <caption>Not assigned any Asstes to Employee</caption>
          </table>
          </div>
    )
  }
  
}

export default AssignedAssets;
