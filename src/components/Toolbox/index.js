import React from 'react'
import styles from './index.module.css'
import { COLORS, MENU_ITEMS } from '@/constants'
import cx from 'classnames';
import { useSelector } from 'react-redux';

const Toolbox = () => {

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER 

    
    const updateBrushSize = (e) => {

    }


    const updateColor = () => {
 
    }

    return (
        <div className={styles.toolboxContainer}>
            {showStrokeToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Stroke</h4>
                <div className={styles.itemContainer}>
                    <div className={cx(styles.colorBox,)} style={{ backgroundColor: COLORS.BLACK }} onClick={() => updateColor(COLORS.BLACK)} />
                    <div className={cx(styles.colorBox)} style={{ backgroundColor: COLORS.RED }} onClick={() => updateColor(COLORS.RED)} />
                    <div className={cx(styles.colorBox)} style={{ backgroundColor: COLORS.GREEN }} onClick={() => updateColor(COLORS.GREEN)} />
                    <div className={cx(styles.colorBox)} style={{ backgroundColor: COLORS.BLUE }} onClick={() => updateColor(COLORS.BLUE)} />
                    <div className={cx(styles.colorBox)} style={{ backgroundColor: COLORS.ORANGE }} onClick={() => updateColor(COLORS.ORANGE)} />
                    <div className={cx(styles.colorBox)} style={{ backgroundColor: COLORS.YELLOW }} onClick={() => updateColor(COLORS.YELLOW)} />
                </div>
            </div>}
            

            {showBrushToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Brush Size: {activeMenuItem}</h4>
                <div className={styles.itemContainer}>
                    <input type='range' min={1} max={10} onChnage={updateBrushSize} />
                </div>
            </div>}
            
        </div>
    )
}

export default Toolbox