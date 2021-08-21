/** Copyright © 2021 Optie. All rights reserved. */

/**
 * 選択したレイヤーのアウトポイントをインポイントの 1 秒後にする
 */
function cutSelectedLayersIntoOneSecond() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    } else if (activeItem.selectedLayers.length === 0) {
        return
    }

    const selectedLayers = activeItem.selectedLayers

    selectedLayers.forEach((layer) => {
        layer.outPoint = layer.inPoint + 1
    })
}

cutSelectedLayersIntoOneSecond()
