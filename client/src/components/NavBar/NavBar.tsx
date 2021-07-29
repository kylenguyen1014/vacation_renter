import React, { ReactElement, useState } from 'react'
import { AppBar, Button, Divider, Grid, Popover, Typography } from '@material-ui/core';
import { House, Menu, Person, PowerSettingsNew } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './NavBar.scss';
import { RootState } from '../../redux/root-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { openSignInOrUpForm, setToSignIn, setToSignUp } from '../../redux/popup.slices/popup.slices';
import feathersClient from '../../API/feathersClient';
import Swal from 'sweetalert2';
import { errorMessageReturn } from '../../utils/errorMesageReturnUtils';

function NavBar(): ReactElement {
    const history = useHistory()
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state: RootState) => state.user)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClickLogo = () => {
        history.push(ROUTES._HOME)
    }

    const handleClickExplore = () => {
        history.push(ROUTES._RENTAL)
    }

    const handleSetAnchorEl = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClosePopover = () => {
        setAnchorEl(null)
    }

    const handleClickSignUp = () => {
        dispatch(openSignInOrUpForm())
        dispatch(setToSignUp())
        handleClosePopover()
    }

    const handleClickSignIn = () => {
        dispatch(openSignInOrUpForm())
        dispatch(setToSignIn())
        handleClosePopover()
    }

    const handleClickSignOut = () => {
        feathersClient.logout()
            .then(() => {
                handleClosePopover()
            })
            .catch(err => {
                Swal.fire({
                    title: 'Failed to logout',
                    text: errorMessageReturn(err),
                    icon: 'error',
                    toast: true,
                })
            })
    }

    const handleClickHostYourHome = () => {
        history.push(ROUTES._HOST_A_RENTAL)
        handleClosePopover()
    }


    const isOpen = Boolean(anchorEl)
    return (
        <div>
            <AppBar classes={{ root: 'NavBar-root' }} color='inherit' position='sticky'>
                <Grid container spacing={1} justifyContent='space-between' alignContent='center'>
                    <Grid item className='NavBar-logo'>
                        <span onClick={handleClickLogo}>
                            <Grid container spacing={1} alignItems='center'>
                                <Grid item>
                                    <House fontSize='large' />
                                </Grid>
                                <Grid item>
                                    <Typography variant='h6'> V-Rental </Typography>
                                </Grid>
                            </Grid>
                        </span>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Button variant='text' size='large' onClick={handleClickExplore}>Explore</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' size='large' startIcon={<Menu />} onClick={handleSetAnchorEl}><Person /></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Popover
                    open={isOpen}
                    onClose={handleClosePopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    className='NavBar-profile-popover'
                >
                    <div className='NavBar-profile-popover-container'>
                        <Grid container spacing={1} >
                            <Grid item xs={12}>
                                <Grid container spacing={1} justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <House />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='subtitle1'> V-Rental </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>

                                <Divider />
                            </Grid>
                            {!currentUser
                                ? <>
                                    <Grid item xs={12}>
                                        <Button fullWidth onClick={handleClickSignUp}>Sign Up</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth onClick={handleClickSignIn}>Login</Button>
                                    </Grid>
                                </>
                                : <>
                                    <Grid item xs={12}>
                                        <Button fullWidth color='secondary' startIcon={<PowerSettingsNew />} onClick={handleClickSignOut}>Sign Out</Button>
                                    </Grid>
                                    <Divider flexItem />
                                    <Grid item xs={12}>
                                        <Button fullWidth onClick={handleClickHostYourHome}>Host your home</Button>
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </div>
                </Popover>
            </AppBar>
        </div>
    )
}

export default NavBar
