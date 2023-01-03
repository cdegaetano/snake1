namespace SpriteKind {
    export const Tail = SpriteKind.create()
}
function setupMenu () {
    menu = true
    walls = true
    title = textsprite.create("SNAKE", 0, 10)
    title.setPosition(20, 20)
    title.setMaxFontHeight(40)
    wallsOnText = textsprite.create("Walls On", 0, 1)
    wallsOnText.setPosition(76, 66)
    wallsOnText.setBorder(1, 1, 2)
    wallsOffText = textsprite.create("Walls Off", 0, 1)
    wallsOffText.setPosition(76, 86)
    wallsOffText.setBorder(1, 0, 2)
    pressAText = textsprite.create("Press A to start", 0, 10)
    pressAText.setPosition(80, 106)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu) {
        music.footstep.play()
        walls = true
        wallsOnText.setBorder(1, 1, 2)
        wallsOffText.setBorder(1, 0, 2)
    } else {
        if (!(direction == "down")) {
            if (!(controller.left.isPressed() || controller.right.isPressed())) {
                direction = "up"
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tail, function (sprite, otherSprite) {
    info.setScore(score)
    game.over(false)
})
function moveApple () {
    apple.setPosition(4 + randint(0, 19) * 8, 4 + randint(0, 14) * 8)
    for (let value of tailParts) {
        while (apple.overlapsWith(value) || apple.overlapsWith(snake)) {
            apple.setPosition(4 + randint(0, 19) * 8, 4 + randint(0, 14) * 8)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu) {
        music.playMelody("E A - - - - - - ", 360)
        title.destroy()
        pressAText.destroy()
        wallsOnText.destroy()
        wallsOffText.destroy()
        menu = false
        apple = sprites.create(img`
            . . a a . . 
            . a a a a . 
            a a a a a a 
            a a a a a a 
            . a a a a . 
            . . a a . . 
            `, SpriteKind.Food)
        setupSnake()
        moveApple()
    } else {
        game.splash("Score: " + score)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(menu)) {
        if (!(direction == "right")) {
            if (!(controller.up.isPressed() || controller.down.isPressed())) {
                direction = "left"
            }
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(menu)) {
        if (!(direction == "left")) {
            if (!(controller.up.isPressed() || controller.down.isPressed())) {
                direction = "right"
            }
        }
    }
})
function moveSnake () {
    tailPart = sprites.create(img`
        . a a a a a a . 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        . a a a a a a . 
        `, SpriteKind.Tail)
    if (direction == "left") {
        snake.setImage(img`
            . a a a a a a . 
            a a a a a a a a 
            a a a a a 1 a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            . a a a a a a . 
            `)
        snake.x += -8
        tailPart.x = snake.x + 8
        tailPart.y = snake.y
    } else if (direction == "right") {
        snake.setImage(img`
            . a a a a a a . 
            a a a a a a a a 
            a a 1 a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            . a a a a a a . 
            `)
        snake.x += 8
        tailPart.x = snake.x - 8
        tailPart.y = snake.y
    } else if (direction == "up") {
        snake.setImage(img`
            . a a a a a a . 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a 1 a a 
            a a a a a a a a 
            . a a a a a a . 
            `)
        snake.y += -8
        tailPart.y = snake.y + 8
        tailPart.x = snake.x
    } else if (direction == "down") {
        snake.setImage(img`
            . a a a a a a . 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a 1 a a a a a 
            a a a a a a a a 
            . a a a a a a . 
            `)
        snake.y += 8
        tailPart.y = snake.y - 8
        tailPart.x = snake.x
    }
    tailParts.unshift(tailPart)
    checkBorders()
    if (snake.overlapsWith(apple)) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
        score += 1
        moveApple()
    } else {
        tailParts.pop().destroy()
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu) {
        music.footstep.play()
        walls = false
        wallsOnText.setBorder(1, 0, 2)
        wallsOffText.setBorder(1, 1, 2)
    } else {
        if (!(direction == "up")) {
            if (!(controller.left.isPressed() || controller.right.isPressed())) {
                direction = "down"
            }
        }
    }
})
function setupSnake () {
    snake = sprites.create(img`
        . a a a a a a . 
        a a a a a a a a 
        a a a a a 1 a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        . a a a a a a . 
        `, SpriteKind.Player)
    snake.setPosition(68, 60)
    tailParts = []
    for (let index = 0; index <= 2; index++) {
        tailPart = sprites.create(img`
            . a a a a a a . 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            a a a a a a a a 
            . a a a a a a . 
            `, SpriteKind.Tail)
        tailPart.x = snake.x + (index + 1) * 8
        tailParts.push(tailPart)
    }
    direction = "left"
}
function checkBorders () {
    if (snake.x < 0) {
        if (walls) {
            info.setScore(score)
            game.over(false)
        } else {
            snake.x = 156
        }
    } else if (snake.x > 160) {
        if (walls) {
            info.setScore(score)
            game.over(false)
        } else {
            snake.x = 4
        }
    } else if (snake.y < 0) {
        if (walls) {
            info.setScore(score)
            game.over(false)
        } else {
            snake.y = 116
        }
    } else if (snake.y > 120) {
        if (walls) {
            info.setScore(score)
            game.over(false)
        } else {
            snake.y = 4
        }
    }
}
let tailPart: Sprite = null
let snake: Sprite = null
let tailParts: Sprite[] = []
let apple: Sprite = null
let direction = ""
let pressAText: TextSprite = null
let wallsOffText: TextSprite = null
let wallsOnText: TextSprite = null
let title: TextSprite = null
let walls = false
let menu = false
let score = 0
color.setPalette(
color.GrayScale
)
scene.setBackgroundColor(4)
setupMenu()
score = 0
game.onUpdateInterval(200, function () {
    if (!(menu)) {
        moveSnake()
    }
})
