import { Container, Grid, InputAdornment, TextField, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete } from '@material-ui/lab'
import { Feature, GeoCoding } from '../../../shared/interfaces/GeoCoding'
import axios from 'axios'
import { MAPBOX_QUERY_SEARCH } from '../../../shared/constants/MapBox'
import './NewOrEditRentalForm.scss'
import { useDropzone } from 'react-dropzone';

type FormInput = {
    name: string;
    address: string;
    price: number;
    description: string;
}

interface Props {
    isEditting: boolean;
    rentalId?: string;
}

function NewOrEditRentalForm({ isEditting, rentalId }: Props): ReactElement {
    const [files, setFiles] = useState<File[]>([])
    const [locations, setLocations] = useState<Feature[]>([])
    const [selectedLocation, setSelectedLocation] = useState<Feature | null>(null)
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: 'image/jpeg, image/png, image/jpg' });

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormInput>()

    const handleAddressSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        axios.get<GeoCoding>(MAPBOX_QUERY_SEARCH(e.target.value))
            .then(resp => {
                setLocations(resp.data.features)
            })
            .catch(err => console.log(err))
    }

    const handleCloseAutocomplete = () => {
        setLocations([])
    }


    const handleAddressSelect = (option: Feature) => {
        setSelectedLocation(option)
        setValue('address', option.place_name)
    }

    const submit = (data: FormInput) => {
        console.log(data)
        console.log(files)
    }


    return (
        <Container maxWidth='md' fixed>
            <form onSubmit={handleSubmit(submit)}>
                <Typography variant='h5' align='center'>{isEditting ? 'Edit Rental' : 'Host a rental'}{rentalId}</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2'>Name</Typography>
                        <Controller
                            control={control}
                            name='name'
                            render={({ field }) => <TextField variant='outlined' fullWidth  {...field} error={errors.name && true} />}
                            defaultValue=''
                            rules={{ required: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2'>Address</Typography>
                        <Autocomplete
                            options={locations}
                            getOptionLabel={(option) => option.place_name}
                            renderOption={(option) => (
                                <span className='address-suggestion' onClick={() => handleAddressSelect(option)}>
                                    {option.place_name}
                                </span>
                            )}
                            renderInput={(params) => (
                                <Controller
                                    render={({ field }) => <TextField
                                        variant='outlined' {...params} {...field}
                                        error={errors.address && true}
                                        onChange={handleAddressSearch}
                                    />
                                    }
                                    control={control}
                                    defaultValue=''
                                    name='address'
                                    rules={{ required: true }}
                                />
                            )}
                            onClose={handleCloseAutocomplete}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2'>Price</Typography>
                        <Controller
                            control={control}
                            name='price'
                            render={({ field }) => <TextField variant='outlined' fullWidth  {...field} error={errors.price && true}
                                inputProps={{ type: 'number', min: 0, step: 'any' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    endAdornment: <InputAdornment position="end">/ night</InputAdornment>,
                                }}
                                autoComplete=''
                            />
                            }
                            defaultValue={0}
                            rules={{ required: true, min: 0 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2'>Image</Typography>
                        <div {...getRootProps({ className: 'Image-dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <ul>{acceptedFiles.map(file => <li key={file.size + file.lastModified}>{file.name}</li>)}</ul>
                        </aside>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default NewOrEditRentalForm
