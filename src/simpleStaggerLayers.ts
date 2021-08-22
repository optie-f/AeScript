/** Copyright © 2021 Optie. All rights reserved. */

/**
 * 選択したレイヤーを、現在時刻から、コンポジション上で下から順番に階段状にする。
 * レイヤーのインポイントが下のレイヤーのアウトポイントと一致するようにする。
 */
export function simpleStaggerLayers(): void {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    } else if (activeItem.selectedLayers.length === 0) {
        return
    }

    const selectedLayers = activeItem.selectedLayers
    // 選択順に入っている配列を、インデックス降順（階層において下にあるものが先頭）に並び替える
    selectedLayers.sort((l_a, l_b) => l_b.index - l_a.index)

    selectedLayers.forEach((layer, index) => {
        const duration = Math.abs(layer.inPoint - layer.outPoint)

        const deltaInAndStart = layer.inPoint - layer.startTime
        layer.startTime =
            index === 0 ? activeItem.time : selectedLayers[index - 1].outPoint
        layer.startTime -= deltaInAndStart

        layer.outPoint = layer.inPoint + duration
    })
}

simpleStaggerLayers()
