import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import Container from '../../components/Container';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Container>
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-4">
            <h2>{t('notFound.title')}</h2>
            <span>
              {t('notFound.message')}
              <Link to="/">{t('notFound.linkText')}</Link>
            </span>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}

export default NotFoundPage;
