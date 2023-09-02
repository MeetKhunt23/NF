import React, { useEffect, useState,useRef } from "react";
import $ from "jquery"
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import sha512 from "js-sha512"
import Constance from "../constants/Constance";
import "./addvehical.css"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const Addvehical = () => {
  const user_id = localStorage.getItem("user_id")
  const [genralData,setGenraldata] = useState({})
  const [bikebrands,setbikebrands] = useState([])
  const [bikemodels,setbikemodels] = useState([])
  const [carbrands,setcarbrands] = useState([])
  const [carmodels,setcarmodels] = useState([])
  const [title,settitle] = useState('')
  const [condition,setcondition] = useState('')
  const [vehicle_type,setvehicle_type] = useState('')
  const [year,setyear] = useState('')
  const [brand,setbrand] = useState('')
  console.log("brand",brand);
  const [models,setmodels] = useState('')
  const [prices,setprice] = useState('')
  const [feature,setfeature] = useState('')
  const [description,setdescription] = useState('')
  const [vehicle_image,setvehicle_image] = useState(null)
  console.log("image",vehicle_image);
  const [featurelist,setfeaturelist] = useState([])
  const [features,setfeatures] = useState([])
  const [oldfeatures,setoldfeatures] = useState([])
  const [modelsnamecar,setmodelsnamecar] = useState([])
  const [modelsnamebike,setmodelsnamebike] = useState([])
  const [addedvehicle,setaddedvehicle] = useState({})
  const [multipleimage,setmultipleimage] = ('')
  const inputRef = useRef(null);
  const {id,price,plan_type} = useParams()
  console.log("id",id,price,plan_type);


  const addfeatures = () =>{
  //   let obj = {}
  //   obj['value'] = features
  //   console.log("0",obj);
    features.push(feature)
    setfeature('')
    document.getElementById("features").value = ""
  }

  const Generaldata = () =>{

if(!carbrands.length){
    fetch(Constance.baseUrl + 'vehicles/general_data_list', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
      },
  }).then(response => {
      response.json().then(json => {
          console.log("res", json);
          if (json.success === "yes") {
            setGenraldata(json.data) 
            json.data.car_brands.map((carrow)=>{
              carbrands.push({id : carrow.id,brand_name : carrow.brand_name,type : carrow.type})
              
               carrow.models.map((carm)=>{
                  carmodels.push({id : carm.id,name : carm.model_name})
               })
               console.log("carm",carmodels);
            })
           
          } else {
              NotificationManager.error('Error', (json.message), 3000);
          }
      });
  }).catch(err => err);
}
  }

  const Generaldatabike = () =>{
 
    if(!bikebrands.length){

    fetch(Constance.baseUrl + 'vehicles/general_data_list', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
      },
  }).then(response => {

      response.json().then(json => {
          console.log("res", json);
          if (json.success === "yes") {
            setGenraldata(json.data) 
            json.data.bike_brands.map((row)=>{
              bikebrands.push({id : row.id,brand_name : row.brand_name,type : row.type})

               row.models.map((model)=>{
                 bikemodels.push({id : model.id,name : model.model_name})
             })

            })
            console.log("bikem",bikemodels);

           
          } else {
              NotificationManager.error('Error', (json.message), 3000);
          }
      });
  }).catch(err => err);
}
  }
  const getFeatures = () =>{
    let dataobj = {}
    // const type = vehicle_type == "bike" ? "2" : "1"
    // console.log("type",type);
    dataobj['type'] = vehicle_type == "bike" ? "2" : "1"
    const data = JSON.stringify(dataobj)
    
    fetch(Constance.baseUrl + 'vehicles/features_list', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
      },
      body : data
  }).then(response => {

      response.json().then(json => {
          console.log("res", json);
          if (json.success === "yes") {
            setfeaturelist(json.data) 
          } else {
              NotificationManager.error('Error', (json.message), 3000);
          }
      });
  }).catch(err => err);
  }

  useEffect(()=>{
     getFeatures()
  },[])

  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const handleDelete = (index) =>{
    const dele = [...feature]
    dele.splice(index,1)
    setfeature(dele)
  }

  const handlechange = (e) =>{
    const checked = e.target.checked
    const checkedvalue = e.target.value
   
    if(checked){
       oldfeatures.push(e.target.value)
        
    }
    else{
     oldfeatures.map((row,index)=>{
        if(row === checkedvalue){  
          const sp = [...oldfeatures]
          const de = sp.splice(index,1)
          console.log("splice",de);
          const arr = []
          oldfeatures.map((pro)=>{
            if(pro != de){
               arr.push(pro)
               setoldfeatures(arr)
              }
          })
          // setoldfeatures(de)
        }
     })

    }
  } 

  const Sellvehicle = (e) =>{
    e.preventDefault()
   const oldf =  oldfeatures.join(',')
   const f = features.join(',')
   
   let dataObj = {};
    dataObj['user_id']=user_id
    dataObj['title']=title
    dataObj['condition']=condition
    dataObj['year']=year
    dataObj['latitude']="20.12548796"
    dataObj['longitude']="70.23548713"
    dataObj['brand_id']=brand
    dataObj['model_id']=models
    dataObj['price']=prices
    dataObj['description']=description
    dataObj['features_id']=oldf
    dataObj['features_new']=f
    dataObj['mode']="add"
    dataObj['vehicle_id']=""
    dataObj['vehicle_type']=vehicle_type === "car" ? "1" : "2"
    dataObj['plan_amount']=price == 0 ? "Unlimited" : price
    dataObj['transaction_id']=""
    dataObj['plan_type']=plan_type
    dataObj['currency']="AED"
    dataObj['package_id']=id
    dataObj['address']="indira circle"
    console.log("object",dataObj);
   
   const data = JSON.stringify(dataObj);

   fetch(Constance.baseUrl + 'vehicles/add_vehicles',{
    method: 'POST',
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
    },
    // body : data
}).then(response => {

    response.json().then(json => {
        console.log("res", json);
        if (json.success === "yes") {
          setaddedvehicle(json.data)
          NotificationManager.success('success', (json.message), 3000);
          const formdata = new FormData()
          formdata.append("vehicle_id",json.data.vehicle_id)
         
            formdata.append('vehicle_image',vehicle_image)
          
        
         
          fetch(Constance.baseUrl + 'vehicles/addVehicleImage', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'multipart/form-data',
            },
            body : formdata
        }).then(response => {
        
            response.json().then(json => {
                console.log("res", json);
                if (json.success === "yes") {
                  NotificationManager.success('success', (json.message), 3000);
                } else {
                    NotificationManager.error('Error', (json.message), 3000);
                }
            })
          })
        
        } else {
            NotificationManager.error('Error', (json.message), 3000);
        }
    })
}).catch(err => err);

}
  const selectModel = () =>{
   
    fetch(Constance.baseUrl + 'vehicles/general_data_list', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
      },
  }).then(response => {
      
      response.json().then(json => {
          console.log("res", json);
         
          if (json.success === "yes") {
             var model = json?.data
             console.log("mod",model);
           
             model.brands.map((row)=>{
               if(row.id == brand){
              
                 row.models.map((model)=>{
                 const car = [...modelsnamecar]
                 car.push(model)
                 setmodelsnamecar(car)
                 }) 
               }
              })
              console.log("car",modelsnamecar);
            
             
              model.brands.map((row)=>{
                if(row.id == brand){
                  row.models.map((model)=>{
                    const bike = [...modelsnamebike]
                    bike.push(model)
                    setmodelsnamebike(bike)
                  }) 
                }
               })
               console.log("bike",modelsnamebike);
             
          } else {
              NotificationManager.error('Error', (json.message), 3000);
          }
      })
  }).catch(err => err);
  }

  const changeBrand = (e) =>{
    setmodelsnamebike([])
    setmodelsnamecar([])
    setbrand(e.target.value)
  }

