import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField, Typography } from '@material-ui/core'
import { CancelOutlined, Send } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import { ReactElement } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import feathersClient from '../../API/feathersClient'
import { FeatherServices } from '../../API/featherServices'
import { fetchDataBegin, fetchDataStop } from '../../redux/fetching.slices/fetching.slices'
import { errorMessageReturn } from '../../utils/errorMesageReturnUtils'

interface Props {
    rentalId: string;
    open: boolean;
    onClose: () => void;
    refetchReviews: () => void;
}

interface FormInput {
    rating: number;
    text: string;
}

function LeaveReviewDialog({ rentalId, open, onClose, refetchReviews }: Props): ReactElement {
    const dispatch = useDispatch()
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormInput>()

    const handleClose = () => {
        reset({ rating: 3, text: '' })
        onClose()
    }

    const submit = async (data: FormInput) => {
        try {
            dispatch(fetchDataBegin())
            await feathersClient.service(FeatherServices.reviews).create({
                ...data,
                rental: rentalId
            })
            dispatch(fetchDataStop())
            refetchReviews()
            handleClose()
        } catch (error) {
            dispatch(fetchDataStop())
            Swal.fire({
                title: 'Failed to leave review!',
                text: errorMessageReturn(error),
                icon: 'error'
            })
            handleClose()
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth='sm'
            fullWidth
        >
            <DialogTitle>
                <Grid container spacing={1} justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Typography variant='h5' component='p'>Leave a review</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleClose}><CancelOutlined /></IconButton>
                    </Grid>
                </Grid>
                <Divider />
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(submit)}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2'>Rating:</Typography>
                            <Controller
                                render={({ field }) => <Rating {...field} />}
                                name='rating'
                                control={control}
                                defaultValue={3}
                                rules={{ required: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2'>Feedback:</Typography>
                            <Controller
                                render={({ field }) => (<TextField {...field}
                                    fullWidth variant='outlined'
                                    maxRows={5} minRows={5} multiline
                                    inputProps={{ maxLength: 300 }}
                                    error={errors.text && true}
                                />)}
                                name='text'
                                control={control}
                                rules={{ required: true }}
                            />
                        </Grid>
                        <Grid item container spacing={1}>
                            <Grid item xs={6}>
                                <Button variant='contained' fullWidth color='primary' startIcon={<Send />} type='submit'>Submit</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant='contained' fullWidth color='secondary' startIcon={<CancelOutlined />} onClick={handleClose}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default LeaveReviewDialog
