import { Avatar, Button, Collapse, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core'
import { CancelOutlined, Delete, Edit, Person, Save } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import React, { ReactElement, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import feathersClient from '../../../API/feathersClient'
import { FeatherServices } from '../../../API/featherServices'
import { QUERYKEYS } from '../../../react-query/reactQueryKeys'
import { fetchDataBegin, fetchDataStop } from '../../../redux/fetching.slices/fetching.slices'
import { RootState } from '../../../redux/root-reducer'
import { Review } from '../../../shared/interfaces/Review'
import { errorMessageReturn } from '../../../utils/errorMesageReturnUtils'

interface Props {
    review: Review;
}

interface FormInput {
    rating: number;
    text: string;
}
function ReviewItem({ review }: Props): ReactElement {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state: RootState) => state.user)
    const [isEditting, setIsEditting] = useState<boolean>(false)
    const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false)
    const [currentReview, setCurrentReview] = useState<Review>(review)

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormInput>({ defaultValues: currentReview })
    const queryClient = useQueryClient()

    const convertDate = (): string => {
        const newDate = new Date(review.createdAt)
        return `${newDate.toLocaleDateString()}`
    }

    const refreshRentailDetail = () => {
        queryClient.invalidateQueries(QUERYKEYS.RENTAL_DETAIL(review.rental))
        queryClient.invalidateQueries(QUERYKEYS.REVIEWS_BY_RENTAL(review.rental))
    }

    const handleCancelDelete = () => {
        setIsConfirmDelete(false)
    }


    const handleDelete = () => {
        setIsConfirmDelete(true)
    }

    const handleConfirmDelete = async () => {
        try {
            dispatch(fetchDataBegin())
            await feathersClient.service(FeatherServices.reviews).remove(review._id)
            refreshRentailDetail()
            dispatch(fetchDataStop())
        } catch (error) {
            dispatch(fetchDataStop())
            setIsConfirmDelete(false)
            Swal.fire({
                title: 'Failed to delete review!',
                text: errorMessageReturn(error),
                icon: 'error'
            })
        }
    }


    const handleClickEdit = () => {
        setIsEditting(true)
    }

    const handleCloseEdit = () => {
        reset(currentReview)
        setIsEditting(false)
    }

    const submit = async (data: FormInput) => {
        try {
            dispatch(fetchDataBegin())
            const resp: Review = await feathersClient.service(FeatherServices.reviews).patch(review._id, {
                rating: data.rating,
                text: data.text
            })
            refreshRentailDetail()
            setCurrentReview(resp)
            reset(resp)
            dispatch(fetchDataStop())
            setIsEditting(false)
        } catch (error) {
            dispatch(fetchDataStop())
            Swal.fire({
                title: 'Failed to update review!',
                text: errorMessageReturn(error),
                icon: 'error'
            })
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Grid container spacing={1} justifyContent='space-between' alignItems='flex-start'>
                        <Grid item>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Avatar >
                                        <Person fontSize='large' />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant='subtitle2' >{review.user.firstName} {review.user.lastName}</Typography>
                                    <Typography variant='caption' color='textSecondary'>{convertDate()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {currentUser && currentUser._id === review.user._id &&
                            <Grid item>
                                {!isEditting &&
                                    <div >
                                        <Collapse in={isConfirmDelete} >
                                            <Grid container alignItems='center'>
                                                <Grid item>
                                                    <Typography variant='caption' color='secondary'>Are you sure?</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title='Confirm Delete'>
                                                        <IconButton size='small' edge='end' onClick={handleConfirmDelete} color='secondary' ><Delete fontSize='small' /></IconButton>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title='Cancel'>
                                                        <IconButton size='small' edge='end' color='default' onClick={handleCancelDelete}><CancelOutlined fontSize='small' /></IconButton>
                                                    </Tooltip>
                                                </Grid>
                                            </Grid>
                                        </Collapse>
                                        <Collapse in={!isConfirmDelete} >
                                            <Grid container justifyContent='flex-end'>
                                                <Grid item>
                                                    <Tooltip title='Edit'>
                                                        <IconButton size='small' edge='end' onClick={handleClickEdit} ><Edit fontSize='small' color='action' /></IconButton>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title='Delete'>
                                                        <IconButton size='small' edge='end' color='secondary' onClick={handleDelete}><Delete fontSize='small' /></IconButton>
                                                    </Tooltip>
                                                </Grid>
                                            </Grid>
                                        </Collapse>
                                    </div>
                                }
                            </Grid>
                        }
                    </Grid>
                </Grid>
                {isEditting
                    ? <Grid item xs={12}>
                        <form onSubmit={handleSubmit(submit)}>
                            <Grid container direction='column' spacing={1}>
                                <Grid item>
                                    <Controller
                                        render={({ field }) => <Rating {...field} />}
                                        name='rating'
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Controller
                                        render={({ field }) => <TextField maxRows={3} minRows={3}
                                            inputProps={{ maxLength: 300 }}
                                            multiline variant='outlined'
                                            label='Feedback' fullWidth
                                            error={errors.text && true}
                                            {...field}
                                        />}
                                        name='text'
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item container spacing={1}>
                                    <Grid item>
                                        <Button size='small' variant='contained' color='primary' startIcon={<Save />} type='submit'>Save</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size='small' variant='contained' color='secondary' startIcon={<CancelOutlined />} onClick={handleCloseEdit}>Cancel</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    : <Grid item>
                        <Rating
                            value={currentReview.rating}
                            readOnly
                        />
                        <Typography variant='caption' display='block'>{currentReview.text}</Typography>
                    </Grid>}
            </Grid>
        </React.Fragment>
    )
}

export default ReviewItem
