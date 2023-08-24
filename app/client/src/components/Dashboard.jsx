import React from 'react';
import Menu from './Menu';
import Filter from './Filter';
import LicenseList from './LicenseList';

function Dashboard() {
    return (
        <div className="flex justify-start items-center w-full h-full">
            <Menu />
            <div className="flex flex-col justify-start items-center w-5/6 h-full">
                <Filter />
                <LicenseList />
            </div>
        </div>
    );
}

export default Dashboard;
