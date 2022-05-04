import React from "react";
import Header from "../Header";

const PageLayout = ({children}) => 
    <div className="d-flex flex-column h-100">
        <Header />
        {children}
    </div>

export default PageLayout;