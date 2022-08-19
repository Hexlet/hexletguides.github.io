import React from 'react';
import Link from 'next/link';

const Author = ({ name, url }) => {
  if (!name) {
    return null;
  }

  if (!url) {
    return <div className="fst-italic">{name}</div>;
  }

  return (
    <Link className="fst-italic" href={url}>
      {name}
    </Link>
  );
};

export default Author;
