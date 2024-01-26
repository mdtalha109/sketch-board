import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown, faSquare, faCircle } from '@fortawesome/free-solid-svg-icons'

import { MENU_ITEMS } from '@/constants'
import styles from './index.module.css'
import { actionItemClick, menuItemClick } from '@/Redux/slice/menuSlice'


const Menu = () => {
    const dispatch = useDispatch()
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)

    const handleMenuClick = (itemName) => {
        dispatch(menuItemClick(itemName))
    }

    const handleActionClick = (itemName) => {
        dispatch(actionItemClick(itemName))
    }
    

    return (
        <div className={styles.menuContainer}>
            <div className={cx(styles.iconWrapper, {[styles.active]: activeMenuItem === MENU_ITEMS.PENCIL})}>
                <FontAwesomeIcon icon={faPencil} className={styles.icon} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)} />
            </div>
            <div className={cx(styles.iconWrapper, {[styles.active]: activeMenuItem === MENU_ITEMS.ERASER})}>
                <FontAwesomeIcon icon={faEraser} className={styles.icon} onClick={() => handleMenuClick(MENU_ITEMS.ERASER)} />
            </div>
            <div className={styles.iconWrapper} onClick={()=> {handleActionClick(MENU_ITEMS.UNDO)}}>
                <FontAwesomeIcon icon={faRotateLeft} className={styles.icon}  />
            </div>
            <div className={styles.iconWrapper} onClick={()=> {handleActionClick(MENU_ITEMS.REDO)}}>
                <FontAwesomeIcon icon={faRotateRight} className={styles.icon}  />
            </div>
            <div className={styles.iconWrapper} onClick={()=> {handleActionClick(MENU_ITEMS.DOWNLOAD)}}>
                <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={()=> {handleMenuClick(MENU_ITEMS.SQUARE)}}>
                <FontAwesomeIcon icon={faSquare} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={()=> {handleMenuClick(MENU_ITEMS.CIRCLE)}}>
                <FontAwesomeIcon icon={faCircle} className={styles.icon} />
            </div>
            
        </div>
    )
}

export default Menu