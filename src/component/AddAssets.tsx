import React,{useState,useContext} from 'react'
import {useFormik} from 'formik'
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

  // function updatechanges(a:List_asset[])
  // {
  //   var aa=document.getElementById("addass") as HTMLElement
  //   var data="";
  //   a.forEach(function (value) {  
  //    data="<tr key="+value.AssetsId+" id='aa'+"+value.AssetsId+">";
  //    data+="<td key="+value.AssetsId+"><span>"+value.AssetsId+"</span></td>";
  //    data+=" <td><p id='name'+"+value.AssetsId+">"+value.AsstsName+"</p></td>";
  //    data+="<td><p id='serial'+"+value.AssetsId+">"+value.AssetsSerialNo+"</p></td>";
  //    data+="<td><p id='company'+"+value.AssetsId+">"+value.AssetsCompanyName+"</p></td>";
  //    data+="<td><p id='model'+"+value.AssetsId+">"+value.AssetModel+"</p></td>";
  //    data+="<td><button id='edit"+value.AssetsId+"' onClick={(event)=>abe(event,"+value.AssetsId+")}>Edit</button></td>";
  //    data+="<td><button onClick={(event)=>handleclickDelete(event,"+value.AssetsId+")}>Delete</button></td>";
  //    data+="</tr>";
  //   });  
  //  aa.innerHTML=data;
  // }

function AddAssets() {
  //implement assets context
  const assetscontext=useContext(AssetManagerContext);

 


const abe=(event:React.MouseEvent<HTMLButtonElement>,id:number)=>{
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

  setformval(SavedValues);
  setreset(true);
  
}

const handleRemoveSpecificRow = (index:number) => {
  console.log("deleted");
  
  const tempRows = [...assetscontext.assets]; // to avoid  direct state mutation
  tempRows.splice(index, 1);
  assetscontext.setAssets(tempRows);
  formik.resetForm({});
setformval(initialValues);
setreset(false);
setbuttonname("Add Assets");  
};

const resetform=()=>{
  formik.resetForm();
}
const [reset, setreset] = useState(false);
  const [formval, setformval] = useState(initialValues);
  const [buttonname, setbuttonname] = useState("Add Assets");
 const formik=useFormik({ 
  initialValues:formval,
  onSubmit:values=>{
    if(reset){
      //Find index of specific object using findIndex method.    
var objIndex = assetscontext.assets.findIndex((obj => obj.AssetsId === SavedValues.AssetsId));

//Log object to Console.
//console.log("Before update: ", List_assetss[objIndex]);

//Update object's name property.
assetscontext.assets[objIndex].AssetModel=values.AssetModel;
assetscontext.assets[objIndex].AssetsCompanyName=values.AssetsCompanyName;
assetscontext.assets[objIndex].AssetsSerialNo=values.AssetsSerialNo;
assetscontext.assets[objIndex].AsstsName=values.AsstsName;
assetscontext.assets[objIndex].AssetAsigned=false;
//Log object to console again.
//console.log("After update: ", values)

    }
    else{
      values.AssetsId=assetscontext.assetsidd();
      values.AssetAsigned=false;
      //let a=assetsid+1;
      ///setassetsid(a);

      assetscontext.setAssets([...assetscontext.assets,values]);
      //assetscontext.assets.push(values);
     // updatechanges(assetscontext.assets);
    }
    
formik.resetForm({});
setformval(initialValues);
setreset(false);
setbuttonname("Add Assets");  
  },
  validationSchema,
  enableReinitialize:true
  
 })
///console.log(formik.values);
  return (
    <>
    <div className='form-control'>
      <form onSubmit={formik.handleSubmit}>
        
        <div className="form-controlc">
        <label className='adlabel' htmlFor='AsstsName'>Asstes Name</label>
        <input  className='adinput' type='text' id='AsstsName' name='AsstsName' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.AsstsName}/>
        {formik.touched.AsstsName && formik.errors.AsstsName? <div className='errordisplay'>{formik.errors.AsstsName}</div>:null}
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetModel'>Asstes Model</label>
        <input className='adinput' type='text' id='AssetModel' name='AssetModel' onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.AssetModel}/>
        {formik.touched.AssetModel && formik.errors.AssetModel? <div className='errordisplay'>{formik.errors.AssetModel}</div>:null}
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetsSerialNo'>Asstes Serial No.</label>
        <input className='adinput' type='text' id='AssetsSerialNo' name='AssetsSerialNo' onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.AssetsSerialNo}/>
        {formik.touched.AssetsSerialNo && formik.errors.AssetsSerialNo? <div className='errordisplay'>{formik.errors.AssetsSerialNo}</div>:null}
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetsCompanyName'>Asstes Company Name</label>
        <input className='adinput' type='text' id='AssetsCompanyName' name='AssetsCompanyName' onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.AssetsCompanyName}/>
        {formik.touched.AssetsCompanyName && formik.errors.AssetsCompanyName? <div className='errordisplay'>{formik.errors.AssetsCompanyName}</div>:null}
        </div>

       

        <button  className='submitform' type='submit'>{buttonname}</button>
        <button className='submitform' onClick={resetform}>Reset</button>
       </form>
    </div>
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
                <td><button id={"edit"+assets.AssetsId.toString()} onClick={(event)=>abe(event,assets.AssetsId)}>Edit</button></td>
                <td><button onClick={(event)=>handleRemoveSpecificRow(index)}>Delete</button></td>
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

// function AssetsList(){
//     //implement assets context
//     const assetscontext=useContext(AssetManagerContext);
//     const handleclickDelete=(event:React.MouseEvent<HTMLButtonElement>,id:number):void=>{
//       // var a=document.getElementById("aa"+id.toString());
//       const asssetdata=assetscontext.assets;
//       asssetdata.splice(assetscontext.assets.findIndex(a => a.AssetsId === id) , 1);
//       assetscontext.setAssets(asssetdata);
//      //  a?.remove();
//    <AssetsList></AssetsList>
//       console.log("deleted");
      
      
//      }
    
// return(
 
// )
// }

export default AddAssets
