import React from "react";
import PageLayout from "../../components/PageLayout";
import LoginForm from "../../components/LoginForm";
import Container from "../../components/Container";
import FormContainer from "../../components/FormContainer";

const LoginPage = () => (
    <PageLayout>
        <Container>
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <FormContainer>
                        <div className="col-xs-8 col-12">
                            <LoginForm />
                        </div>
                    </FormContainer>
                </div>
            </div>
        </Container>
    </PageLayout>
);

export default LoginPage;