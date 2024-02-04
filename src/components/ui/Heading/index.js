import React from 'react';
import clsx from 'clsx';
// import PropTypes from 'prop-types';


const Heading = ({ level, className, children }) => {
  const HeadingTag = `h${level}`;
 

  return (
    <HeadingTag 
        className={clsx(
            className,

        )}
    >
        {children}
    </HeadingTag>
  )
};

// Heading.propTypes = {
//   level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
//   text: PropTypes.string.isRequired,
//   className: PropTypes.string,
// };

export default Heading;