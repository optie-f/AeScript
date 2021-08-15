/** Copyright © 2021 Optie. All rights reserved. */
import 'extendscript-es5-shim-ts'

/**
 * 選択した複数レイヤーの上下関係を反転する。
 */
function reverseOrderOfSelectedLayer() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    }

    const selectedLayers = activeItem.selectedLayers
    // 選択順に入っている配列を、インデックス昇順（階層において上にあるものが先頭）に並び替える
    selectedLayers.sort((l_a, l_b) => l_a.index - l_b.index)

    const N = selectedLayers.length
    for (let i = 0; i < N / 2; i++) {
        // 選択範囲で上から i 番目のレイヤーと、下から i 番目のレイヤーをスワップしていく
        const upper = selectedLayers[i]
        const lower = selectedLayers[N - i - 1]
        if (upper === lower) {
            break
        }
        // 上側レイヤーを下側レイヤーの直上に動かす。この操作で下側レイヤーの index は不変。
        const upperIndex = upper.index
        upper.moveBefore(lower)
        // ここで、上側レイヤーの移動範囲にあるレイヤーの index は 1 下がっている（だるま落とし）。そのため、
        // この時点での upperIndex にあるレイヤーは、本来の上側レイヤーの直下にあるべきものなので、 moveBefore で差し込むとよい
        lower.moveBefore(activeItem.layer(upperIndex))
    }
}

reverseOrderOfSelectedLayer()
