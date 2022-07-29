import React,{useContext,useState} from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { AssetManagerContext } from './NodeContext';

const initialValues={
  EmployeeId:0,
  EmployeeName:'',
  EmployeeAddress:'',
  EmployeeDepName:''
} 
const SavedValues={

  EmployeeId:0,
  EmployeeName:'',
  EmployeeAddress:'',
  EmployeeDepName:''
}

const validationSchema=Yup.object({
  EmployeeName:Yup.string().required("Employee Name is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
  EmployeeAddress:Yup.string().required("Employee Address is Required"),
  EmployeeDepName:Yup.string().required("Employee Dep. Name is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
})
function AddEmployee() {
  //implement employee context
  const employeecontext=useContext(AssetManagerContext);

//  const handleclickDelete=(event:React.MouseEvent<HTMLButtonElement>,id:number):void=>{
//   console.log("function  called");
  
//   let a=document.getElementById('tr'+id.toString()) as HTMLElement;
//   employeecontext.employees.splice(employeecontext.employees.findIndex(a => a.EmployeeId === id) , 1);
//   document.getElementById('emplist')?.removeChild(a!);
 

// }
const handleRemoveSpecificRow = (index:number) => {
  const tempRows = [...employeecontext.employees]; // to avoid  direct state mutation
  tempRows.splice(index, 1);
  employeecontext.setEmployees(tempRows);
  formik.resetForm({});
setformval(initialValues);
setreset(false);
setbuttonname("Add Employee");  
};
const abe=(event:React.MouseEvent<HTMLButtonElement>,id:number)=>{
setbuttonname("Update Employee");
var a=document.getElementById('name'+id.toString()) as HTMLElement
var b=document.getElementById('address'+id.toString()) as HTMLElement
var c=document.getElementById('depname'+id.toString()) as HTMLElement
SavedValues.EmployeeId=id;
SavedValues.EmployeeName=a.innerText;
SavedValues.EmployeeAddress=b.innerText;
SavedValues.EmployeeDepName=c.innerText;

setformval(SavedValues);
setreset(true);

}
const resetform=()=>{
  formik.resetForm();
}
const [reset, setreset] = useState(false);
const [formval, setformval] = useState(initialValues);
const [buttonname, setbuttonname] = useState("Add Employee");
        const formik=useFormik({
         initialValues:formval,
         onSubmit(values, formikHelpers) {
          if(reset){
            //Find index of specific object using findIndex method.    
      var objIndex = employeecontext.employees.findIndex((obj => obj.EmployeeId === SavedValues.EmployeeId));
      
      //Log object to Console.
      //console.log("Before update: ", List_assetss[objIndex]);
      
      //Update object's name property.
      employeecontext.employees[objIndex].EmployeeAddress=values.EmployeeAddress;
      employeecontext.employees[objIndex].EmployeeName=values.EmployeeName;
      employeecontext.employees[objIndex].EmployeeDepName=values.EmployeeDepName;
      //console.log("After update: ", values)
          }
          else{
            values.EmployeeId=employeecontext.empidd();
           // setNames(names => [...names, newName])
           employeecontext.setEmployees([...employeecontext.employees,values]);
            //employeecontext.employees.push(values);
            // List_Employeee.push(values);
            formik.resetForm();
          }      
          formik.resetForm({});
          setformval(initialValues);
          setreset(false);
          setbuttonname("Add Employee");  
         },
         validationSchema,
         
  enableReinitialize:true
         
         
        })
    
  return (
    <>
    <div className='form-control'>
      <form onSubmit={formik.handleSubmit}>
        
        <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeName'>Employee Name</label>
        <input className='adinput' type='text' id='EmployeeName' name='EmployeeName' onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.EmployeeName}/>
        {formik.touched.EmployeeName && formik.errors.EmployeeName? <div className='errordisplay'>{formik.errors.EmployeeName}</div>:null}
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeAddress'>Employee Address</label>
        <input className='adinput' type='text' id='EmployeeAddress' name='EmployeeAddress' onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.EmployeeAddress}/>
        {formik.touched.EmployeeAddress && formik.errors.EmployeeAddress? <div className='errordisplay'>{formik.errors.EmployeeAddress}</div>:null}
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeDepName'>Employee Dep. Name</label>
        <input className='adinput' type='text' id='EmployeeDepName' name='EmployeeDepName' onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.EmployeeDepName}/>
        {formik.touched.EmployeeDepName && formik.errors.EmployeeDepName? <div className='errordisplay'>{formik.errors.EmployeeDepName}</div>:null}
        </div>
        <button className='submitform' type='submit'>{buttonname}</button>
        <button className='submitform' onClick={resetform}>Reset</button>
       </form>
    </div>

<div   className='table_content list'>
<table className='table'>
  <caption>List Of Employee</caption>
 
  <tr>
      <th>Employee Id</th>
      <th>Employee Name</th>
      <th>Employee Address</th>
      <th>Employee Dep. Name</th>
      <th>Edit</th>
      <th>Delete</th>
  </tr>
  <tbody id="emplist">
  {
 
employeecontext.employees.map((employee,index)=>{
      return(
        
          <tr key={index} id={'tr'+employee.EmployeeId.toString()}>
              <td><span>{employee.EmployeeId}</span></td>
             
              <td><p id={'name'+employee.EmployeeId.toString()}>{employee.EmployeeName}</p></td>
              <td><p id={'address'+employee.EmployeeId.toString()}> {employee.EmployeeAddress}</p></td>
              <td><p id={'depname'+employee.EmployeeId.toString()}>{employee.EmployeeDepName}</p></td>
              <td><button  onClick={(event)=>abe(event,employee.EmployeeId)}>Edit</button></td>
              <td><button onClick={(event)=>handleRemoveSpecificRow(index)}>Delete</button></td>
          </tr>
         
      )
      
  })
 
  }
    </tbody>

</table>
</div>


</>
  );
}

export default AddEmployee;
