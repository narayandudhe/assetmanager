import React,{ChangeEvent, useContext,useState} from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { AssetManagerContext } from './NodeContext';


const today=new Date();
const d=new Date();
d.setFullYear(d.getFullYear()-10);
const initialValues={
  EmployeeId:0,
  EmployeeName:'',
  EmployeeAddress:'',
  EmployeeDepName:'',
  EmployeeProfilePicUrl:'',
  EmployeeSalary:0,
  DateOfBirth:d.toISOString().slice(0,10),
  DateOfJoining:today.toISOString().slice(0,10),
  EmployeeEmailId:'',
  EmployeeMobileNo:0

} 
const SavedValues={

  EmployeeId:0,
  EmployeeName:'',
  EmployeeAddress:'',
  EmployeeDepName:'',
  EmployeeProfilePicUrl:'',
  EmployeeSalary:0,
  DateOfBirth:d.toISOString().slice(0,10),
  DateOfJoining:today.toISOString().slice(0,10),
  EmployeeEmailId:'',
  EmployeeMobileNo:0
}



const validationSchema=Yup.object({
   EmployeeName:Yup.string().required("Employee Name is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
   EmployeeAddress:Yup.string().required("Employee Address is Required"),
   EmployeeDepName:Yup.string().required("Employee Dep. Name is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
  // DateOfBirth:Yup.date().required("Please Enter Date Of Birth!").max(d.toISOString().slice(0,10),"Please Choose Before Date"),
 //  DateOfJoin:Yup.date().required("Please Enter Date Of Join!").min(today.toISOString().slice(0,10),"Please Choose after date!"),
   EmployeeEmailId:Yup.string().required("Please Enter Email Id!"),
   EmployeeMobileNo:Yup.number().required("Please Enter Mobile No!"),
   EmployeeSalary:Yup.number().required("Please Enter Salary!"),

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
const edit=(event:React.MouseEvent<HTMLButtonElement>,id:number,index:number)=>{
setbuttonname("Update Employee");

var a=document.getElementById('name'+id.toString()) as HTMLElement
var b=document.getElementById('address'+id.toString()) as HTMLElement
var c=document.getElementById('depname'+id.toString()) as HTMLElement
var d=document.getElementById('salary'+id.toString()) as HTMLElement
var e=document.getElementById('dob'+id.toString()) as HTMLElement
var f=document.getElementById('doj'+id.toString()) as HTMLElement
var g=document.getElementById('email'+id.toString()) as HTMLElement
var h=document.getElementById('mobile'+id.toString()) as HTMLElement
var i=document.getElementById('img'+id.toString()) as HTMLElement;
SavedValues.EmployeeId=id;
SavedValues.EmployeeName=a.innerText;
SavedValues.EmployeeAddress=b.innerText;
SavedValues.EmployeeDepName=c.innerText;
SavedValues.EmployeeSalary=Number(d.innerText);
SavedValues.DateOfBirth=e.innerText;
SavedValues.DateOfJoining=f.innerText;
SavedValues.EmployeeEmailId=g.innerText;
SavedValues.EmployeeMobileNo=Number(h.innerText);
if(i.getAttribute("src"))
{
  setimgfile(i.getAttribute("src")?.toString());
  setImgUrl(i.getAttribute("src")?.toString());
}

setindex(index);
setformval(SavedValues);
setreset(true);

}
const [reset, setreset] = useState(false);
const [formval, setformval] = useState(initialValues);
const [buttonname, setbuttonname] = useState("Add Employee");
const [index, setindex] = useState(0);
const [imgfile, setimgfile] = useState<string>();
const [imgurl,setImgUrl]=useState<string>();
const formdata=new FormData();

const handlepic=(e:ChangeEvent<HTMLInputElement>)=> {
  console.log(e.target.files);
 

  if(e.target.files?.length)
  {
    formdata.append("file",e.target.files[0]);
    setimgfile(URL.createObjectURL(e.target.files[0]));
    try
    {
     fetch("http://localhost:51992/Employees/1",
     {
         method: "POST",
         headers: {
           "encType":"multipart/form-data"
      },
         body: formdata
     }).
     then(response => response.text())
     .then(data => {
      setImgUrl(data);
      console.log(data);
      
      formdata.delete("file");
     });
    }
   catch(err)
   {
     console.log(err);
     
   }  
  
  }
}
    
  return (
    <>
    <Formik
    initialValues={formval}
    validationSchema={validationSchema}
    onSubmit={ (values,{resetForm})=>{
      if(reset){
        values.EmployeeId=SavedValues.EmployeeId;
        if(imgurl)
        {
          values.EmployeeProfilePicUrl=imgurl;
        }
    try {
      fetch("http://localhost:51992/Employees/"+SavedValues.EmployeeId,
        {
            method: "PUT",
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json'
         },
            body: JSON.stringify(values)
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
        if(imgurl)
        {
          values.EmployeeProfilePicUrl=imgurl;
          values.DateOfBirth=new Date(values.DateOfBirth).toISOString().slice(0,10);
          values.DateOfJoining=new Date(values.DateOfJoining).toISOString().slice(0,10);
        }
        
        fetch("http://localhost:51992/Employees",
          {

              method: "POST",
              headers: {
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

       <div className="form-controlc">
        <label className='adlabel' htmlFor='DateOfBirth'>Employee Date Of Birth</label>
        <Field className='adinput' type='date' format='YYYY-MM-DD' id='DateOfBirth' name='DateOfBirth'/>
        <ErrorMessage component="span" className='errordisplay' name='DateOfBirth'></ErrorMessage>
       </div>

       <div className="form-controlc">
        <label className='adlabel' htmlFor='DateOfJoining'>Employee Date Of Joining</label>
        <Field className='adinput' type='date' format='YYYY-MM-DD' id='DateOfJoining' name='DateOfJoining'/>
        <ErrorMessage component="span" className='errordisplay' name='DateOfJoining'></ErrorMessage>
       </div>
       <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeEmailId'>Employee Email Id</label>
        <Field className='adinput' type='text' id='EmployeeEmailId' name='EmployeeEmailId'/>
        <ErrorMessage component="span" className='errordisplay' name='EmployeeEmailId'></ErrorMessage>
       </div>
       <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeMobileNo'>Employee Mobile No</label>
        <Field className='adinput' type='number' id='EmployeeMobileNo' name='EmployeeMobileNo'/>
        <ErrorMessage component="span" className='errordisplay' name='EmployeeMobileNo'></ErrorMessage>
       </div>

       <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeeSalary'>Employee Salary</label>
        <Field className='adinput' type='number' id='EmployeeSalary' name='EmployeeSalary'/>
        <ErrorMessage component="span" className='errordisplay' name='EmployeeSalary'></ErrorMessage>
       </div>


       <div className="form-controlc">
        <label className='adlabel' htmlFor='EmployeePic'>Employee Profile Pic</label>
        <input className='adinput' type='file' id='EmployeePic' onChange={handlepic}/>
        <img src={imgfile} alt="" className="employeeimg"/>
        <ErrorMessage component="span" className='errordisplay' name='EmployeePic'></ErrorMessage>
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
      <th>Id</th>
      <th>Image</th>
      <th>Name</th>
      <th>Address</th>
      <th>Department</th>
      <th>Salary</th>
      <th>Date Of Birth</th>
      <th>Date Of Joining</th>
      <th>Email Id</th>
      <th>Mobile No</th>
      <th>Edit</th>
      <th>Delete</th>
  </tr>
  <tbody id="emplist">
  {
 
employeecontext.employees.map((employee,index)=>{
  let d=new Date(employee.DateOfBirth).toISOString().slice(0,10);
  let dd=new Date(employee.DateOfJoining).toISOString().slice(0,10);
      return(
       
          <tr key={index} id={'tr'+employee.EmployeeId}>
              <td><span>{employee.EmployeeId}</span></td>
              <td><p><img alt='' id={'img'+employee.EmployeeId} src={employee.EmployeeProfilePicUrl} className="employeeimg"/></p></td>
              <td><p id={'name'+employee.EmployeeId}>{employee.EmployeeName}</p></td>
              <td><p id={'address'+employee.EmployeeId}> {employee.EmployeeAddress}</p></td>
              <td><p id={'depname'+employee.EmployeeId}>{employee.EmployeeDepName}</p></td>
              <td><p id={'salary'+employee.EmployeeId}>{employee.EmployeeSalary}</p></td>
              <td><p id={'dob'+employee.EmployeeId}>{d}</p></td>
              <td><p id={'doj'+employee.EmployeeId}>{dd}</p></td>
              <td><p id={'email'+employee.EmployeeId}>{employee.EmployeeEmailId}</p></td>
              <td><p id={'mobile'+employee.EmployeeId}>{employee.EmployeeMobileNo}</p></td>
              <td><button type='button' onClick={(event)=>edit(event,employee.EmployeeId,index)}>Edit</button></td>
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
