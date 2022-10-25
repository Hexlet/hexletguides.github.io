import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const PostPageNav = ({ nextPost, prevPost }) => {
  const { t } = useTranslation('post');

  return (
    <div className="row PageNavigation mt-4 prevnextlinks d-flex justify-content-between">
      <div className="col-md-6 rightborder pl-0">
        <Link href={prevPost.href}>
          <a alt={t('page.prev_guide')} className="thepostlink">
            « {prevPost.header}
          </a>
        </Link>
      </div>
      <div className="col-md-6 text-end pr-0">
        <Link href={nextPost.href}>
          <a alt={t('page.next_guide')} className="thepostlink">
            {nextPost.header} »
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostPageNav;
