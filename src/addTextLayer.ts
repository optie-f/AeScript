/** Copyright © 2021 Optie. All rights reserved. */

/**
 * アクティブなコンポジションにテキストレイヤーを追加する。
 * - レイヤーが選択されていない場合、コンポの一番上に追加する。
 * - レイヤーが選択されている場合、選択レイヤーの直上に追加する。
 */
function addTextLayer() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    }

    // レイヤーを追加すると選択が移るため、先に取得する
    const selectedLayers = activeItem.selectedLayers

    const newText = activeItem.layers.addText('Text')

    if (selectedLayers.length === 0) {
        newText.moveToBeginning()
    } else {
        let topOfSelectedLayers = selectedLayers[0]

        for (const selectedLayer of selectedLayers) {
            if (topOfSelectedLayers.index > selectedLayer.index) {
                topOfSelectedLayers = selectedLayer
            }
        }

        newText.moveBefore(topOfSelectedLayers)
    }
}

addTextLayer()
