/** Copyright © 2021 Optie. All rights reserved. */

/**
 * 選択されているレイヤーの名前を、適用されているエフェクト名に応じて変更する。
 */
export function renameLayersByEffects(): void {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    } else if (activeItem.selectedLayers.length === 0) {
        return
    }

    const selectedLayers = activeItem.selectedLayers

    selectedLayers.forEach((layer) => {
        // エフェクトが乗るタイプのレイヤーであることを保証する
        // ShapeLayer, TextLayer は振る舞いとしては AVLayer を継承したものだが、instanceof では false になるので、個別に判定する必要がある
        if (
            !(
                layer instanceof AVLayer ||
                layer instanceof ShapeLayer ||
                layer instanceof TextLayer
            )
        ) {
            return
        }

        const effectNames = []

        for (let index = 1; index <= layer.effect.numProperties; index++) {
            const effect = layer.effect.property(index)
            effectNames.push(effect.name)
        }

        if (effectNames.length === 0) {
            return
        }

        layer.name = effectNames.join('/')
    })
}

renameLayersByEffects()
