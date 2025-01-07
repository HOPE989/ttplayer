import {FC} from "react";
import {PlayListItem} from "../../constant.ts";
import styles from "./styles.module.scss"

interface Props {
    playList: PlayListItem[];
}

const PlayList: FC<Props> = (props) => {
    const { playList } = props

    return (
        <div className={styles.listWrapper}>
            <ul className={styles.list}>
                {playList.map((audio, index) =>(
                    <li key={audio.url}>
                        {index+1}. {audio.name}
                    </li>
                ))}
            </ul>
            <div className={styles.upload}>
                <label>
                    <span>添加</span>
                    <input type="file" accept="audio/*"/>
                </label>
            </div>
        </div>
    )
}

export default PlayList