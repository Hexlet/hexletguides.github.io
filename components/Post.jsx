import React from 'react';
import Link from 'next/link';

const Post = ({ name, header, summary, href }) => (
  <div className="card">
    <div className="card-block">
      <div className="card-title h4 serif-font">
        <Link key={name} href={href}>
          {header}
        </Link>
      </div>
      <p className="card-text text-muted">{summary}</p>
    </div>
  </div>
);

export default Post;
