// Copyright © 2021 Optie. All rights reserved.

function addAdjustmentLayer() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    }

    // レイヤーを選択していればその上に追加したいが、レイヤーを追加すると選択が移るため、先に取得する
    const topOfSelected = activeItem.selectedLayers[0]

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

    if (topOfSelected === undefined) {
        newSolid.moveToBeginning()
    } else {
        newSolid.moveBefore(topOfSelected)
        newSolid.inPoint = topOfSelected.inPoint
        newSolid.outPoint = topOfSelected.outPoint
    }
}

addAdjustmentLayer()
