import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const PostPageNav = ({ nextLink, prevLink }) => {
  const { t } = useTranslation('post');
  return (
    <div className="row PageNavigation mt-4 prevnextlinks d-flex justify-content-between">
      <div className="col-md-6 rightborder pl-0">
        {prevLink.header && (
          <Link href={prevLink.name}>
            <a alt={t('page.prev_guide')} className="thepostlink">
              « {prevLink.header}
            </a>
          </Link>
        )}
      </div>
      <div className="col-md-6 text-end pr-0">
        {nextLink.header && (
          <Link href={nextLink.name}>
            <a alt={t('page.next_guide')} className="thepostlink">
              {nextLink.header} »
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostPageNav;
