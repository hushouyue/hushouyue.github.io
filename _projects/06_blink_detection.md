---
layout: page
title: Real-time Blink Detection
description: Embedded eye tracking and cognitive-load sensing · ÉTS Montréal
img: assets/img/covers/blink.jpg
importance: 7
category: research
---

**Research Assistant, École de technologie supérieure** (advisor: David St-Onge) · Feb. 2023 – Aug. 2023

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/blink.jpg" title="Blink detection" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

- Proposed a dynamic-programming blink detection algorithm that removes the redundant computation of sliding-window methods; runs at 50 Hz on embedded devices.
- Built a ROS package for an eye-tracking device, and CNN classifiers of cognitive load from audio spectrograms; synchronized timestamps across sensors.

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include video.liquid path="assets/video/blink_result.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    Live detection on streamed pupil-diameter data (left eye, right eye, filtered combined); detected blinks are highlighted and numbered as they arrive.
</div>

Code: [bsyh/blink_detect_live](https://github.com/bsyh/blink_detect_live)
