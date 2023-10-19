import { useState, useEffect } from 'react';

const useAddDataToAPI = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addData = async (dataToAdd) => {
    setIsLoading(true);
    console.log(dataToAdd);
    
    const apiUrl = "https://gorest.co.in/public/v2/users";
    const authToken = '9b24d96d3a87920f101218d1cb70376a5f0c51e16a1bbb836dd15a9cf2b67026';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(dataToAdd),
      });

      if (!response.ok) {
        throw new Error('Failed to add data');
      }

      const responseData = await response.json();
      setResponse(responseData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, addData };
};

export default useAddDataToAPI;
