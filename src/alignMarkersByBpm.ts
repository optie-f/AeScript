/** Copyright © 2021 Optie. All rights reserved. */
import { simpleArgumentsWindow } from './UI/simpleArgumentsWindow'
/**
 * 選択したレイヤーに適用されているマーカーを、指定したBPMの拍のうち最も近いものの位置に動かす。
 */
function alignMarkersByBpm(bpmArg: string) {
    const bpm = parseFloat(bpmArg)

    if (isNaN(bpm)) {
        return
    }
    const activeItem = app.project.activeItem

    if (
        !(activeItem instanceof CompItem) ||
        activeItem.selectedLayers.length === 0
    ) {
        return
    }

    const beatPerSec = bpm / 60.0
    const fps = activeItem.frameRate

    const layer = activeItem.selectedLayers[0]
    const newMarkerList = [] as Array<{ time: number; value: MarkerValue }>

    for (let index = 1; index <= layer.marker.numKeys; index++) {
        const markerTime = layer.marker.keyTime(index)
        const markerTimeOnBpm = Math.round(markerTime * beatPerSec) / beatPerSec
        const markerTimeOnBpmAndFps = Math.floor(markerTimeOnBpm * fps) / fps
        newMarkerList.push({
            value: layer.marker.keyValue(index),
            time: markerTimeOnBpmAndFps,
        })
    }

    for (let index = layer.marker.numKeys; index >= 1; index--) {
        layer.marker.removeKey(index)
    }

    newMarkerList.forEach((newMarker) => {
        layer.marker.setValueAtTime(newMarker.time, newMarker.value)
    })
}

simpleArgumentsWindow(alignMarkersByBpm)
