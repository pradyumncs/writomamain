import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>My Next.js App</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>© 2023 My Next.js App</p>
            </footer>
        </div>
    );
};

export default Layout;