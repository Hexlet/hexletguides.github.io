import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const PostPageNav = ({ nextGuide, prevGuide }) => {
  const { t } = useTranslation('post');

  return (
    <div className="row PageNavigation mt-4 prevnextlinks d-flex justify-content-between">
      <div className="col-md-6 rightborder pl-0">
        {prevGuide.header && (
          <Link href={prevGuide.name}>
            <a alt={t('page.prev_guide')} className="thepostlink">
              « {prevGuide.header}
            </a>
          </Link>
        )}
      </div>
      <div className="col-md-6 text-end pr-0">
        {nextGuide.header && (
          <Link href={nextGuide.name}>
            <a alt={t('page.next_guide')} className="thepostlink">
              {nextGuide.header} »
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostPageNav;
