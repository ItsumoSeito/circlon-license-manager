import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Chip,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { API_URL, PRODUCTS } from '../utils/globals';

function License(props) {
    var { data } = props;
    var {
        clientId: client,
        description,
        imageUrl,
        primaryColor,
        secondaryColor,
        maxLicenseAmount,
        licenseStartDate,
        licenseEndDate,
        product,
    } = data;

    const theme = createTheme({
        palette: {
            background: {
                chip: secondaryColor,
                card: '#e2e8f0',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ bgcolor: 'background.card' }}>
                <CardContent>
                    <h2 className={`text-[${primaryColor}]`}>
                        {PRODUCTS[product]}
                    </h2>
                </CardContent>
                <div className="flex justify-center items-center w-full">
                    <img
                        src={`${API_URL}/${imageUrl}`}
                        alt="Logo"
                        className="w-16 h-16"
                    />
                </div>
                <CardContent className="flex flex-col justify-center items-start gap-4">
                    <p>{description}</p>
                    <div>
                        <p>{`Valid from: ${licenseStartDate}`}</p>
                        <p>{`Valid through: ${licenseEndDate}`}</p>
                    </div>
                    <span className="flex justify-evenly items-center w-full">
                        <Chip
                            label={client.name}
                            sx={{ bgcolor: 'background.chip' }}
                        />
                        <Chip
                            label={`Max. licenses: ${maxLicenseAmount}`}
                            sx={{ bgcolor: 'background.chip' }}
                        />
                    </span>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}

License.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        clientId: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
        }),
        description: PropTypes.string,
        imageUrl: PropTypes.string,
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        maxLicenseAmount: PropTypes.number,
        licenseStartDate: PropTypes.string,
        licenseEndDate: PropTypes.string,
        product: PropTypes.string,
    }).isRequired,
};

export default License;
