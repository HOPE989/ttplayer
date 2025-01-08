import React, {FC} from "react";
import {PlayListItem} from "../../constant.ts";
import styles from "./styles.module.scss"
import classNames from "classnames";

interface Props {
    playItem: PlayListItem,
    setPlayItem: (value: (((prevState: PlayListItem) => PlayListItem) | PlayListItem)) => void,
    onUpload: React.ChangeEventHandler<HTMLInputElement>,
    playList: Set<PlayListItem>
}

const PlayList: FC<Props> = (props) => {
    const {playList, playItem, setPlayItem, onUpload} = props

    return (
        <div className={styles.listWrapper}>
            <ul className={styles.list}>
                {(Array.from(playList)).map((audio, index) => (
                    <li key={audio.url}
                        className={classNames({[styles.active]: playItem.url === audio.url})}
                        onClick={() => setPlayItem(audio)}
                    >
                        {index + 1}. {audio.name}
                    </li>
                ))}
            </ul>
            <div className={styles.upload}>
                <label>
                    <span>添加</span>
                    <input type="file" onChange={onUpload} accept="audio/*" multiple/>
                </label>
            </div>
        </div>
    )
}

export default PlayList