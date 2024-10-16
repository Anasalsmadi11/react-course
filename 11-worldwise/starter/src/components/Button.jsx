import styles from './Button.module.css' // type csm to auto imprt

function Button({children, onClick, type}) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`} >
            {children}
        </button>
    )
}

export default Button
