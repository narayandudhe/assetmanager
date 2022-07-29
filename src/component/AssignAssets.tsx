import {useContext } from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {AssetManagerContext} from './NodeContext'

//validation with yup
const validationSchema=Yup.object({
  AsstsName:Yup.string().required("Required"),
  EmployeeName:Yup.string().required("Required"),
})
 
function AssignAssets() {

  //implement context
  const assetManagerContext=useContext(AssetManagerContext);
  
  const handleclick=(index:number,aid:number):void=>{
    //change status to not assigned
    var objIndex = assetManagerContext.assets.findIndex((obj => obj.AssetsId === aid));
    assetManagerContext.assets[objIndex].AssetAsigned=false;
    
    console.log("deleted");
  
    const tempRows = [...assetManagerContext.assignedAssets]; // to avoid  direct state mutation
    tempRows.splice(index, 1);
    assetManagerContext.setAssignedAssets(tempRows);
    } 
  const resetform=()=>{
    formik.resetForm();
  }

  //const [assignid, setassignid] = useState(100);
    const formik=useFormik({
        initialValues:{
          AsstsName:'',
          EmployeeName:'',
          AssetsId:0,
          EmployeeId:0 ,
          AssetModel:'',
          AssetsSerialNo:'',
          AssetsCompanyName:'',
          DateOfAssigned:'07/17/2022',
          AssignedId:0,
        },
        onSubmit:values=>{
          values.DateOfAssigned=new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2);
          values.AssignedId=assetManagerContext.assignedid();
          var objIndex = assetManagerContext.assets.findIndex((obj => obj.AssetsId === values.AssetsId));
          assetManagerContext.assets[objIndex].AssetAsigned=true;
          //let a=assignid+1;
        //  setassignid(a);
          
        //assetManagerContext.assignedAssets.push(values);

        assetManagerContext.setAssignedAssets([...assetManagerContext.assignedAssets,values]);
         
          formik.resetForm();
        },
        validationSchema
        
       })
  return (
    <>
    <div className='form-control'>
       <form onSubmit={formik.handleSubmit}>
       <div className="form-controlc">
        <label className='adlabel' htmlFor='AsstsName'> Select Asstes Name</label>
        <select className='adinput' name="AsstsName" id="AsstsName" item-data={formik.values.AssetsId} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.AsstsName} >
            <option defaultValue={"select an Assets"} value="Select an Assets">select an Assets</option>
            {

              assetManagerContext.assets.map((assets)=>{
              if(assets.AssetAsigned===false)
              {
                return(
                  <option  key={assets.AssetsId} value={assets.AsstsName}>{assets.AsstsName}<input type="hidden" name="AssetsId" value={formik.values.AssetsId=assets.AssetsId}/>
                  <input type="hidden" name="AssetModel" value={formik.values.AssetModel=assets.AssetModel}/>
                  <input type="hidden" name="AssetsSerialNo" value={formik.values.AssetsSerialNo=assets.AssetsSerialNo}/>
                  <input type="hidden" name="AssetsCompanyName" value={formik.values.AssetsCompanyName=assets.AssetsCompanyName}/>
                  </option>
                  )
              }
            
            
            })}
        </select>
        {formik.touched.AsstsName && formik.errors.AsstsName? <div className='errordisplay'>{formik.errors.AsstsName}</div>:null}
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeName'> Select Employee </label>
        <select className='adinput' name="EmployeeName" id="EmployeeName" item-data={formik.values.EmployeeId} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.EmployeeName}>
            <option defaultValue={"select an Employee to Assign"} value="select an Employee to Assign">select an Employee to Assign</option>
            {
            assetManagerContext.employees.map((Employee)=>{
            return(
            <option  key={Employee.EmployeeId} value={Employee.EmployeeName}>{Employee.EmployeeName}
            <input type="hidden" name="EmployeeId" value={formik.values.EmployeeId=Employee.EmployeeId}/>
            </option>
            )
            })}
        </select>
        {formik.touched.EmployeeName && formik.errors.EmployeeName? <div className='errordisplay'>{formik.errors.EmployeeName}</div>:null}
        </div>
        <button className='submitform' type='submit'>Assign Assets</button>
        <button className='submitform' onClick={resetform}>Reset</button>
       </form>
    </div>
   
    <div  className='table_content list'>
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
                <tr key={index} id={assets.AssignedId.toString()} >
                    <td><span>{assets.AssignedId}</span></td>
                    <td><span>{assets.AsstsName}</span></td>
                    <td><span>{assets.AssetsSerialNo}</span></td>
                    <td><span>{assets.AssetsCompanyName}</span></td>
                    <td><span>{assets.AssetModel}</span></td>
                    <td><span>{assets.EmployeeId}</span></td>
                    <td><span>{assets.EmployeeName}</span></td>
                    <td><span>{assets.DateOfAssigned}</span></td>
                    <td><button onClick={(event)=>handleclick(index,assets.AssetsId)}>Delete</button></td>
                  
                  
                      
                    
                </tr>
            )
            
        })}
  
      </table>
    </div>
    
    </>
  );
}

export default AssignAssets;
