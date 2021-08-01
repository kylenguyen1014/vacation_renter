import React, { ReactElement } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Slide, TextField, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { closeSignInOrUpForm } from '../../../redux/popup.slices/popup.slices'
import { RootState } from '../../../redux/root-reducer'
import { Controller, useForm } from 'react-hook-form'
import { FeatherServices } from '../../../API/featherServices'
import { UserFull } from '../../../shared/interfaces/User'
import { fetchDataBegin, fetchDataStop } from '../../../redux/fetching.slices/fetching.slices'
import Swal from 'sweetalert2'
import { errorMessageReturn } from '../../../utils/errorMesageReturnUtils'
import feathersClient from '../../../API/feathersClient'

interface FormInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
function LogInOrSignUpForm(): ReactElement {
    const { isOpenSignInOrUpForm, isSigningIn } = useSelector((state: RootState) => state.popup)
    const dispatch = useDispatch()

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormInput>()

    const handleClose = () => {
        reset({ firstName: '', lastName: '', email: '', password: '' })
        dispatch(closeSignInOrUpForm())
    }

    const signIn = async (email: string, password: string) => {
        try {
            dispatch(fetchDataBegin())
            await feathersClient.authenticate({
                email,
                password,
                strategy: 'local'
            })
            await feathersClient.get(FeatherServices.authentication)
            dispatch(fetchDataStop())
        } catch (error) {
            dispatch(fetchDataStop())
            Swal.fire({
                title: 'Failed to sign in!',
                text: errorMessageReturn(error),
                icon: 'error'
            })
            throw new Error('Failed to sign in')
        }

    }

    const signUp = async (data: FormInput): Promise<UserFull> => {
        try {
            dispatch(fetchDataBegin())
            const resp = await feathersClient.service(FeatherServices.users).create({
                ...data,
                firstName : data.firstName.charAt(0).toUpperCase() + data.firstName.toLocaleLowerCase().slice(1),
                lastName : data.lastName.charAt(0).toUpperCase() + data.lastName.toLocaleLowerCase().slice(1)
            })
            dispatch(fetchDataStop())
            return resp
        } catch (error) {
            dispatch(fetchDataStop())
            Swal.fire({
                title: 'Failed to register!',
                text: errorMessageReturn(error),
                icon: 'error'
            })
            throw new Error('Failed to register')
        }
    }


    const submit = (data: FormInput) => {
        if (isSigningIn) {
            signIn(data.email, data.password)
                .then(() => handleClose())
                .catch(err => console.log(err))
        } else {
            signUp(data)
                .then(resp => signIn(resp.email, data.password))
                .then(() => handleClose())
                .catch(err => console.log(err))
        }
    }

    return (
        <Dialog
            open={isOpenSignInOrUpForm}
            onClose={handleClose}
            maxWidth='sm'
            fullWidth
            TransitionComponent={Slide}
        >
            <DialogTitle>
                <Typography variant='h5' component='p'>{isSigningIn ? 'Sign In' : 'Sign Up'}</Typography>
                <Divider />
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(submit)}>
                    <Grid container spacing={1}>
                        {!isSigningIn &&
                            <>
                                <Grid item xs={12} md={6}>
                                    <Typography variant='subtitle2' display='block'>First Name</Typography>
                                    <Controller
                                        control={control}
                                        name='firstName'
                                        render={({ field }) => <TextField variant='outlined' fullWidth size='small' {...field} error={errors.firstName && true} />}
                                        defaultValue=''
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant='subtitle2' display='block'>Last Name</Typography>
                                    <Controller
                                        control={control}
                                        name='lastName'
                                        render={({ field }) => <TextField variant='outlined' fullWidth size='small' {...field} error={errors.lastName && true} />}
                                        defaultValue=''
                                        rules={{ required: true }}
                                    />
                                </Grid>
                            </>
                        }
                        <Grid item xs={12} >
                            <Typography variant='subtitle2' display='block'>Email</Typography>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field }) => <TextField variant='outlined' fullWidth size='small' {...field} error={errors.email && true} />}
                                defaultValue=''
                                rules={{ required: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' display='block'>Passwrod</Typography>
                            <Controller
                                control={control}
                                name='password'
                                render={({ field }) => <TextField variant='outlined' fullWidth size='small' type='password' {...field} error={errors.password && true} />}
                                defaultValue=''
                                rules={{ required: true }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ margin: '0.5rem 0' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Button variant='contained' fullWidth color='primary' type='submit'>{isSigningIn ? 'Sign In' : 'Register'}</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant='contained' fullWidth color='secondary' onClick={handleClose}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default LogInOrSignUpForm
