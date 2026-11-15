---
layout: page
title: Live Training Visualizer for Brax
description: Open-source developer, Google Summer of Code 2025 · PAL Robotics
img: assets/img/covers/brax.jpg
importance: 5
category: research
---

**Open-source developer, [Google Summer of Code 2025](https://summerofcode.withgoogle.com/archive/2025/projects/Xm0toJHl)** · PAL Robotics · Jun. 2025 – Sep. 2025 · Mentors: Sergi Acosta, Thomas Ung, Óscar Martínez · Code: [pal-robotics/brax_training_viewer](https://github.com/pal-robotics/brax_training_viewer)

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include video.liquid path="assets/video/brax_viewer.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true %}
    </div>
</div>
<div class="caption">
    Watching PPO training live in the browser while parallel environments train on the GPU.
</div>

I was selected by Google Summer of Code 2025 to work with PAL Robotics on an open-source tool for [Brax](https://github.com/google/brax) {% cite freeman2021brax --file references %}, Google's JAX-based physics engine for reinforcement learning. Brax trains policies such as PPO {% cite schulman2017ppo --file references %} across thousands of parallel environments inside JIT-compiled code, which makes it fast but nearly impossible to watch: the states never leave the compiled computation until training ends.

I built **Brax Training Viewer**, a web-based viewer that streams those states out of JIT-compiled, vectorized rollouts without breaking the computation flow, so researchers can see what their policies are doing while they train.

- **Real-time, in the browser:** a Python backend streams environment states to a web frontend, so a remote, headless training machine can be monitored from any device.
- **Built for JAX:** works inside `jit` and `vmap` with minimal impact on training speed; rendering can be switched off from the web page at any time to give compute back to training.
- **Drop-in:** plugs into existing Brax PPO training without changing the RL workflow; the viewer server runs independently of the training process.
- **Released open source** under PAL Robotics, installable with a single `pip install`.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/brax_benchmark.jpg" title="Benchmark" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Training-time benchmark across Brax environments and sizes, with and without the live viewer attached.
</div>

#### References

<div class="publications">

{% bibliography --file references --cited --group_by none %}

</div>
