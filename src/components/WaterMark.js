import React from 'react'
import '../assets/css/watermark.css'

const WaterMark = (props) => {
    let watermark = 'Water Mark'
    switch(props.stage) {
        case 'stage-0':
            watermark='Just Added!'
            break
        case 'stage-1':
            watermark = 'Approved By User!'
            break
        case 'stage-2':
            watermark = 'Approved By Marketing Manager!'
            break
        case 'stage-3':
            watermark = 'Approved By Manager!'
            break
        default:
            watermark = 'Water Mark'
            break
    }
    
    
    return props.stage ? <div className='watermark-container'>
    <p>{watermark}</p>
</div> : null
}

export default WaterMark