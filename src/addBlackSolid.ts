// Copyright © 2021 Optie. All rights reserved.

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
