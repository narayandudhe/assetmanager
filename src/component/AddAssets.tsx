import React,{useState,useContext, ChangeEvent} from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {AssetManagerContext} from './NodeContext'


const today=new Date();
//validation with yup
const validationSchema=Yup.object({
  AsstsName:Yup.string().required("Asset Name is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
  AssetModel:Yup.string().required("Asset Model is Required"),
  AssetsSerialNo:Yup.string().required("Asset Serial No is Required"),
  AssetsCompanyName:Yup.string().required("Asset Company Name is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
  AssetsWarrenty:Yup.number().required("Please Enter Asset Warranty in Months"),
  AssetPrice:Yup.number().required("Please Enter Asset Price"),
})

 const initialValues={
    AssetsId:0,
    AsstsName:'',
    AssetModel:'',
    AssetsSerialNo:'',
    AssetsCompanyName:'',
    AssetAsigned:false,
    AssetPurchaseDate:today.toISOString().slice(0,10),
    AssetsWarrenty:0,
    AssetImageUrl:'',
    AssetPrice:0,
  }
 const SavedValues={
  
    AssetsId:0,
    AsstsName:'',
    AssetModel:'',
    AssetsSerialNo:'',
    AssetsCompanyName:'',
    AssetAsigned:false,
    AssetPurchaseDate:'2001-02-03',
    AssetsWarrenty:0,
    AssetImageUrl:'',
    AssetPrice:0,
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
  var e=document.getElementById('purchase'+id.toString()) as HTMLElement
  var f=document.getElementById('warranty'+id.toString()) as HTMLElement
  var g=document.getElementById('price'+id.toString()) as HTMLElement
  var h=document.getElementById('assimg'+id.toString()) as HTMLElement
  SavedValues.AssetsId=id;
  SavedValues.AsstsName=a.innerText;
  SavedValues.AssetModel= d.innerText;
  SavedValues.AssetsSerialNo=b.innerText;
  SavedValues.AssetsCompanyName=c.innerText;
  SavedValues.AssetAsigned=false;
  SavedValues.AssetsWarrenty=Number(f.innerText);
  SavedValues.AssetPurchaseDate=e.innerText;
  SavedValues.AssetPrice=Number(g.innerText);
  setImgUrl(h.getAttribute("alt")?.toString());
 
  
  setindex(index);
  setformval(SavedValues);
  setreset(true);
  
}

const handleRemoveSpecificRow = (index:number,assetid:number) => {
  try {
    fetch(assetscontext.apiurl+"/Asstes/"+assetid,
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
  const [imgurl,setImgUrl]=useState<string>();
const formdata=new FormData();

const handlepic=(e:ChangeEvent<HTMLInputElement>)=> {
  console.log(e.target.files);
  if(e.target.files?.length)
  {
    formdata.append("file",e.target.files[0]);
    //setimgfile(URL.createObjectURL(e.target.files[0]));
    try
    {
     fetch(assetscontext.apiurl+"/Asstes/1",
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
      formdata.delete("file");
     });
    }
   catch(err)
   {
     console.log(err);
     
   }  
  
  }
}
///console.log(formik.values);
  return (
    <>
    <Formik
    initialValues={formval}
    validationSchema={validationSchema}
    enableReinitialize={true}
    onSubmit={(values,{resetForm})=>{
      if(reset){
        if(imgurl){
          values.AssetImageUrl=imgurl;
          values.AssetsId=SavedValues.AssetsId;
          values.AssetPurchaseDate=new Date(values.AssetPurchaseDate).toISOString().slice(0,10);
        }
        
        try {
          fetch(assetscontext.apiurl+"/Asstes/"+SavedValues.AssetsId,
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
              console.log(data);
              
              const tempRows = [...assetscontext.assets]; // to avoid  direct state mutation
              tempRows.splice(index, 1,data);
             assetscontext.setAssets(tempRows);
            });
        } catch (err) {
          console.log(err);
        }
      }
      else{
        if(imgurl)
        {
          values.AssetImageUrl=imgurl;
          values.AssetPurchaseDate=new Date(values.AssetPurchaseDate).toISOString().slice(0,10);
        }
        try {
          fetch(assetscontext.apiurl+"/Asstes",
            {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
             },
                body: JSON.stringify(values),
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
  var a=document.getElementById("AssetImage") as HTMLInputElement
  a.value='';
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

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetsWarrenty'>Asset Waranty</label>
        <Field className='adinput' type='number' id='AssetsWarrenty' name='AssetsWarrenty' />
        <ErrorMessage component="span" className='errordisplay' name='AssetsWarrenty'></ErrorMessage>
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetPurchaseDate'>Asset Purchase Date</label>
        <Field className='adinput' type='date' id='AssetPurchaseDate' name='AssetPurchaseDate' />
        <ErrorMessage component="span" className='errordisplay' name='AssetPurchaseDate'></ErrorMessage>
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetPrice'>Asset Price</label>
        <Field className='adinput' type='number' id='AssetPrice' name='AssetPrice' />
        <ErrorMessage component="span" className='errordisplay' name='AssetPrice'></ErrorMessage>
        </div>

        <div className="form-controlc">
        <label className='adlabel' htmlFor='AssetImage'>Asset Image</label>
        <Field className='adinput' accept='image/*' type='file' id='AssetImage' name='AssetImage' onChange={handlepic} />
        <ErrorMessage component="span" className='errordisplay' name='AssetImage'></ErrorMessage>
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
        <th>Id</th>
        <th>Name</th>
        <th>Image</th>
        <th>Serial No</th>
        <th>Company Name</th>
        <th>Model</th>
        <th>Purchase Date</th>
        <th>Warrenty<sup>in Months</sup></th>
        <th>Price</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>
    </thead>
    <tbody id='addass'>
   
    {

assetscontext.assets.map((assets,index)=>{
  let d=new Date(assets.AssetPurchaseDate).toISOString().slice(0,10);
        return(
          
            <tr key={index} id={"aa"+assets.AssetsId}>
                <td key={assets.AssetsId}><span>{assets.AssetsId}</span></td>
               
                <td><p id={'name'+assets.AssetsId}>{assets.AsstsName}</p></td>
                <td><img  className='employeeimg' id={'assimg'+assets.AssetsId} src={assetscontext.apiurl+"/AImage/"+assets.AssetImageUrl} alt={assets.AssetImageUrl}/></td>
                <td><p id={'serial'+assets.AssetsId}> {assets.AssetsSerialNo}</p></td>
                <td><p id={'company'+assets.AssetsId}>{assets.AssetsCompanyName}</p></td>
                <td><p id={'model'+assets.AssetsId}>{assets.AssetModel}</p></td>
                <td><p id={'purchase'+assets.AssetsId}>{d}</p></td>
                <td><p id={'warranty'+assets.AssetsId}>{assets.AssetsWarrenty}</p></td>
                <td><p id={'price'+assets.AssetsId}>{assets.AssetPrice}</p></td>
                <td><button id={"edit"+assets.AssetsId} onClick={(event)=>abe(event,assets.AssetsId,index)}>Edit</button></td>
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
