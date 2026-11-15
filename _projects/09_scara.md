---
layout: page
title: Vision-Guided SCARA Pick-and-Place
description: Low-cost industrial arm with sub-millimeter repeatability · Shuangyuan Optoelectronics
img: assets/img/covers/scara.jpg
importance: 8
category: engineering
---

**Robotics Engineer Intern, Shuangyuan Optoelectronics Tech Co.** (Guangdong, China) · Jul. 2021 – Aug. 2021

The company needed a low-cost robot to pick up display panels. I built a SCARA arm that finds each part with a camera, then aligns and picks it with suction cups — and wrote the documentation for the team that took it over.

<div class="row">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/scara_arm.jpg" title="SCARA arm" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/scara.jpg" title="End effector" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: the SCARA arm from above. Right: the end effector — a brushless gimbal and a servo carrying two suction cups, with the camera between them.
</div>

### Hardware

- **Arm:** a 3-DoF SCARA — two servo motors for the X–Y plane and one for Z.
- **Gripper:** a brushless gimbal rotates the dual suction cups about Z, and a digital servo tilts them so the arm can pick panels lying flat or standing vertically.
- **Vision:** a camera mounted on the end effector, between the suction cups, with LED lighting.
- I assembled the actuators, designed the CAD parts, and wrote the serial drivers for the arm, gimbal and servo (including the gimbal's CRC-checked protocol).

### Vision and control

<div class="row">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/scara_effector_lit.jpg" title="Camera and lighting" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0 d-flex align-items-center">
        {% include figure.liquid path="assets/img/projects/scara_marker.jpg" title="Fiducial marker" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: the end-effector camera with its LED ring. Right: the circle-and-cross marker the vision system locks onto.
</div>

- **Marker detection:** OpenCV finds the circle with a Hough circle transform and the cross with a Hough line transform; the intersection of the lines gives the target's center and orientation.
- **Hand–eye calibration:** in an ideal build the camera center would coincide with the tool center. In practice it does not, so a calibration routine estimates the offset, and a 3×3 affine transform maps camera coordinates into the arm's coordinate frame.
- **Inverse kinematics:** joint angles for a target point are solved numerically, and the gimbal angle compensates for the rotation the first two joints introduce.
- **Control software:** a multithreaded Python controller runs the camera, arm, gimbal and servo concurrently, so the arm keeps tracking the marker as it moves.
- **Transparent parts:** detected transparent objects by fusing bright pixels under changing lighting.
- **Result:** sub-millimeter repeatability (0.15 mm).
