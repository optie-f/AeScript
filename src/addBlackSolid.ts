// Copyright © 2021 Optie. All rights reserved.

function addBlackSolid() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    }

    // レイヤーを選択していればその上に追加したいが、レイヤーを追加すると選択が移るため、先に取得する
    const topOfSelected = activeItem.selectedLayers[0]

    const newSolid = activeItem.layers.addSolid(
        [0, 0, 0],
        'Solid',
        activeItem.width,
        activeItem.height,
        activeItem.pixelAspect,
        activeItem.duration
    )

    if (topOfSelected === undefined) {
        newSolid.moveToBeginning()
    } else {
        newSolid.moveBefore(topOfSelected)
    }
}

addBlackSolid()
