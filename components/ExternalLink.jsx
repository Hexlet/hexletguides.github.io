import React from 'react';

const ExternalLink = ({ children, href }) => {
  const isExternal = href.startsWith('#');
  const target = isExternal ? null : '_blank';
  const rel = isExternal ? null : 'noreferrer';

  return (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  );
}

export default ExternalLink;
