import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import Tippy from '@tippyjs/react';

import { MENU_ITEMS } from '@/constants'
import styles from './index.module.css'
import { actionItemClick, menuItemClick } from '@/Redux/slice/menuSlice'
import { socket } from '@/socket';
import { LuArrowDownRight, LuCircle, LuDownload, LuEraser,  LuHexagon,  LuPencil, LuRotateCcw, LuRotateCw, LuSquare } from "react-icons/lu";
import { PiParallelogramBold } from "react-icons/pi";

import 'tippy.js/dist/tippy.css';


const Menu = () => {
    const dispatch = useDispatch()
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)

    const handleMenuClick = (itemName) => {
        console.log(Math.random())
        dispatch(menuItemClick(itemName))
        socket.emit('menuChange', itemName)
    }

    const handleActionClick = (itemName) => {
        dispatch(actionItemClick(itemName))
    }

    useEffect(() => {
        socket.on('menuChange', (itemName) => dispatch(menuItemClick(itemName)))
        return () => {
            socket.off('menuChange')
        }
    }, [])


    return (
        <div className={styles.menuContainer}>


            <Tippy content="Pencil">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL })}>
                    <span><LuPencil className={styles.icon} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)} /></span>
                </div>
            </Tippy>


            <Tippy content="Eraser">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.ERASER })}>
                    <LuEraser  className={styles.icon} onClick={() => handleMenuClick(MENU_ITEMS.ERASER)} />
                </div>
            </Tippy>

            <Tippy content="Undo">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.UNDO })} >
                    <LuRotateCcw className={styles.icon} onClick={() => { handleActionClick(MENU_ITEMS.UNDO) }}/>
                </div>
            </Tippy>

            <Tippy content="Redo">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.REDO })}>
                    <LuRotateCw  className={styles.icon} onClick={() => { handleActionClick(MENU_ITEMS.REDO) }}/>
                </div>
            </Tippy>

            <Tippy content="Square">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.SQUARE })} >
                    <LuSquare className={styles.icon} onClick={() => { handleMenuClick(MENU_ITEMS.SQUARE) }}/>
                </div>
            </Tippy>

            <Tippy content="Circle">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.CIRCLE })} >
                    <LuCircle className={styles.icon} onClick={() => { handleMenuClick(MENU_ITEMS.CIRCLE) }}/>
                </div>
            </Tippy>

            <Tippy content="Arrow">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.ARROW })} >
                    <LuArrowDownRight className={styles.icon} onClick={() => { handleMenuClick(MENU_ITEMS.ARROW) }}/>
                </div>
            </Tippy>

            <Tippy content="Hexagon">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.HEXAGON })} >
                    <LuHexagon className={styles.icon} onClick={() => { handleMenuClick(MENU_ITEMS.HEXAGON) }}/>
                </div>
            </Tippy>

            <Tippy content="Paralellogram">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.PARALLELOGRAM })} >
                    <PiParallelogramBold className={styles.icon} onClick={() => { handleMenuClick(MENU_ITEMS.PARALLELOGRAM) }}/>
                </div>
            </Tippy>

            <Tippy content="Download">
                <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.DOWNLOAD })} >
                    <LuDownload className={styles.icon} onClick={() => { handleActionClick(MENU_ITEMS.DOWNLOAD) }}/>
                </div>
            </Tippy>
        </div>
    )
}

export default Menu