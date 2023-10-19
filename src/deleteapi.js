import { useState } from 'react';

const useApiDelete = () => {
  const [deleteloading, setLoading] = useState(false);
  const [deleteerror, setError] = useState(null);

  const deleteData = async (url, authToken) => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Include your authorization token here
        },
      });
  
      if (!response.ok) {
        const errorMessage = `Failed to delete data (Status: ${response.status})`;
        throw new Error(errorMessage);
      }
  
      // Delete request was successful
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  

  return {
    deleteData,
    deleteloading,
    deleteerror,
  };
};

export default useApiDelete;



