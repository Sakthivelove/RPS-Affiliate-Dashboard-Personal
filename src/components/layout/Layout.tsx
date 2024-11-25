import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-cover bg-no-repeat bg-center min-h-screen flex" style={{ backgroundImage: "url(/background.png)" }}>
            <div className="flex-grow">{children}</div>
        </div>
    );
};

export default Layout;
