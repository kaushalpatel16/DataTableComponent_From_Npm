import { useState } from "react";


const useApiUpdate = () => {
    const [updateloading, setLoading] = useState(false);
    const [updateerror, setError] = useState(null);
  
    const updateData = async (url, authToken, updatedData) => {

      try {
        setLoading(true);
        setError(null);
        console.log(updatedData);
        const response = await fetch(url, {
          method: 'PUT', // Use the appropriate HTTP method (e.g., PUT or PATCH)
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(updatedData),
       
        });
         
        if (!response.ok) {
          const errorMessage = `Failed to update data (Status: ${response.status})`;
          console.log(errorMessage);
          throw new Error(errorMessage);
        }
  
        // Update request was successful
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    return {
      updateData,
      updateloading,
      updateerror,
    };
  };
  
  export default useApiUpdate;
  