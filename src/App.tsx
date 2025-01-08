import Header from "./components/Header";
import styles from "./styles.module.scss"
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import {defaultPlayList, PlayListItem} from "./constant.ts";
import {ChangeEventHandler, useEffect, useRef, useState} from "react";
import {padLeft} from "./utils.ts";
import useAudioVisualization from "./hooks/useAudioVisualization";

const MAX_LENGTH = 30;

function App() {
    const { visualize, stopVisualize, resetCanvas } = useAudioVisualization("#canvas", 50);
    const [ playList, setPlayList ] = useState<Set<PlayListItem>>(new Set(defaultPlayList));
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
            const files: PlayListItem[] = [];
            Array.from(e.target.files).forEach(file => {
                const blobUrl = URL.createObjectURL(file);
                const [fileName] = file.name.split(".");
                const newFile = { name: fileName, url: blobUrl };

                // 只添加不重复的文件
                if (!Array.from(playList).some(item => item.name === newFile.name)) {
                    console.log(newFile);
                    files.push(newFile);
                    setCurrAudio(newFile);
                }
            })
            setPlayList(prevPlayList => new Set([...prevPlayList, ...files]));
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
                    正在播放：{currAudio.name.length > 20? currAudio.name.slice(0, MAX_LENGTH) + "...": currAudio.name}
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
