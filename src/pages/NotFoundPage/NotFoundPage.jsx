import React from "react";
import PageLayout from "../../components/PageLayout";
import Container from "../../components/Container";
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
    return <PageLayout>
        <Container>
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-4">
                    <h2>Страница не найдена</h2>
                    <span>Но вы можете перейти <Link to="/">на главную страницу</Link></span>
                </div>
            </div>
        </Container>
    </PageLayout>
}

export default NotFoundPage;