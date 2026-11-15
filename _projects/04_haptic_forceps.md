---
layout: page
title: "Haptic Force‑Cepx"
description: Real-time simulation and grip-feedback device for da Vinci surgical training · Best Demo, 1st place
img: assets/img/covers/haptic.jpg
importance: 4
category: research
---

**Project lead, Haptic Interface Design, Johns Hopkins University** · Sep. 2025 – Dec. 2025 · **Best Demo Award, 1st place (of 14 teams)** · [Final report (PDF)](/assets/pdf/haptic_force_cepx_report.pdf)

Team: Shouyue Hu, August Phelps, Yuming Xu, Yuwei Liu. I built the simulation, the control algorithm, the two-loop design and the filtering; my teammates built the CAD and the low-level signal processing.

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include video.liquid path="assets/video/haptic_demo.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    Squeezing the gripper grasps simulated tissue in SOFA; the motor pushes back with the tissue's reaction force.
</div>

### Motivation

Robot-assisted surgery is precise and stable, but the surgeon teleoperates the instruments and loses the sense of touch. The da Vinci 5, for example, gives no force feedback when the surgeon squeezes the forceps. Too little grip and tissue slips; too much and delicate tissue is damaged. Prior studies show that grip-force feedback in particular helps users stay near the no-slip threshold, and that pairing haptic devices with physically based soft-tissue models improves surgical training. We set out to build a training system in which a surgeon squeezes a physical gripper, grasps simulated tissue, and feels the tissue's reaction force in real time.

### Device

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/haptic_setup.jpg" title="Grip device with simulation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The grip device (right) connected to the SOFA simulation of a da Vinci instrument grasping tissue (laptop).
</div>

The device is kinesthetic: it acts on the muscle and joint receptors of the hand to create the feeling of squeezing soft tissue. It is built on a LILYGO T-Knob — an ESP32 with a brushless DC (BLDC) motor, a TMC6300 driver and an MT6701 magnetic encoder — with a 3D-printed lever in a direct-drive configuration. Direct drive avoids gear losses, so the gripper is highly backdrivable and feels almost free when not in contact. Motor torque is controlled with field-oriented control based on SimpleFOC.

### Two control loops

The physics simulation runs at only 100–200 Hz, but convincing haptic feedback needs 1 kHz or more. Sending the simulated force straight to the motor at the simulation rate makes the gripper jitter. Instead, the ESP32 runs a fast inner loop that renders a local spring–damper model,

$$F = -k\,(x - x_0) - b\,\dot{x},$$

and the simulation runs a slow outer loop that keeps updating $$k$$, $$b$$ and $$x_0$$ to follow the tissue's nonlinear behavior. This trades a little force accuracy for much better stability.

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/haptic_block_diagram.jpg" title="Control architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The SOFA simulation on the laptop sends spring–damper parameters to the ESP32, which renders them at ≥1 kHz on the motor; gripper position flows back to the simulation over serial.
</div>

### From simulation to spring–damper

**Contact force.** The tissue is a finite-element model with linear elasticity in SOFA {% cite faure2012sofa --file references %}. To keep collision detection real time, the deforming surface is represented by proxy spheres instead of the full volumetric mesh. Contact and friction are solved as a linear complementarity problem; summing the constraint forces gives the grip force.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/haptic_proxy.jpg" title="Proxy spheres" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The instrument jaws grasping tissue represented by proxy spheres for fast contact detection.
</div>

**Stiffness and damping.** Each simulation step estimates the local stiffness from how the contact force changes with gripper position, $$K_\text{raw} = \lvert \Delta F / \Delta x \rvert$$, smooths it with an exponential filter, and sets the damping to $$B = 2\sqrt{K\,m_v}$$ for a virtual mass $$m_v$$. When contact is lost, $$K$$ decays smoothly rather than dropping to zero, so the release feels natural. The spring's rest point follows from Hooke's law, $$x_\text{proxy} = x + F/K$$.

**Force to torque.** Simulated forces are mapped to motor torque through a saturating curve, $$\tau = \tau_\text{max}\tanh(a\,F/F_\text{max})$$, which amplifies small forces — so the moment of contact is easy to feel — while keeping torque within the motor's limit. Brief contact "bounces" caused by the discrete time step are filtered out. The whole pipeline is compiled C++ with a custom bit-level serial protocol, and communication runs decoupled from signal processing.

### Results

The motor produces 0.031 N·m, or about 0.80 N at the 39 mm lever — enough for soft tissue, though harder structures such as bone would need more. With direct drive, friction and cogging are negligible, so free motion feels light. The mapped torque makes the onset and release of contact clearly perceptible, and the motor outputs zero torque when the gripper is still.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/haptic_force_torque.jpg" title="Force and torque" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    One squeeze of simulated liver: raw contact force from the simulator (black) and the processed torque sent to the motor (orange).
</div>

### Next steps

The simulation already computes force on each jaw separately; the prototype renders their average because it has a single motor. Independent jaws would need a second motor and encoder. The same two-loop design could add force feedback in more degrees of freedom by mounting the gripper on a multi-DOF device. We also designed a user study comparing visual-only and visual-plus-haptic feedback on a grasp-and-pull task, measuring grip force, accuracy and completion time.

#### References

<div class="publications">

{% bibliography --file references --cited --group_by none %}

</div>
