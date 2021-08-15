/** Copyright © 2021 Optie. All rights reserved. */

/**
 * アクティブなコンポジションに、そのコンポと同サイズの調整レイヤーを追加する。
 * - レイヤーが選択されていない場合、コンポの一番上に、コンポと同じ尺で追加する。
 * - レイヤーが選択されている場合、選択レイヤーの直上に、選択したレイヤーをすべてカバーする尺で追加する。
 */
function addAdjustmentLayer() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    }

    // レイヤーを追加すると選択が移るため、先に取得する
    const selectedLayers = activeItem.selectedLayers

    const newSolid = activeItem.layers.addSolid(
        [1, 1, 1],
        'Adjustment Layer',
        activeItem.width,
        activeItem.height,
        activeItem.pixelAspect,
        activeItem.duration
    )
    newSolid.adjustmentLayer = true
    // Lavender by default
    newSolid.label = 5

    if (selectedLayers.length === 0) {
        newSolid.moveToBeginning()
    } else {
        // 選択レイヤー全体の尺をカバーする + 選択レイヤーの中で最も上にあるレイヤーの直上に置く
        let minInPoint = 10e9
        let maxOutPoint = -10e9
        let topOfSelectedLayers = selectedLayers[0]

        for (const selectedLayer of selectedLayers) {
            minInPoint = Math.min(minInPoint, selectedLayer.inPoint)
            maxOutPoint = Math.max(maxOutPoint, selectedLayer.outPoint)

            if (topOfSelectedLayers.index > selectedLayer.index) {
                topOfSelectedLayers = selectedLayer
            }
        }

        newSolid.inPoint = minInPoint
        newSolid.outPoint = maxOutPoint
        newSolid.moveBefore(topOfSelectedLayers)
    }
}

addAdjustmentLayer()
