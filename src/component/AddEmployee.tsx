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

function AddEmployee() {



  //implement employee context
  const employeecontext=useContext(AssetManagerContext);

const handleRemoveSpecificRow = (index:number,employeeid:number) => {
  try {
    fetch("http://localhost:51992/Employees/"+employeeid,
      {
          method: "DELETE",
        
      }).
      then(response => {
        if(response.status===200)
        {
          setformval(initialValues);
          setreset(false);
          setbuttonname("Add Employee"); 
          const tempRows = [...employeecontext.employees]; // to avoid  direct state mutation
          tempRows.splice(index, 1);
          employeecontext.setEmployees(tempRows);
          
        }
      })
     
  } catch (err) {
    console.log(err);
  }

  
};
const resetformm=()=>{
  setformval(initialValues);
setreset(false);
setbuttonname("Add Employee"); 
}
const abe=(event:React.MouseEvent<HTMLButtonElement>,id:number,index:number)=>{
setbuttonname("Update Employee");
var a=document.getElementById('name'+id.toString()) as HTMLElement
var b=document.getElementById('address'+id.toString()) as HTMLElement
var c=document.getElementById('depname'+id.toString()) as HTMLElement
SavedValues.EmployeeId=id;
SavedValues.EmployeeName=a.innerText;
SavedValues.EmployeeAddress=b.innerText;
SavedValues.EmployeeDepName=c.innerText;
setindex(index);
setformval(SavedValues);
setreset(true);

}
// const resetform=()=>{
//   formik.resetForm();
// }
const [reset, setreset] = useState(false);
const [formval, setformval] = useState(initialValues);
const [buttonname, setbuttonname] = useState("Add Employee");
const [index, setindex] = useState(0);
    
  return (
    <>
    <Formik
    initialValues={formval}
    validationSchema={validationSchema}
    onSubmit={ (values,{resetForm})=>{
      if(reset){
    try {
      fetch("http://localhost:51992/Employees/"+SavedValues.EmployeeId,
        {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
         },
            body: JSON.stringify({
              EmployeeId:SavedValues.EmployeeId,
              EmployeeName: values.EmployeeName,
              EmployeeAddress: values.EmployeeAddress,
              EmployeeDepName: values.EmployeeDepName,
            })
        }).
        then(response => response.json())
        .then(data => {
          const tempRows = [...employeecontext.employees]; // to avoid  direct state mutation
          tempRows.splice(index, 1,data);
          employeecontext.setEmployees(tempRows);
        });
    } catch (err) {
      console.log(err);
    }
    //console.log("After update: ", values)
      }
      else{
        try {
          fetch("http://localhost:51992/Employees",
            {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
             },
                body: JSON.stringify(values)
            }).
            then(response => response.json())
            .then(data => {
              employeecontext.setEmployees([...employeecontext.employees,data]);
            });
        } catch (err) {
          console.log(err);
        }
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
        
          <tr key={index} id={'tr'+employee.EmployeeId}>
              <td><span>{employee.EmployeeId}</span></td>
             
              <td><p id={'name'+employee.EmployeeId}>{employee.EmployeeName}</p></td>
              <td><p id={'address'+employee.EmployeeId}> {employee.EmployeeAddress}</p></td>
              <td><p id={'depname'+employee.EmployeeId}>{employee.EmployeeDepName}</p></td>
              <td><button type='button' onClick={(event)=>abe(event,employee.EmployeeId,index)}>Edit</button></td>
              <td><button type='button' onClick={(event)=>handleRemoveSpecificRow(index,employee.EmployeeId)}>Delete</button></td>
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
