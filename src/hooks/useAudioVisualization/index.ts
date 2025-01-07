import {clearCanvas, clearFloats, drawFloats} from "./drawUtils.ts";

const useAudioVisualization = (selector: string, length = 50) => {


    const resetCanvas = () => {
        const canvasEl: HTMLCanvasElement | null = document.querySelector(selector);
        if (canvasEl) {
            const emptyDataArray = (new Uint8Array(length)).map(() => 0);
            clearFloats();
            clearCanvas(canvasEl);
            drawFloats(canvasEl, emptyDataArray);
        }
    }

    return {
        resetCanvas,
    }
}

export default useAudioVisualization;