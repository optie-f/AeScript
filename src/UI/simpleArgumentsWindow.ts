/** Copyright © 2021 Optie. All rights reserved. */

export function simpleArgumentsWindow(func: (arg: string) => void): void {
    const m = 12
    const [w, h] = [256, 24]
    const win = new Window('palette', 'argument?', [0, 0, w + m * 2, h + m * 2])
    const argumentsForm = win.add('edittext', [m, m, w + m, h + m], '')

    argumentsForm.onEnterKey = function () {
        func(argumentsForm.text)
        win.close()
    }
    argumentsForm.active = true
    win.center()
    win.show()
}
