import React from 'react';

const AmpAnalytics = ({ type, config }) => (
  <amp-analytics type={type}>
    <script
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(config),
      }}
    />
  </amp-analytics>
);

export default AmpAnalytics;
