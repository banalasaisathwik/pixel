// components/Layout.tsx

import React, { ReactNode } from 'react';
import Header from './header';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>

        </div>
    );
};

export default Layout;
