/** Copyright © 2021 Optie. All rights reserved. */

/**
 * アクティブなコンポジションに、そのコンポと同尺・同サイズの黒平面を追加する。
 * - レイヤーが選択されていない場合、コンポの一番上に追加する。
 * - レイヤーが選択されている場合、選択レイヤーの直上に追加する。
 */
function addBlackSolid() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    }

    // レイヤーを追加すると選択が移るため、先に取得する
    const selectedLayers = activeItem.selectedLayers

    const newSolid = activeItem.layers.addSolid(
        [0, 0, 0],
        'Solid',
        activeItem.width,
        activeItem.height,
        activeItem.pixelAspect,
        activeItem.duration
    )

    if (selectedLayers.length === 0) {
        newSolid.moveToBeginning()
    } else {
        let topOfSelectedLayers = selectedLayers[0]

        for (const selectedLayer of selectedLayers) {
            if (topOfSelectedLayers.index > selectedLayer.index) {
                topOfSelectedLayers = selectedLayer
            }
        }

        newSolid.moveBefore(topOfSelectedLayers)
    }
}

addBlackSolid()
