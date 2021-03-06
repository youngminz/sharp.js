﻿var sharp, bird, background, FPSRegulator, FPSFont, smoothX, smoothY;

window.onload = function () {
    sharp = Sharp;
    sharp.init('Game');

    bird = new sharp.sprite('img/bird.png'),
    background = new sharp.sprite('img/background.png'),
    FPSRegulator = new sharp.regulator(2),
    FPSFont = new sharp.font('20px 맑은 고딕', '', new sharp.point(10, 10), '#aaa');
    FPSFont.camera = false;

    sharp.cameraManager(bird, new sharp.point(2000, 800));
    sharp.camera.state = true;

    smoothX = 0,
    smoothY = 0;

    sharp.scene.push(background);
    sharp.scene.push(bird);

    bird.onUpdate = function () {
        var isPressedX = false, isPressedY = false;
        if (sharp.input.getKey('RIGHT') == sharp.input.keyState.KEY_DOWN) {
            smoothX += 0.5;
            isPressedX = true;
        }
        if (sharp.input.getKey('LEFT') == sharp.input.keyState.KEY_DOWN) {
            smoothX -= 0.5;
            isPressedX = true;
        }
        if (sharp.input.getKey('DOWN') == sharp.input.keyState.KEY_DOWN) {
            smoothY += 0.5;
            isPressedY = true;
        }
        if (sharp.input.getKey('UP') == sharp.input.keyState.KEY_DOWN) {
            smoothY -= 0.5;
            isPressedY = true;
        }

        if (sharp.input.getKey('ESCAPE') == sharp.input.keyState.KEY_DOWN) {
            sharp.scene.pop(this);
            return;
        }

        if (isPressedX === false) {
            if (smoothX < 0) {
                smoothX++;
            }
            else if (smoothX > 0) {
                smoothX--;
            }
        }
        if (isPressedY === false) {
            if (smoothY < 0) {
                smoothY++;
            }
            else if (smoothY > 0) {
                smoothY--;
            }
        }

        if (smoothX <= -7) {
            smoothX = -7;
        }
        if (smoothX >= 7) {
            smoothX = 7;
        }
        if (smoothY <= -7) {
            smoothY = -7;
        }
        if (smoothY >= 7) {
            smoothY = 7;
        }
        bird.pos.x += smoothX;
        bird.pos.y += smoothY;
    };

    sharp.onUpdate = function () {
        if (FPSRegulator.isReady()) {
            FPSFont.text = sharp.FPS.FPS.toFixed(2) + ' FPS';
        }
    };

    sharp.onRender = function () {
        background.render();
        bird.render();
        FPSFont.render();
    };
};
