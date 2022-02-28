import { useState, useEffect } from 'react';

// students api
const studentsAPI = 'https://api.hatchways.io/assessment/students';

const useHTTP = () => {
  // store and update data from api
  const [students, setStudents] = useState([]);

  // store and update loading status
  const [isLoading, setIsLoading] = useState(false);

  // store and update error message
  const [error, setError] = useState(false);

  // fetch data from api
  const fetchStudents = async () => {
    try {
      const res = await fetch(studentsAPI);

      // handle failed status code
      if (!res.ok) {
        throw new Error('something went wrong, please try again later');
      }

      // update loading status
      setIsLoading(true);

      const data = await res.json();

      // update students data
      setStudents(data.students);
    } catch (error) {
      // update error message
      setError(error.message);
    }

    setIsLoading(false);
  };

  // call fetch data at page load
  useEffect(() => {
    fetchStudents();
  }, []);

  return [students, isLoading, error];
};

export default useHTTP;
