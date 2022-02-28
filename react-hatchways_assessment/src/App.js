import React, { useState } from 'react';
import StudentsList from './components/Students/StudentsList';
import SearchBars from './components/SearchBars/SearchBars';
import StatusMessage from './components/Messages/StatusMessage';
import useHTTP from './Hooks/useHTTP';

function App() {
  // import fetch data and http status from custom hook
  const [students, isLoading, error] = useHTTP();

  // get filter from child component (SearchBar.jsx) and pass down to child component (Student.jsx)
  const [filter, setFilter] = useState({});

  // display different content to user based on different scenario, by default set to no data avaliable
  let content = <StatusMessage message='no data avaliable' />;

  // if got data back from server, render list of students
  if (students.length > 0)
    content = <StudentsList students={students} filter={filter} />;

  // if fetch fails
  if (error) content = <StatusMessage message={error} />;

  // if fetch succeeds and data is loading
  if (isLoading)
    content = <StatusMessage message='loading data from server, please wait' />;

  return (
    <div>
      {/* search input */}
      <SearchBars onFilter={setFilter} />

      {/* display different content based on sencario */}
      {content}
    </div>
  );
}

export default App;
