---
layout: page
title: Hexapod Spider Robot
description: Porting an open-source hexapod to Raspberry Pi, with redesigned parts and remote control · Personal project
img: assets/img/covers/hexapod.jpg
importance: 9
category: engineering
---

Personal project, 2021–2022 · Code: [bsyh/hexapod-raspberrypi](https://github.com/bsyh/hexapod-raspberrypi), [bsyh/hexapod-rbp](https://github.com/bsyh/hexapod-rbp)

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include video.liquid path="assets/video/hexapod_walk.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    Walking mode.
</div>

The robot is based on SmallpTsai's open-source hexapod (GPL), which originally ran on a LinkIt 7697 microcontroller. I ported it to a Raspberry Pi 4B, rebuilt the electronics around it, redesigned several printed parts, and added remote control and a depth camera.

### Electronics

- **18 servos** (TowerPro MG92B), three per leg. The Raspberry Pi has only one hardware PWM channel, so two **PCA9685** boards drive the servos over I²C.
- **Power** from a 3S LiPo (11.1 V) through three DC–DC step-down regulators (5 V, 5 A): one for the Pi and one for each PCA9685 board.
- A **WIT JY61P angle sensor** on I²C reports the body's orientation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/hexapod_leg_test.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/hexapod_imu.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true %}
    </div>
</div>
<div class="caption">
    Left: testing the leg servos on the Raspberry Pi. Right: the angle sensor streaming body orientation as the robot is tilted.
</div>

### Mechanical redesign

The body was 3D printed in Somos Imagine 8000 by a print service. Some of the original parts were too thin at the edges and cracked when printed, so I published a fixed set of models:

- thickened the thigh and lower leg around the screw holes, where prints tended to fail;
- added mounting holes on the top plate for the Raspberry Pi;
- redesigned a flat surface on the body center for the angle sensor;
- added new foot styles.

### Software

- **Motion server:** a socket server on the Pi receives movement commands and drives the actuators through the PWM boards.
- **Remote control:** a USB joystick client sends movement commands to the server.
- **Depth camera:** a server–client pair streams an Intel RealSense D435i from the robot.
- One script starts all components.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include video.liquid path="assets/video/hexapod_remote.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true %}
    </div>
</div>
<div class="caption">
    The complete robot.
</div>
