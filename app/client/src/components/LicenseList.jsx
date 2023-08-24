import { Button } from '@mui/material';
import React, { useState } from 'react';
import uuid4 from 'uuid4';
import License from './License';
import useFetchData from '../hooks/useFetchData';
import NewLicenseModal from './NewLicenseModal';
import { API_URL } from '../utils/globals';

function LicenseList() {
    var [isOpenAddLicenseModal, setIsOpenAddLicenseModal] = useState(false);

    var [licenses, , licensesError] = useFetchData(
        `${API_URL}/licenses/64e5304bc89211c17d96d245/`
    );
    var [clients, , clientsError] = useFetchData(`${API_URL}/clients/`);
    var error = licensesError || clientsError;

    return (
        <div className="h-[94%] w-full p-4 flex flex-col justify-between items-center">
            {!error && (
                <>
                    <NewLicenseModal
                        open={isOpenAddLicenseModal}
                        clients={clients}
                        closeModal={toggleAddLicenseModal}
                    />
                    {licenses && (
                        <div className="flex justify-start items-start flex-wrap w-full h-[90%] overflow-y-scroll gap-3 py-4">
                            {licenses.map(function mapLicensesToElements(
                                license
                            ) {
                                return <License data={license} key={uuid4()} />;
                            })}
                        </div>
                    )}
                    <div className="w-full h-[10%] flex justify-center items-center">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={toggleAddLicenseModal}
                            size="large"
                        >
                            Add license
                        </Button>
                    </div>
                </>
            )}
            {error && (
                <div className="text-3xl text-red-500 font-bold w-full h-full flex justify-center items-center">
                    <p>{error.message}</p>
                </div>
            )}
        </div>
    );

    function toggleAddLicenseModal() {
        setIsOpenAddLicenseModal(function toggle(prevValue) {
            return !prevValue;
        });
    }
}

export default LicenseList;
