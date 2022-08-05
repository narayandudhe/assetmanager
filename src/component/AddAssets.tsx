import React,{useState,useContext} from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {AssetManagerContext} from './NodeContext'



//validation with yup
const validationSchema=Yup.object({
  AsstsName:Yup.string().required("Asset Name is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
  AssetModel:Yup.string().required("Asset Model is Required"),
  AssetsSerialNo:Yup.string().required("Asset Serial No is Required"),
  AssetsCompanyName:Yup.string().required("Asset Company Name is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
})

 const initialValues={
    AssetsId:0,
    AsstsName:'',
    AssetModel:'',
    AssetsSerialNo:'',
    AssetsCompanyName:'',
    AssetAsigned:false
  }
 const SavedValues={
  
    AssetsId:0,
    AsstsName:'',
    AssetModel:'',
    AssetsSerialNo:'',
    AssetsCompanyName:'',
    AssetAsigned:false
  }

function AddAssets() {
  //implement assets context
  const assetscontext=useContext(AssetManagerContext);

 

  const resetformm=()=>{
    setformval(initialValues);
  setreset(false);
  setbuttonname("Add Asset"); 
  }
const abe=(event:React.MouseEvent<HTMLButtonElement>,id:number,index:number)=>{
  setbuttonname("Update Assets");
  var a=document.getElementById('name'+id.toString()) as HTMLElement
  var b=document.getElementById('serial'+id.toString()) as HTMLElement
  var c=document.getElementById('company'+id.toString()) as HTMLElement
  var d=document.getElementById('model'+id.toString()) as HTMLElement
  SavedValues.AssetsId=id;
  SavedValues.AsstsName=a.innerText;
  SavedValues.AssetModel= d.innerText;
  SavedValues.AssetsSerialNo=b.innerText;
  SavedValues.AssetsCompanyName=c.innerText;
  SavedValues.AssetAsigned=false;
  setindex(index);
  setformval(SavedValues);
  setreset(true);
  
}

const handleRemoveSpecificRow = (index:number,assetid:number) => {
  try {
    fetch("http://localhost:51992/Asstes/"+assetid,
      {
          method: "DELETE",
        
      }).
      then(response => {
        if(response.status===200)
        {
          setformval(initialValues);
          setreset(false);
          setbuttonname("Add Employee"); 
          const tempRows = [...assetscontext.assets]; // to avoid  direct state mutation
          tempRows.splice(index, 1);
          assetscontext.setAssets(tempRows);
          
        }
      })
     
  } catch (err) {
    console.log(err);
  }
};

const [reset, setreset] = useState(false);
  const [formval, setformval] = useState(initialValues);
  const [buttonname, setbuttonname] = useState("Add Assets");
  const [index, setindex] = useState(0);
///console.log(formik.values);
  return (
    <>
    <Formik
    initialValues={formval}
    validationSchema={validationSchema}
    enableReinitialize={true}
    onSubmit={(values,{resetForm})=>{
      if(reset){
        try {
          fetch("http://localhost:51992/Asstes/"+SavedValues.AssetsId,
            {
                method: "PUT",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
             },
                body: JSON.stringify({
                  AssetsId:SavedValues.AssetsId,
                  AsstsName: values.AsstsName,
                  AssetsCompanyName: values.AssetsCompanyName,
                  AssetModel: values.AssetModel,
                  AssetAsigned:values.AssetAsigned,
                  AssetsSerialNo:values.AssetsSerialNo
                })
            }).
            then(response => response.json())
            .then(data => {
              const tempRows = [...assetscontext.assets]; // to avoid  direct state mutation
              tempRows.splice(index, 1,data);
             assetscontext.setAssets(tempRows);
            });
        } catch (err) {
          console.log(err);
        }
      }
      else{
        try {
          fetch("http://localhost:51992/Asstes",
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
              assetscontext.setAssets([...assetscontext.assets,data]);
            });
        } catch (err) {
          console.log(err);
        }
      }
      
  resetForm({});
  setformval(initialValues);
  setreset(false);
  setbuttonname("Add Assets");  
    }}>
    <div className='form-control'>
      <Form>
        
        <div className="form-controlc">
        <label className='adlabel' htmlFor='AsstsName'>Asstes Name</label>
        <Field  className='adinput' type='text' id='AsstsName' name='AsstsName'/>
        <ErrorMessage component="span" className='errordisplay' name='AsstsName'></ErrorMessage>
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetModel'>Asstes Model</label>
        <Field className='adinput' type='text' id='AssetModel' name='AssetModel'/>
        <ErrorMessage component="span" className='errordisplay' name='AssetModel'></ErrorMessage>
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetsSerialNo'>Asstes Serial No.</label>
        <Field className='adinput' type='text' id='AssetsSerialNo' name='AssetsSerialNo'/>
        <ErrorMessage component="span" className='errordisplay' name='AssetsSerialNo'></ErrorMessage>
         </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetsCompanyName'>Asstes Company Name</label>
        <Field className='adinput' type='text' id='AssetsCompanyName' name='AssetsCompanyName' />
        <ErrorMessage component="span" className='errordisplay' name='AssetsCompanyName'></ErrorMessage>
        </div>

       

        <button  className='submitform' type='submit'>{buttonname}</button>
        <button type='reset' className='submitform' onClick={resetformm}>Reset</button>
       </Form>
    </div>
    </Formik>
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
                <td><button id={"edit"+assets.AssetsId.toString()} onClick={(event)=>abe(event,assets.AssetsId,index)}>Edit</button></td>
                <td><button onClick={(event)=>handleRemoveSpecificRow(index,assets.AssetsId)}>Delete</button></td>
            </tr>
        )
        
    })
    
    }
     </tbody>

  </table>
      
      </div>
    </>
  )
}
export default AddAssets
