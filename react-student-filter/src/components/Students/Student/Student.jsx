import React, { useState } from 'react';
import classes from './Student.module.css';
import TestScores from './TestScores/TestScores';
import Tags from './Tags/Tags';

const Student = ({
  avatar,
  firstName,
  lastName,
  email,
  company,
  skill,
  grades,
  filter,
}) => {
  // get tags from child component (Tag.jsx) for filtering
  const [getAddedTags, setGetAddedTags] = useState([]);

  // concatenate first and last name
  const fullName = firstName.toUpperCase() + ' ' + lastName.toUpperCase();

  // calculate average
  const average = grades.reduce((p, c) => +p + +c, 0) / grades.length + '%';

  // hide student by add className, initially no value
  let nameFilterClass = '';
  let tagFilterClass = '';

  // if has name filter
  if (filter.nameFilter) {
    // check if student matches, if not change className to hide Student
    if (!fullName.includes(filter.nameFilter.toUpperCase())) {
      nameFilterClass = 'hideStudent';
    }
  }

  // if has tag filter
  if (filter.tagFilter) {
    // check if student matches, if not change className to hide Student
    if (
      getAddedTags.findIndex((tag) =>
        tag.toUpperCase().includes(filter.tagFilter.toUpperCase())
      ) === -1
    ) {
      tagFilterClass = 'hideStudent';
    }
  }

  // FILTER NOTE: if the student does not match either name or tag, 'hideStudent' will be added, and the student will be hidden

  return (
    // student container
    <article
      className={`${classes.container}  ${classes[nameFilterClass]}
        ${classes[tagFilterClass]}`}
    >
      {/* avatar */}
      <img loading='lazy' src={avatar} alt='avatar' />

      {/* details */}
      <div className={classes.details}>
        <h2>{fullName}</h2>
        <p>Email: {email}</p>
        <p>Company: {company}</p>
        <p>Skill: {skill}</p>
        <p>Average: {average}</p>

        {/* test scores */}
        <TestScores grades={grades} />

        {/* tags */}
        <Tags setGetAddedTags={setGetAddedTags} />
      </div>
    </article>
  );
};

export default Student;
