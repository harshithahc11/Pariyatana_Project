import React, { useCallback, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const CompanyDropDownComponent = ({ label, name, arrayData, stateData, setStateData, options, id, issubmit, inputerror, dropdown, proId }) => {
    const setcomp = useCallback((data) => {
        if (data) {
            const stat = options.find(s => s.id === data.company_id);
            setStateData(stat || null);
        }
    }, [setStateData, options]);

    useEffect(() => {
        if (arrayData) {
            setcomp(arrayData);
        }
    }, [setcomp, arrayData]);

    return (
        <>
            <Autocomplete
                disablePortal
                disabled={proId}
                onChange={(event, value) => setStateData(value || '')}
                id="combo-box-demo"
                options={options}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                getOptionLabel={(option) => option?.name || ''}
                value={stateData || null}
                sx={{ width: '100%', marginTop: '7px' }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        name={name}
                        variant="outlined"
                        error={issubmit && !stateData}
                        helperText={issubmit && !stateData ? inputerror : ''}
                    />
                )}
            />
        </>
    );
}

export default CompanyDropDownComponent