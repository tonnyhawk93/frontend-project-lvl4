import React from 'react';
import PageLayout from '../../components/PageLayout';
import SingUpForm from '../../components/forms/SingUpForm';
import Container from '../../components/Container';
import FormContainer from '../../components/FormContainer';

function SingUpPage() {
  return (
    <PageLayout>
      <Container>
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <FormContainer withRegistatrationLink={false}>
              <div className="col-xs-8 col-12">
                <SingUpForm />
              </div>
            </FormContainer>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}

export default SingUpPage;
