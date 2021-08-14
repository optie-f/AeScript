// Copyright © 2021 Optie. All rights reserved.

function main() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    }
    const newSolid = activeItem.layers.addSolid(
        [0, 0, 0],
        'Solid',
        activeItem.width,
        activeItem.height,
        activeItem.pixelAspect,
        activeItem.duration
    )

    if (activeItem.selectedLayers.length === 0) {
        newSolid.moveToBeginning()
    } else {
        const topOfSelected = activeItem.selectedLayers[0]
        newSolid.moveBefore(topOfSelected)
    }
}

main()
