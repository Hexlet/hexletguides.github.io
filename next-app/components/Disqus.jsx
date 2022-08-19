import React from 'react';
import { useTranslation } from 'next-i18next';
import { DiscussionEmbed } from 'disqus-react';

const Disqus = ({ shortName, config }) => {
  const { t } = useTranslation('common');

  return (
    <section className="disqus">
      <DiscussionEmbed shortname={shortName} config={config} />
      <noscript>
        {t('disqus.noscript.prefix')} <a href="http://disqus.com/?ref_noscript">{t('disqus.noscript.link')}</a>
      </noscript>
      <a href="http://disqus.com" className="dsq-brlink">
        {t('disqus.link.prefix')} <span className="logo-disqus">{t('disqus.link.logo')}</span>
      </a>
    </section>
  );
};

export default Disqus;
