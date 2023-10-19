import { useState, useEffect } from "react";

function useApi(apiUrl, initialData) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
  
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
  

      fetchData();
    }, [apiUrl]);
  
    return { data, loading, error };
}

export default useApi;
