import Header from "./components/Header";
import styles from "./styles.module.scss"
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import {defaultPlayList, PlayListItem} from "./constant.ts";
import {ChangeEventHandler, useEffect, useRef, useState} from "react";
import {padLeft} from "./utils.ts";
import useAudioVisualization from "./hooks/useAudioVisualization";

function App() {
    const { visualize, stopVisualize, resetCanvas } = useAudioVisualization("#canvas", 50);
    const [ playList, setPlayList ] = useState<PlayListItem[]>(defaultPlayList);
    const [ currTime, setCurrTime ] = useState<string>("00:00");
    const [currAudio,setCurrAudio] = useState<PlayListItem>(defaultPlayList[0]);

    const audioRef = useRef<HTMLAudioElement>(null);

    const onPlay = async () => {
      if(audioRef.current){
          stopVisualize()
          await audioRef.current.play();
          const audioEl = audioRef.current as any;
          const stream = audioEl.mozCaptureStream ? audioEl.mozCaptureStream : audioEl.captureStream();
          visualize(stream);
      }
    }

    const onPause= async () => {
        resetCanvas();
    }

    const onUpload:ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.files){
            const [file] = e.target.files;
            const blobUrl = URL.createObjectURL(file);
            const [fileName] = file.name.split(".");
            setCurrAudio({name: fileName, url: blobUrl});
            setPlayList([...playList, {name: fileName, url: blobUrl}]);
        }
    }

    useEffect(() => {
        const id = setInterval(() => {
            if (audioRef.current) {
                const currentTime = audioRef.current.currentTime;
                const minute = Math.floor(currentTime / 60);
                const second = Math.floor(currentTime % 60);
                setCurrTime(`${padLeft(minute)}:${padLeft(second)}`);
                // console.log("currTime:", currTime);
            }
        }, 500)
        return () => window.clearInterval(id);
    }, [])

    useEffect(() => {
        resetCanvas();
        return () => {
            stopVisualize();
        }
    }, []);

    return (
        <div className={styles.app}>
            <div className={styles.playerWrapper}>
                <Header>
                    正在播放：{currAudio.name}
                    <span style={{marginLeft: "auto"}}>{currTime}</span>
                </Header>
                <Player ref={audioRef} onPlay={onPlay} onPause={onPause} playItem={currAudio} />
            </div>
            <div className={styles.playerListWrapper}>
                <Header>
                    播放列表
                </Header>
                <PlayList playList={playList} onUpload={onUpload} playItem={currAudio} setPlayItem={setCurrAudio} />
            </div>
        </div>
    )
}

export default App
