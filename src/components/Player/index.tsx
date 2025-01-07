import React, {Ref} from "react";
import styles from "./styles.module.scss"

interface Props {

}

const Player = React.forwardRef((props: Props, audioRef: Ref<HTMLAudioElement>) => {

    return (
        <div className={styles.player}>
            <div className={styles.canvas}>
                <canvas width={500} height={300}/>
            </div>
            <div className={styles.controls}>
                <audio src="../../../../ttplayer-main/src/assets/zheshijienameduoren.flac" controls></audio>
            </div>
        </div>
    )
})

export default Player