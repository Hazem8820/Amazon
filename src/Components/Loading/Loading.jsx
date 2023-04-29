import React from 'react'
import loadinglogo from '../../images/image_processing20210430-25202-1ercy3j.gif'
export default function Loading() {
    return <>
        <img src={loadinglogo} className='w-100 position-relative top-0 bottom-0 start-0 end-0' alt="loadinglogo" />
    </>
}
