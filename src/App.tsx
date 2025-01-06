import Header from "./components/Header";
import styles from "./styles.module.scss"

function App() {

    return (
        <div className={styles.app}>
            <div className={styles.playerWrapper}>
                <Header>
                    正在播放：
                </Header>
                player
            </div>
            <div className={styles.playerListWrapper}>
                header
                playlist
            </div>
        </div>
    )
}

export default App
