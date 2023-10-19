import { useState } from "react";
import {  useNavigate, useParams} from 'react-router-dom';
import useApiUpdate from "./updateapi";

const Update =()=>{
    


    const { item } = useParams();
    const selectedItem = JSON.parse(decodeURIComponent(item));
    const navigate = useNavigate()
    
    const [name, setname] = useState(selectedItem.name)
    const [email, setemail] = useState(selectedItem.email)
    const [gender, setgender] = useState(selectedItem.model)
    const [status, setstatus] = useState(selectedItem.status)


    const apiUrl = `https://gorest.co.in/public/v2/users/${selectedItem.id}`;
    const authToken = '9b24d96d3a87920f101218d1cb70376a5f0c51e16a1bbb836dd15a9cf2b67026';
    const { updateData, updateloading, updateerror } = useApiUpdate();

    const nameHandler=(event)=>{
        setname(event.target.value)
    }
    const emailHandler=(event)=>{
        setemail(event.target.value)
    }
   
    const submitHandler = (event) => {
        event.preventDefault(); 
        const expenseData = {
          id:selectedItem.id,  
          name: name,
          email: email,
          gender: gender,
          status:status,
        };

        updateData(apiUrl, authToken, expenseData);
        console.log(expenseData)
        setname("")
        setemail("")
        setgender("")
        setstatus("")
        setTimeout(()=>navigate("/",200),3000)

    }

    if (updateloading) {
        return <div>Loading...</div>;
      }

    
      if (updateerror) {
        return <div>Error fetching data: {updateerror.message}</div>;
      }
    
   
    return (

        <>

        <div className="main ">
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
               <div className='input3'>
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