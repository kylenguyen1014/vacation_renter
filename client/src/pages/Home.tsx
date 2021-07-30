import { Button, Grid, Typography } from '@material-ui/core';
import { House } from '@material-ui/icons';
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

import './styles/Home.scss';

function Home(): ReactElement {
    const history = useHistory()

    const handleClickExplore = () => {
        history.push(ROUTES._RENTAL)
    }
    
    return (
        <div className='Home'>
            <ul className='Home-slide'>
                <li />
                <li />
                <li />
                <li />
            </ul>
            <div className='Home-introduction'>
                <Grid container spacing={1} direction='column' alignItems='center'>
                    <Grid item>
                        <Grid container spacing={1} justifyContent='center' alignItems='center'>
                            <Grid item>
                                <House fontSize='large' style={{ color: 'white' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant='h4'> V-Rental </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6' align='center'>Welcome to V-Rental! </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle2' align='center'>Don't know where to stay for your next vacation? We got you!</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={handleClickExplore}>Explore</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Home
