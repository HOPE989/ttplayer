import {FC, HTMLAttributes} from "react";
import styles from  "./styles.module.scss"

type Props = HTMLAttributes<HTMLHeadElement>


const Header: FC<Props> = (props) => {

    return (
        <header className={styles.header}>
            {props.children}
        </header>
    )
}

export default Header