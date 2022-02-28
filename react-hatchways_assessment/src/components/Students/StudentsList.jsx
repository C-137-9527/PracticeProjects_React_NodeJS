import React from 'react';
import classes from './StudentsList.module.css';
import Student from './Student/Student';

const StudentList = ({ students, filter }) => {
  // loop through and render list of available students
  const studentsList = students.map((student) => (
    <Student
      key={student.id}
      avatar={student.pic}
      firstName={student.firstName}
      lastName={student.lastName}
      email={student.email}
      company={student.company}
      skill={student.skill}
      grades={student.grades}
      filter={filter}
    />
  ));

  return (
    <section className={classes.studentsList}>
      {studentsList}

      {/* message is hidden behind students, only visible if all students are toggled off */}
      <h2 className={classes.noMatchMessage}>no matches found</h2>
    </section>
  );
};

export default StudentList;
