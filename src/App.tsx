import Header from "./components/Header";
import styles from "./styles.module.scss"
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import {defaultPlayList} from "./constant.ts";
import {useState} from "react";

function App() {
    const [ playList, setPlayList ] = useState(defaultPlayList);

    return (
        <div className={styles.app}>
            <div className={styles.playerWrapper}>
                <Header>
                    正在播放：xxx
                    <span style={{marginLeft: "auto"}}>12:36</span>
                </Header>
                <Player/>
            </div>
            <div className={styles.playerListWrapper}>
                <Header>
                    播放列表
                </Header>
                <PlayList playList={playList} />
            </div>
        </div>
    )
}

export default App
