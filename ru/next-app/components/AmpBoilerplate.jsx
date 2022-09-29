import React from 'react';

// inject AMP directly because Next.js supports only css-in-js from AMP
import ampCSS from '!!raw-loader!sass-loader!../styles/amp.scss';
import boilerplaceCSS from '!!raw-loader!../styles/amp-boilerplate.css';
import boilerplaceNoScriptCSS from '!!raw-loader!../styles/amp-boilerplate-noscript.css';

// Add some render delaying extension to disable removing amp-boilerplate by apm-html-optimizer
// @see https://github.com/ampproject/amp-toolbox/blob/678c0e2e5c850f0de538d5e642558a1e678054c9/packages/optimizer/lib/transformers/ServerSideRendering.js#L125-L131
const AmpBoilerplate = () => (
  <>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <script
      async
      custom-element="amp-dynamic-css-classes"
      src="https://cdn.ampproject.org/v0/amp-dynamic-css-classes-0.1.js"
    ></script>
    <style amp-boilerplate="true" dangerouslySetInnerHTML={{ __html: boilerplaceCSS }}></style>
    <noscript>
      <style amp-boilerplate="true" dangerouslySetInnerHTML={{ __html: boilerplaceNoScriptCSS }}></style>
    </noscript>
    <style amp-custom="true" dangerouslySetInnerHTML={{ __html: ampCSS }}></style>
  </>
);

export default AmpBoilerplate;
