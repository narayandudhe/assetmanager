import React,{useContext,useState} from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik'
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

function TempAddEmployee() {
  //implement employee context
  const employeecontext=useContext(AssetManagerContext);

const handleRemoveSpecificRow = (index:number) => {
  const tempRows = [...employeecontext.employees]; // to avoid  direct state mutation
  tempRows.splice(index, 1);
  employeecontext.setEmployees(tempRows);
  //formik.resetForm({});
setformval(initialValues);
setreset(false);
setbuttonname("Add Employee");  
};
const resetformm=()=>{
  setformval(initialValues);
setreset(false);
setbuttonname("Add Employee"); 
}
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
// const resetform=()=>{
//   formik.resetForm();
// }
const [reset, setreset] = useState(false);
const [formval, setformval] = useState(initialValues);
const [buttonname, setbuttonname] = useState("Add Employee");

    
  return (
    <>
    <Formik
    initialValues={formval}
    validationSchema={validationSchema}
    onSubmit={(values,{resetForm})=>{
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
       // formik.resetForm();
      }      
      resetForm({});
      setformval(initialValues);
      setreset(false);
      setbuttonname("Add Employee"); 
    }}
    enableReinitialize={true}
    >
    <div className='form-control'>
      
      <Form>
        
        <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeName'>Employee Name</label>
        <Field className='adinput' type='text' id='EmployeeName' name='EmployeeName'/>
        <ErrorMessage component="span" className='errordisplay' name='EmployeeName'></ErrorMessage>
       </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeAddress'>Employee Address</label>
        <Field className='adinput' type='text' id='EmployeeAddress' name='EmployeeAddress'/>
        <ErrorMessage component="span" className='errordisplay' name='EmployeeAddress'></ErrorMessage>
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeDepName'>Employee Dep. Name</label>
        <Field className='adinput' type='text' id='EmployeeDepName' name='EmployeeDepName'/>
        <ErrorMessage component="span" className='errordisplay' name='EmployeeDepName'></ErrorMessage>
       </div>
        <button className='submitform' type='submit'>{buttonname}</button>
        <button type='reset' onClick={resetformm}  className='submitform'>Reset</button>
       </Form>
    </div> 
    </Formik>
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
              <td><button type='button' onClick={(event)=>abe(event,employee.EmployeeId)}>Edit</button></td>
              <td><button type='button' onClick={(event)=>handleRemoveSpecificRow(index)}>Delete</button></td>
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

export default TempAddEmployee;
