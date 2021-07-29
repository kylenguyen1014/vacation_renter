import { Button, Container, Grid, InputAdornment, TextField, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete } from '@material-ui/lab'
import { Feature, GeoCoding } from '../../../shared/interfaces/GeoCoding'
import axios from 'axios'
import { MAPBOX_QUERY_SEARCH } from '../../../shared/constants/MapBox'
import './NewOrEditRentalForm.scss'
import { FileWithPath, useDropzone } from 'react-dropzone';
import { ArrowBack, Send } from '@material-ui/icons'
import Swal from 'sweetalert2'
import feathersClient from '../../../API/feathersClient'
import { FeatherServices } from '../../../API/featherServices'
import { Rental } from '../../../shared/interfaces/Rental'
import { useDispatch } from 'react-redux'
import { fetchDataBegin, fetchDataStop } from '../../../redux/fetching.slices/fetching.slices'
import { errorMessageReturn } from '../../../utils/errorMesageReturnUtils'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'

type FormInput = {
    name: string;
    address: Feature | null;
    price: number;
    description: string;
    bed: number;
    bath: number;
}

interface Props {
    isEditting: boolean;
    rentalId?: string;
}

interface FileUpload extends FileWithPath {
    preview: string;
}
function NewOrEditRentalForm({ isEditting, rentalId }: Props): ReactElement {
    const history = useHistory()
    const dispatch = useDispatch()
    const [files, setFiles] = useState<FileUpload[]>([])
    const [locations, setLocations] = useState<Feature[]>([])
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        onDrop: (acceptedFiles : FileWithPath[]) => {
            setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })))
        }
    });

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormInput>()

    const handleAddressSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            axios.get<GeoCoding>(MAPBOX_QUERY_SEARCH(e.target.value))
                .then(resp => {
                    setLocations(resp.data.features)
                })
                .catch(err => console.log(err))
        } else {
            setValue('address', null)
            setLocations([])
        }
    }

    const handleCloseAutocomplete = () => {
        setLocations([])
    }

    const handleGoBack = () => {
        history.goBack()
    }

    const handleGoToRentalDetail = (rentalId : string) => {
        history.push(ROUTES._RENTAL_DETAIL(rentalId))
    }

    const submit = async (data: FormInput) => {
        const fd = new FormData()
        files.forEach(file => fd.append('images', file))
        fd.append('name', data.name)
        fd.append('description', data.description)
        fd.append('spec', JSON.stringify({bath: data.bath, bed:data.bed}))
        fd.append('address', data.address?.place_name || '')
        fd.append('geometry', JSON.stringify(data.address?.geometry) || '')
        fd.append('price', data.price.toString())
        try {
            dispatch(fetchDataBegin())
            const newRental : Rental = await feathersClient.service(FeatherServices.rentals).create(fd, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            dispatch(fetchDataStop())
            handleGoToRentalDetail(newRental._id)
        } catch (error) {
            dispatch(fetchDataStop())
            Swal.fire({
                title: `Failed to ${isEditting ? 'edit' : 'host'} rental`,
                text: errorMessageReturn(error),
                icon: 'error'
            })
        }
    }

    const thumbs = files.map(file => (
        <div className='ImageUpload-thumbnail' key={file.path}>
            <div>
                <img
                    src={file.preview}
                    alt={file.name}
                />
            </div>
        </div>
    ))
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
                        <Controller
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={locations}
                                    getOptionLabel={(option) => option.place_name}
                                    // value={selectedLocation}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    renderOption={(option) => (
                                        <span className='address-suggestion' >
                                            {option.place_name}
                                        </span>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            variant='outlined' {...params}
                                            error={!!(errors.address) && true}
                                            onChange={handleAddressSearch}
                                        />
                                    )}
                                    onClose={handleCloseAutocomplete}
                                    onChange={(_, data) => {
                                        field.onChange(data)
                                    }}
                                />
                            )}
                            name='address'
                            defaultValue={null}
                            rules={{ required: true }}
                            control={control}
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
                    <Grid item xs={6}>
                        <Typography variant='subtitle2'># of bedrooms</Typography>
                        <Controller
                            control={control}
                            name='bed'
                            render={({ field }) => <TextField variant='outlined' fullWidth  {...field} error={errors.bed && true}
                                inputProps={{ type: 'number', min: 1, step: 1 }}
                            />
                            }
                            defaultValue={1}
                            rules={{ required: true, min: 1 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle2'># of bathrooms</Typography>
                        <Controller
                            control={control}
                            name='bath'
                            render={({ field }) => <TextField variant='outlined' fullWidth  {...field} error={errors.bath && true}
                                inputProps={{ type: 'number', min: 1, step: 0.5 }}
                            />
                            }
                            defaultValue={1}
                            rules={{ required: true, min: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2'>Description</Typography>
                        <Controller
                            control={control}
                            name='description'
                            render={({ field }) => <TextField variant='outlined' fullWidth  {...field} multiline minRows={5} maxRows={5} />}
                            defaultValue=''
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2'>Image</Typography>
                        <div {...getRootProps({ className: 'Image-dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside className='ImageUpload-thumbnail-container'>
                            {thumbs}
                        </aside>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button variant='contained' fullWidth color='primary' type='submit' startIcon={<Send />}>Submit</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant='contained' fullWidth color='secondary' startIcon={<ArrowBack />} onClick={handleGoBack}>Back</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default NewOrEditRentalForm
