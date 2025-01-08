import {clearCanvas, clearFloats, drawBars, drawFloats} from "./drawUtils.ts";
import {useRef} from "react";

const useAudioVisualization = (selector: string, length = 50) => {
    const audioCtxRef = useRef<AudioContext>();
    const analyserRef = useRef<AnalyserNode>()
    const requestAnimateFrameIdRef = useRef<number>();

    const drawEachFrame = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array) => {
        requestAnimateFrameIdRef.current = requestAnimationFrame(() => drawEachFrame(canvasEl, dataArray));

        if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray)
            const bars = dataArray.slice(0, Math.min(length, dataArray.length));

            clearCanvas(canvasEl);
            drawFloats(canvasEl, bars);
            drawBars(canvasEl, bars);
        }
    }

    const visualize = (stream: MediaStream) => {
        const canvasEl: HTMLCanvasElement | null = document.querySelector(selector);
        if (!canvasEl) {
            throw new Error("Can't find canvas element");
        }

        audioCtxRef.current = new AudioContext()
        analyserRef.current = audioCtxRef.current.createAnalyser()

        const source = audioCtxRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        // 针对火狐浏览器的bug
        // @ts-ignore
        if (typeof InstallTrigger !== 'undefined') {
            source.connect(audioCtxRef.current.destination);
        }

        analyserRef.current.fftSize = 256
        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength);

        drawEachFrame(canvasEl, dataArray);
    }

    const resetCanvas = () => {
        const canvasEl: HTMLCanvasElement | null = document.querySelector(selector);
        if (canvasEl) {
            const emptyDataArray = (new Uint8Array(length)).map(() => 0);
            clearFloats();
            clearCanvas(canvasEl);
            drawFloats(canvasEl, emptyDataArray);
        }
    }

    const stopVisualize = () => {
        if(requestAnimateFrameIdRef.current) {
            window.cancelAnimationFrame(requestAnimateFrameIdRef.current)
            resetCanvas()
        }
    }

    return {
        visualize,
        stopVisualize,
        resetCanvas,
        requestAnimateFrameId: requestAnimateFrameIdRef.current,
    }
}

export default useAudioVisualization;