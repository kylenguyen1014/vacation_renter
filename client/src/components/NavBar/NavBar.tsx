import React, { ReactElement, useState } from 'react'
import { AppBar, Button, Grid, Popover, Typography } from '@material-ui/core';
import { House, Person } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './NavBar.scss';

function NavBar(): ReactElement {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClickLogo = () => {
        history.push(ROUTES._HOME)
    }

    const handleClickExplore = () => {
        history.push(ROUTES._RENTAL)
    }

    const handleSetAnchorEl = (e : React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }
    
    const handleClosePopover = () => {
        setAnchorEl(null)
    }
    

    const isOpen = Boolean (anchorEl)
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
                                <Button variant='text' onClick={handleClickExplore}>Explore</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='text' onClick={handleSetAnchorEl}><Person /></Button>
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
                >
                    <Typography >The content of the Popover.</Typography>
                </Popover>
            </AppBar>
        </div>
    )
}

export default NavBar
