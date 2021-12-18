/** Copyright © 2021 Optie. All rights reserved. */
import { simpleArgumentsWindow } from './UI/simpleArgumentsWindow'
/**
 * 選択したレイヤーに適用されているマーカーのラベルを 1-origin でインクリメンタルにする.
 * args: <n-digit> | <prefix> <n-digit> | <prefix> <n-digit> <suffix>
 * example: `2` -> C01, 02, ...
 * example: `C 2` -> C01, C02, ...
 * example: `C 2 _main` -> C01_main, C02_main, ...
 */
function alignMarkersByBpm(args: string) {
    const argsArray = args.split(' ')
    const n_args = argsArray.length
    const prefix = n_args <= 1 ? null : argsArray[0]
    const n_digit = parseInt(n_args <= 1 ? argsArray[0] : argsArray[1])
    const suffix = n_args <= 2 ? null : argsArray[2]

    if (isNaN(n_digit) || n_digit < 1) {
        return
    }
    const activeItem = app.project.activeItem

    if (
        !(activeItem instanceof CompItem) ||
        activeItem.selectedLayers.length === 0
    ) {
        return
    }

    const layer = activeItem.selectedLayers[0]
    const newMarkerList = [] as Array<{ time: number; value: MarkerValue }>

    for (let index = 1; index <= layer.marker.numKeys; index++) {
        const zeroPaddedIndex = (
            Array(n_digit + 1).join('0') + index.toString()
        ).substr(-n_digit)

        newMarkerList.push({
            value: new MarkerValue(
                `${prefix ?? ''}${zeroPaddedIndex}${suffix ?? ''}`
            ),
            time: layer.marker.keyTime(index),
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
