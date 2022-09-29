import React from 'react';
import Head from 'next/head';

import cfg from '../data/config.js';
import AmpAnalytics from './AmpAnalytics.jsx';
import AmpBoilerplate from './AmpBoilerplate.jsx';

const gtagConfig = {
  vars: {
    gtag_id: cfg.amp.analytics.googleTrackingId,
    config: {
      [cfg.amp.analytics.googleTrackingId]: {
        groups: 'default',
      },
    },
  },
};

const metrikaConfig = {
  vars: {
    counterId: cfg.amp.analytics.metrikaCounterId,
  },
  triggers: {
    notBounce: {
      on: 'timer',
      timerSpec: {
        immediate: false,
        interval: 15,
        maxTimerLength: 14,
      },
      request: 'notBounce',
    },
  },
};

const AmpLayout = ({ title, children }) => {
  const fullTitle = title ? `${title} | ${cfg.title}` : cfg.title;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <AmpBoilerplate />
      </Head>
      <AmpAnalytics type="gtag" config={gtagConfig} />
      <AmpAnalytics type="metrika" config={metrikaConfig} />
      <div className="markdown md:markdown-lg lg:markdown-xl">{children}</div>
    </>
  );
};

export default AmpLayout;
