/* eslint-disable no-underscore-dangle */
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid4 from 'uuid4';
import { API_URL, PRODUCTS } from '../utils/globals';
import usePostLicense from '../hooks/usePostLicense';

function NewLicenseModal(props) {
    var { open, clients, closeModal } = props;

    var [postLicense, error] = usePostLicense();

    var defaultEndDate = new Date(Date.now() + 60000 * 24);
    var defaultStartDate = new Date(Date.now());

    var [product, setProduct] = useState('');
    var [clientId, setClientId] = useState('');
    var [description, setDescription] = useState('');
    var [primaryColor, setPrimaryColor] = useState('');
    var [secondaryColor, setSecondaryColor] = useState('');
    var [maxLicenseAmount, setMaxLicenseAmount] = useState(0);
    var [startYear, setStartYear] = useState(defaultStartDate.getFullYear());
    var [startMonth, setStartMonth] = useState(defaultStartDate.getMonth());
    var [startDay, setStartDay] = useState(defaultStartDate.getDate());
    var [endYear, setEndYear] = useState(defaultEndDate.getFullYear());
    var [endMonth, setEndMonth] = useState(defaultEndDate.getMonth());
    var [endDay, setEndDay] = useState(defaultEndDate.getDate());

    return (
        <Modal open={open} className="flex justify-center items-center">
            <Paper
                elevation={3}
                className="w-[60%] h-[50%] overflow-y-scroll py-6"
            >
                {clients.length && !error && (
                    <div className="flex flex-col justify-center items-center p-4 gap-4">
                        <h1 className="title">Add a new license</h1>
                        <form className="flex flex-col w-3/4 h-full justify-center items-start gap-6">
                            <FormControl className="w-full">
                                <InputLabel id="license-form-product">
                                    Product
                                </InputLabel>
                                <Select
                                    labelId="license-form-product"
                                    onChange={(event) =>
                                        handleInputChange(event, setProduct)
                                    }
                                    value={product}
                                    label="Product"
                                >
                                    <MenuItem value="go" key={uuid4()}>
                                        {PRODUCTS.go}
                                    </MenuItem>
                                    <MenuItem value="trackTrace" key={uuid4()}>
                                        {PRODUCTS.trackTrace}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="w-full">
                                <InputLabel id="license-form-client">
                                    Client
                                </InputLabel>
                                <Select
                                    labelId="license-form-client"
                                    onChange={(event) =>
                                        handleInputChange(event, setClientId)
                                    }
                                    value={clientId}
                                    label="Client"
                                >
                                    {clients.map(function mapClientOptions(
                                        client
                                    ) {
                                        return (
                                            <MenuItem
                                                value={client._id}
                                                key={uuid4()}
                                            >
                                                {client.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="w-full">
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    value={description}
                                    onChange={(event) =>
                                        handleInputChange(event, setDescription)
                                    }
                                />
                            </FormControl>
                            <FormControl className="w-full">
                                <FormLabel>Logo</FormLabel>
                                <Input
                                    variant="outlined"
                                    type="file"
                                    id="imageUpload"
                                />
                            </FormControl>
                            <FormControl className="w-full">
                                <TextField
                                    label="Primary color"
                                    variant="outlined"
                                    value={primaryColor}
                                    onChange={(event) =>
                                        handleInputChange(
                                            event,
                                            setPrimaryColor
                                        )
                                    }
                                />
                            </FormControl>
                            <FormControl className="w-full">
                                <TextField
                                    label="Secondary color"
                                    variant="outlined"
                                    value={secondaryColor}
                                    onChange={(event) =>
                                        handleInputChange(
                                            event,
                                            setSecondaryColor
                                        )
                                    }
                                />
                            </FormControl>
                            <FormControl className="w-full">
                                <TextField
                                    label="Max. license amount"
                                    variant="outlined"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={maxLicenseAmount}
                                    onChange={(event) =>
                                        handleInputChange(
                                            event,
                                            setMaxLicenseAmount
                                        )
                                    }
                                />
                            </FormControl>
                            <span className="formGroup">
                                <h2>License Validation Date</h2>
                                <FormControl>
                                    <TextField
                                        label="Year"
                                        variant="outlined"
                                        type="number"
                                        value={startYear}
                                        onChange={(event) =>
                                            handleInputChange(
                                                event,
                                                setStartYear
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Month"
                                        variant="outlined"
                                        type="number"
                                        value={startMonth}
                                        onChange={(event) =>
                                            handleInputChange(
                                                event,
                                                setStartMonth
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Day"
                                        variant="outlined"
                                        type="number"
                                        value={startDay}
                                        onChange={(event) =>
                                            handleInputChange(
                                                event,
                                                setStartDay
                                            )
                                        }
                                    />
                                </FormControl>
                            </span>
                            <span className="formGroup">
                                <h2>License Expiry Date</h2>
                                <FormControl>
                                    <TextField
                                        label="Year"
                                        variant="outlined"
                                        type="number"
                                        value={endYear}
                                        onChange={(event) =>
                                            handleInputChange(event, setEndYear)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Month"
                                        variant="outlined"
                                        type="number"
                                        value={endMonth}
                                        onChange={(event) =>
                                            handleInputChange(
                                                event,
                                                setEndMonth
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Day"
                                        variant="outlined"
                                        type="number"
                                        value={endDay}
                                        onChange={(event) =>
                                            handleInputChange(event, setEndDay)
                                        }
                                    />
                                </FormControl>
                            </span>
                            <span className="formGroup">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={formSubmitHandler}
                                >
                                    Create
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                            </span>
                        </form>
                    </div>
                )}
                {!clients.length && (
                    <p>No clients available. Please add a client first</p>
                )}
                {error && (
                    <div className="text-3xl text-red-500 font-bold w-full h-full flex justify-center items-center">
                        <p>{error.message}</p>
                    </div>
                )}
            </Paper>
        </Modal>
    );

    function handleInputChange({ target: { value } }, changeFn) {
        changeFn(value);
    }

    function formSubmitHandler(event) {
        event.preventDefault();
        // eslint-disable-next-line no-undef
        var imageUploadInput = document.getElementById('imageUpload');

        var formData = new FormData();
        formData.append('product', product);
        formData.append('clientId', clientId);
        formData.append('description', description);
        formData.append('primaryColor', primaryColor);
        formData.append('secondaryColor', secondaryColor);
        formData.append('maxLicenseAmount', maxLicenseAmount);
        formData.append(
            'licenseStartDate',
            new Date(startYear, startMonth, startDay, 0, 0, 0).toISOString()
        );
        formData.append(
            'licenseEndDate',
            new Date(endYear, endMonth, endDay, 0, 0, 0).toISOString()
        );
        formData.append('file', imageUploadInput.files[0]);

        postLicense(`${API_URL}/licenses/new/`, formData);
    }
}

NewLicenseModal.propTypes = {
    open: PropTypes.bool,
    clients: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
    closeModal: PropTypes.func.isRequired,
};

NewLicenseModal.defaultProps = {
    open: false,
    clients: [],
};

export default NewLicenseModal;
