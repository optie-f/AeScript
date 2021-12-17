/** Copyright © 2021 Optie. All rights reserved. */

/**
 * アクティブなコンポジションに、目標点を null に設定した camera を追加する
 */
function addNullCamera() {
    const activeItem = app.project.activeItem

    if (!(activeItem instanceof CompItem)) {
        return
    }

    const newNull = activeItem.layers.addNull(activeItem.duration)
    newNull.name = 'Target Null'
    newNull.threeDLayer = true

    const pos = newNull.position.value

    const targetCamera: CameraLayer = activeItem.layers.addCamera(
        'Targeting Camera',
        [pos[0], pos[1]]
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    targetCamera
        .property('ADBE Transform Group')
        .property('ADBE Position')
        // @ts-ignore
        .setValue([pos[0], pos[1], targetCamera.position.value[2]])

    targetCamera
        .property('ADBE Transform Group')
        // @ts-ignore
        .property('ADBE Anchor Point').expression =
        'thisComp.layer("Target Null").position'
}

addNullCamera()
