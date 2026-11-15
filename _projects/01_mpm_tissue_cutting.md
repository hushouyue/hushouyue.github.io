---
layout: page
title: Real-time MPM Tissue Cutting Simulation
description: Predicting tissue deformation and electrosurgical cutting before the robot cuts · IMERSE Lab, JHU
img: assets/img/covers/mpm.jpg
importance: 1
category: research
---

**Research Assistant, IMERSE Lab, Johns Hopkins University** (advisor: Axel Krieger) · Nov. 2025 – present

The kidney simulation below is from my NVIDIA Warp rewrite; the porcine tongue simulation is from the earlier Taichi/Genesis implementation used in the HSMR 2026 work.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/arpah_kidney_real.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/mpm_soft_rigid.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    Real vs. simulated. Left: autonomous robotic tumor resection on a kidney phantom, with electrosurgical tool, vacuum grasper and suction (clip from ARPA-H, <a href="https://www.youtube.com/watch?v=z96ZQ39aNtI">"Watch this robot perform tumor surgery on a phantom kidney" [SARRTS Project Mini-Doc]</a>, YouTube). Right: ours — simulation of the same setup, with soft–rigid coupling between tissue and tools; particles colored by internal stress (blue to red); blackened particles mark thermal damage.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include video.liquid path="assets/video/tongue_real_vs_sim.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    Top: electrosurgical cutting on an ex vivo porcine tongue, from previous IMERSE Lab studies. Bottom: ours — MPM simulation of the same cut (Taichi/Genesis version).
</div>

- Built an early real-time Material Point Method (MPM) simulation in Taichi {% cite hu2019taichi --file references %} and Genesis {% cite genesis2024 --file references %} that predicts tissue deformation and electrosurgical cutting before the robot cuts: **20 Hz on a 178k-particle porcine tongue model**, used to improve autonomous cutting accuracy {% cite kilmer2026mpmcutting %}, presented as an oral at HSMR 2026.
- Rewrote and optimized the simulator in NVIDIA Warp {% cite macklin2022warp --file references %}; the kidney simulation above comes from this Warp version.
- Modeled tissue deformation, electrocautery and suction for partial nephrectomy, with parameter inference from CT scans, validated on ex vivo kidney.
- Contributed simulation to [ARTS](https://arxiv.org/abs/2611.15135), an open-source three-arm laparoscopic robot platform for surgical autonomy research.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/mpm_phantom.jpg" title="Kidney phantom setup" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Physical setup being simulated: electrosurgical instrument, vacuum grasper and suction on a kidney phantom.
</div>

#### References

<div class="publications">

{% bibliography --cited --group_by none %}
{% bibliography --file references --cited --group_by none %}

</div>

