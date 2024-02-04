import { faHand, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './index.module.css'
import { useDispatch } from 'react-redux'
import { menuItemClick } from '@/Redux/slice/menuSlice'
import { VIEW_CONTROL } from '@/constants'
import { setZoom } from '@/Redux/slice/viewControlSlice'


const ZoomPan = () => {

    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <div className={styles.containerItem} onClick={()=> dispatch(setZoom(1.1))}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />  
            </div>

            <div className={styles.containerItem}>
                <FontAwesomeIcon icon={faHand} />   
            </div>

        </div>
    )
}

export default ZoomPan