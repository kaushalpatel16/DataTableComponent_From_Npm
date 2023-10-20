import { useState, useEffect } from "react";

export const  useApi=(apiUrl, initialData)=> {
     // Read Data state
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete Data state
  const [deleteloading, setDeleteLoading] = useState(false);
  const [deleteerror, setDeleteError] = useState(null);

  // Add Data state
  const [response, setResponse] = useState(null);
  const [adderror, setAddError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update Data state
  const [updateloading, setUpdateLoading] = useState(false);
  const [updateerror, setUpdateError] = useState(null);



    //----------------------------------------(((Read Data)))-------------------------- 
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setData(jsonData);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
    useEffect(() => {
      fetchData();
    }, [apiUrl]);
  
    

    //----------------------------------------(((delete Data)))-------------------------- 

  const deleteData = async (url, authToken) => {

      try {
        setDeleteLoading(true);
        setDeleteError(null);
          const response = await fetch(url, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authToken}`,
              },
          });
  
          if (!response.ok) {
              const errorMessage = `Failed to delete data (Status: ${response.status})`;
              throw new Error(errorMessage);
          }
          
          // Call the fetchData function that was passed as an argument
          fetchData();
          setDeleteLoading(false);
      }  catch (error) {
        setDeleteError(error);
        setDeleteLoading(false);
      }
      
  };



    //----------------------------------------(((Add Data)))-------------------------- 



  const addData = async (dataToAdd) => {
    setIsLoading(true);   
     console.log("add data")
    console.log(dataToAdd);
    
    const apiUrlll = "https://gorest.co.in/public/v2/users";
    const authTokennn = '9b24d96d3a87920f101218d1cb70376a5f0c51e16a1bbb836dd15a9cf2b67026';
    
    try {
      const response = await fetch(apiUrlll, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokennn}`,
        },
        body: JSON.stringify(dataToAdd),
      });

      if (!response.ok) {
        throw new Error('Failed to add data');
      }

      const responseData = await response.json();
      fetchData()
      setResponse(responseData);
    } catch (err) {
      setAddError(err);
    } finally {
      setIsLoading(false);
    }
  };



    //----------------------------------------(((update Data)))-------------------------- 



  const updateData = async (id,updatedData) => {

    try {
      setUpdateLoading(true);
      setUpdateError(null);
      console.log("update request");
      console.log(updatedData);

      const updateapiUrl = `https://gorest.co.in/public/v2/users/${id}`;
      const updateauthToken = '9b24d96d3a87920f101218d1cb70376a5f0c51e16a1bbb836dd15a9cf2b67026';
      const response = await fetch(updateapiUrl, {
        method: 'PUT', // Use the appropriate HTTP method (e.g., PUT or PATCH)
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${updateauthToken}`,
        },
        body: JSON.stringify(updatedData),
     
      });
       
      if (!response.ok) {
        const errorMessage = `Failed to update data (Status: ${response.status})`;
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      // Update request was successful
      fetchData()
      setUpdateLoading(false);
    } catch (error) {
      setUpdateError(error);
      setUpdateLoading(false);
    }
  };



  return { 
    // Read Data
    data, loading, error, 
    // delete data
    deleteData, deleteloading, deleteerror,
    // add data
    response, adderror, isLoading, addData, 
    //update data
    updateData, updateloading, updateerror,
    };
}








