---
layout: page
title: Surgical Suturing Simulation
description: Deformation, cutting, needle insertion and knot tying in one real-time scene
img: assets/img/covers/suture.jpg
importance: 2
category: research
---

The simulated robot is modeled on ARTS {% cite ge2026arts %}, an open-source three-arm platform for surgical autonomy research. Robot, instruments and tissue are rendered as simplified stand-in geometry.

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include video.liquid path="assets/video/suture_showcase.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    A complete incision-and-suture procedure. The skin starts under pre-tension, which pulls the incision open; the pre-tension is released at wound closure. Insets: robot cell and tissue strain. Plot: wound opening over time.
</div>

- GPU physics engine for surgical simulation, built on NVIDIA Warp {% cite macklin2022warp --file references %} / Newton; runs in real time under teleoperation.
- Soft tissue, suture thread, needle and instruments interact through contact.
- Used to generate synthetic data and to train reinforcement learning and imitation learning policies for autonomous suturing.

#### Individual scenes

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/suture_gape.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/suture_pinch.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    Left: an incision in pre-stretched skin; tension pulls the wound open (blue: skin relaxing, red: stretching). Right: grasping and retracting soft tissue.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/suture_needle.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/suture_knot.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    Left: driving a curved needle through both wound edges. Right: an instrument tie with two needle drivers.
</div>

#### References

<div class="publications">

{% bibliography --cited --group_by none %}
{% bibliography --file references --cited --group_by none %}

</div>
