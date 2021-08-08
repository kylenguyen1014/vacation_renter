import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { ReactElement } from 'react'

function SkeletonLoading(): ReactElement {
    return (
        <Box>
            <Skeleton height={100} variant='rect'/>
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </Box>
    )
}

export default SkeletonLoading