useEffect(()=>{
  selectModel()
},[brand])

  return (
    <>
      <div className="body">
        <div style={{display : "flex",justifyContent : "center"}}>
        <div class="addmain_div">
          <div class="title">Add Your Vehicle</div>
          <form action="#" id="emailform">
            <div>
              <label>Title</label><br />
              <input type="email" id="email" placeholder="Title" className="titall" name="email" onChange={(e)=>settitle(e.target.value)} required />
            </div>
            <br />
            <div className="radiobuttons my-3">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <label className="radiolabel">Condition</label><br/>
                <input type="radio" id="specifyColor" className="radio" name="fav_language" value="0" onChange={(e)=>setcondition(e.target.value)} />&nbsp;
                <label for="html">New</label>&nbsp;
                <input type="radio" id="specifyColor" className="radio" name="fav_language" value="1" onChange={(e)=>setcondition(e.target.value)} />&nbsp;
                <label for="css">Used</label><br />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <label className="radiolabel">Vehical Type</label><br />
                <input type="radio" id="VehicalColor" className="radio" name="VehicalColor" value="car" onChange={(e)=>setvehicle_type(e.target.value)} onClick={()=>Generaldata()}/>&nbsp;
                <label for="html">Car</label>&nbsp;
                <input type="radio" id="VehicalColor" className="radio" name="VehicalColor" value="bike" onChange={(e)=>setvehicle_type(e.target.value)} onClick={()=>Generaldatabike()} />&nbsp;
                <label for="css">Bike</label><br/>
              </div>
            </div>

            <div className="yearbrandselect">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <label for="cars">Year</label><br />
                <select name="cars" id="cars" className="selectcars" onChange={(e) => setyear(e.target.value)}>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <label for="brand">Brand</label><br />
                <select name="brand" id="brand" className="selectbrand" onClick={()=> selectModel()} onChange={(e) => changeBrand(e)}>
                  {
                    (vehicle_type === "car") ?
                    carbrands.map((row,index)=>{
                      return (
                        <>
                      <option value={row.id}>{row.brand_name}</option>
                      </>
                      )
                   })
                  :
                  bikebrands.map((row,index)=>{
                    return <option value={row.id}>{row.brand_name}</option>
                 })
                  } 
                </select>
              </div>
            </div>
            <div className="modelprice my-3">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <label for="model">Model</label><br />
                <select name="model" id="model" className="selectbrand" onChange={(e) => setmodels(e.target.value)}>
                  <option>select model</option>
                {
                   (Array.isArray && (modelsnamecar || modelsnamebike )).map((row,index)=>{
                      return <option value={row.id}>{row.model_name}</option>
                   })
                }
                </select>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <label for="model">Price</label><br />
                <input type="number" id="reminder-password" className="selectbrand" name="password" onChange={(e) => setprice(e.target.value)}/>
              </div>
            </div>
            <div>
              
            <div style={{ marginTop: "30px" }}>
              <label>Feature</label><br />
              <input type="text" name="password" id="features" className="feature" required onChange={(e)=>setfeature(e.target.value)} />
              {
              features.map((row,index)=>{
                return (
                  <div>
                  {row}
                  </div>
       // <ListItem key={index}>
                  //   <Chip
                  //     label={row}
                  //     onDelete={handleDelete(index)}
                  //   />
                  // </ListItem>
                );
              })
            }
            </div>
            <div className="addbuttonvehicle">
              <button className="add" onClick={() => addfeatures()}>Add</button>
            </div>
            </div>
            <div style={{ marginTop:"30px"}}>
            {featurelist.map((row,index)=>{
              return(
              <>
              <input type="checkbox" id="vehicle1" name="features"  value={row.id} onChange={(e)=>handlechange(e)} /> &nbsp;
              <label for="vehicle1">{row.feature_name}</label>&nbsp;&nbsp;
              </>
              )
            })}
            </div>
            <div >
              <label for="w3review">Description</label><br/>
              <textarea id="w3review" className="textarea" name="w3review" rows="4" cols="50" onChange={(e)=>setdescription(e.target.value)}>
              </textarea>
            </div>
            <div className="uploadimage">
              <input type="file" style={{display:"none"}}   name="vehicle_image"  ref={inputRef} accept="image/*" onChange={(e)=>setvehicle_image(e.target.files)} multiple/>
              <AddAPhotoIcon className="uploadicon" onClick={()=>inputRef.current.click()}/>&nbsp;
              <span className="uploadtext">Upload Images</span>
            </div><br/>
            <div style={{textAlign : "center"}}>
              <button onClick={(e)=>Sellvehicle(e)} className="sellvehiclebtn">Sell Your Vehicle</button>
            </div>
          </form>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </>
  )
}

export default Addvehical