import {FC, HTMLAttributes} from "react";

type Props = HTMLAttributes<HTMLHeadElement>


const Header: FC<Props> = (props) => {

    return (
        <header>
            {props.children}
        </header>
    )
}

export default Header