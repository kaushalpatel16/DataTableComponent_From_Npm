import { useState } from "react";
import {  useNavigate, useParams} from 'react-router-dom';


import './update.css'; 
import { useApi } from "./fetchapi";
const Update =()=>{
    
    const { item } = useParams();
    const selectedItem = JSON.parse(decodeURIComponent(item));
    const navigate = useNavigate()
    
    const [name, setname] = useState(selectedItem.name)
    const [email, setemail] = useState(selectedItem.email)
    const [gender, setgender] = useState(selectedItem.model)
    const [status, setstatus] = useState(selectedItem.status)



    const { updateData, updateloading, updateerror } = useApi();

    const nameHandler=(event)=>{
        setname(event.target.value)
    }
    const emailHandler=(event)=>{
        setemail(event.target.value)
    }
   
    const submitHandler = (event) => {
        event.preventDefault(); 
        let iid=selectedItem.id;
        console.log(iid);

        const expenseData = {
          id:selectedItem.id,  
          name: name,
          email: email,
          gender: gender,
          status:status,
        };

        updateData(iid,expenseData);
        console.log(expenseData)
        setname("")
        setemail("")
        setgender("")
        setstatus("")

        if (updateloading) {
            return <div>Loading...</div>;
        }
        if (updateerror) {
            console.log(updateerror.message);
            return <div>Error fetching data: {updateerror.message}</div>;
            
        }
        if(!updateloading)
        {
        setTimeout(()=>navigate("/",200))
        }

    }

   
   
    return (

        <>

        <div className="main ">
        <div class="zoom-in-container">
        <p class="zoom-in-text "><h1 class="gradient-text">Update Data Here</h1></p>
        </div>
        
        
        <form onSubmit={submitHandler}>
            <div className="input">
               <div className='input1'>
                   <label>name   :</label>
                   <input type="text" defaultValue={name } className="text" onChange={nameHandler}/>
               </div>
               <div className='input2'>
                   <label>email   :</label>
                   <input type="email"  defaultValue={email} className="num" onChange={emailHandler}/>
               </div>
               <div className='input4'>
                   <select 
                   value={gender} onChange={(event)=>{
                    setgender(event.target.value);
                   }}>
                       <option value="male">Male</option>
                       <option value="female">Female</option>
                       <option value="other">Other</option>
                   </select>
                   
               </div>
               <div className='input4'>
               <select 
                   value={status} onChange={(event)=>{
                    setstatus(event.target.value);
                   }}>
                       <option value="active">Active</option>
                       <option value="inactive">UnActive</option>
                   </select>
                  
               </div>
            </div>
            <div className='input4'>
         
                    <button className="btn btn-primary">Update</button>
                
            </div>
        </form>
        </div>
        </>
     

       
      
    );
}
export default Update;