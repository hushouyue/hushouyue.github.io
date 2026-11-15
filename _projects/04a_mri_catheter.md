---
layout: page
title: Shunt Valve Artifact and Catheter Length in MRI
description: Deep learning artifact segmentation and active-snake catheter length estimation · Medical Image Analysis
img: assets/img/covers/mri.jpg
importance: 6
category: research
---

**Course project, Medical Image Analysis, Johns Hopkins University** · Spring 2026 · [Report (PDF)](/assets/pdf/mri_shunt_catheter_report.pdf)

Two-person team. I built the learning-based valve artifact segmentation (Task A) and all of catheter length estimation (Task C), including the active medial snake and evaluation. My teammate Runyu built the classical pipelines and the catheter segmentation (Task B).

### Background

In hydrocephalus, cerebrospinal fluid builds up in the brain's ventricles faster than it is absorbed, raising intracranial pressure. The standard treatment is a shunt: a catheter drains fluid from a ventricle to the abdomen, through a one-way valve under the scalp. Shunts can block, disconnect or migrate, so patients are imaged repeatedly and the catheter's position is checked at follow-up.

Many valves contain magnets and other metal. In MRI this produces a dark signal void with geometric distortion around the valve — and because the valve sits where the catheter enters the skull, the artifact can also hide the start of the catheter. The project splits the problem into three tasks: **(A)** find the valve artifact, **(B)** segment the catheter, and **(C)** estimate the catheter's length. The course provided 200 training subjects, each with an MRI volume, an artifact mask and a catheter mask, plus 30 test subjects.

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/mri_data.jpg" title="Example data" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Course-provided data. (a) A slice without the artifact; (b) the valve artifact, a dark signal void (arrow); (c) its mask in red; (d) a slice where the catheter is visible; (e) the catheter mask in cyan.
</div>

### Task A — valve artifact segmentation

The artifact is a dark, compact void near the skull. A classical pipeline built on that cue — head mask, erosion, dark-pixel candidates, then an area and circularity filter — reached Dice **0.68**, but it was sensitive to kernel sizes and thresholds and failed when the artifact merged with the skull outline.

I trained a compact 3D U-Net {% cite cicek2016unet3d --file references %} instead. Volumes of different sizes are normalized and resampled to 64³ (trilinear for images, nearest-neighbour for masks), then the prediction is resampled back and thresholded at 0.5. I compared a single-stage schedule (45 epochs of Dice loss) with a two-stage one (30 epochs of Dice + cross-entropy, then 15 of pure Dice). Both reached about **0.90** Dice on validation, the two-stage schedule slightly ahead.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/mri_valve.jpg" title="Valve artifact detection" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/mri_dice.jpg" title="Validation Dice" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: an axial slice and the detected artifact. Right: validation Dice for the single-stage and two-stage training schedules.
</div>

### Task B — catheter segmentation

Classical attempts — 3D template matching and region growing guided by Frangi tubular enhancement, anchored at the ventricles — struggled to generalize across valve shapes and often confused the catheter with sulci. nnU-Net {% cite isensee2021nnunet --file references %}, which configures itself from the dataset's resolution and intensity statistics, reached an average Dice of **0.85**.

### Task C — catheter length

Length is computed from the catheter mask and the voxel spacing, and scored by mean absolute error against reference lengths.

**Baseline.** Thin the mask to a one-voxel skeleton, order the voxels along their principal axis, fit a cubic B-spline and sum its length. A single spline fit is sensitive to noisy or uneven masks: the skeleton zig-zags, and the zig-zags add length.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/mri_zigzag.jpg" title="Zig-zag skeleton" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A B-spline fitted to a noisy skeleton follows its zig-zags.
</div>

**Active medial snake.** Inspired by active contours {% cite kass1988snakes --file references %}, I let an open curve adapt to each patient's catheter. It starts from the skeleton's endpoints and is pulled toward the middle of the tube by a force field built from smoothed inside and outside distance transforms. The curve is optimized through a few control points, re-parameterized as a dense B-spline at each step, with a Laplacian term for smoothness, until it converges.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/mri_snake_evolution.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/mri_length_3d.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true %}
    </div>
</div>
<div class="caption">
    Left: the snake evolving along the catheter on the distance field. Right: the baseline B-spline (green) zig-zags on the noisy mask, while the snake (red) follows the catheter smoothly.
</div>

**Result.** Over the 200 training subjects, the snake cut the mean absolute error from 2.75 ± 2.10 mm to **1.57 ± 1.36 mm**, with lower variance across subjects.

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/mri_length_mae.jpg" title="Length error" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-3 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/mri_failure.jpg" title="Failure case" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: length error of the two methods. Right: a failure case, where artifact voxels wrongly included in the mask pull the snake off course.
</div>

### What I would do differently

The project demo exposed two gaps. The catheter segment hidden under the valve artifact matters for length: if it is missing from the mask, neither the skeleton nor the snake can recover it, and I deliberately did not fill the gap without a clinical prior. And the catheter tip matters, because stable endpoints anchor the snake. Next steps would be an explicit tip model, a principled way to bridge the occluded segment, and a larger Task A network for sharper boundaries.

#### References

<div class="publications">

{% bibliography --file references --cited --group_by none %}

</div>
