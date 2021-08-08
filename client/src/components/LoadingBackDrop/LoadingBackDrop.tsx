import { Backdrop, LinearProgress } from '@material-ui/core'
import { ReactElement } from 'react'
import { useIsFetching } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/root-reducer'

function LoadingBackDrop(): ReactElement {
    const fetching = useSelector((state: RootState) => state.fetching)
    const isFetching = useIsFetching()

    return (
        <Backdrop open={fetching.isFetching || isFetching > 0} className='App-backdrop' style={{ zIndex: 1300 }}>
            <LinearProgress color='secondary' />
        </Backdrop>
    )
}

export default LoadingBackDrop
