---
layout: page
title: Differentiable Simulation for Soft Tissue Cutting
description: Inferring tissue stiffness and its uncertainty from observed cuts · Computer Integrated Surgery II
img: assets/img/covers/sysid.jpg
importance: 3
category: research
---

**Course project, Computer Integrated Surgery II, Johns Hopkins University** · Jan. 2026 – May 2026 · Mentors: Ethan Kilmer, Dr. Jiawei Ge, Dr. Laura Connolly and Dr. Axel Krieger · [Final report (PDF)](/assets/pdf/cis2_final_report.pdf) · [Poster (PDF)](/assets/pdf/diff_sim_soft_tissue_poster.pdf)

### Motivation

In partial nephrectomy the surgeon removes a kidney tumor with a margin of healthy tissue around it. A margin that is too close risks leaving cancer behind; one that is too wide removes kidney function the patient needs. Autonomous robots can cut more precisely than a human hand, but they cannot feel what the tissue will do: it deforms under the tool, and the electrosurgical instrument denatures tissue by heat as it cuts. My [RA work](/projects/01_mpm_tissue_cutting/) builds a real-time MPM simulation that predicts this tool–tissue interaction. For its predictions to be useful, the model's parameters have to match the patient's tissue — this course project asks how to infer them from what the robot observes.

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/sysid_margin.jpg" title="Resection margin" class="img-fluid rounded" %}
    </div>
</div>
<div class="caption">
    The resection margin (red) must fully enclose the tumor.
</div>

### Why a new cutting model

Mesh-based simulators such as SOFA {% cite faure2012sofa --file references %} cut by deleting tetrahedra. At practical resolutions this leaves jagged, aliased edges and unrealistic deformation around the cut. CRESSim-MPM {% cite ou2025cressim --file references %} uses the Material Point Method but assumes planar slicing by a blade, which does not fit a needle-like electrosurgical tip.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/sysid_sofa.jpg" title="SOFA carving" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Cutting by tetrahedron deletion in SOFA: the incision edge is jagged at practical mesh resolutions.
</div>

### Cutting model

I represent tissue as Neo-Hookean MPM particles. Instead of deleting particles or pushing them aside, each particle carries a health value $$h_i \in [0, 1]$$. The cautery mesh induces a Gaussian thermal field of width $$\sigma_\text{thermal}$$, and health decays with exposure:

$$\Delta h_i = -\kappa \sum_{j} \exp\!\left(-\frac{\lVert x_i - v_j \rVert^2}{2\sigma_\text{thermal}^2}\right), \qquad \sigma_i^\text{eff} = h_i\,\sigma_i^\text{NH}.$$

Scaling each particle's stress by its health makes fully denatured particles stop transmitting force, so they separate — a cut. Because nothing is deleted, momentum is conserved and the whole process stays differentiable — which is what makes the inverse problem below possible. (Comparisons against real cuts are on the [RA project page](/projects/01_mpm_tissue_cutting/).)


### Inferring stiffness

Tissue stiffness (Young's modulus $$E$$) cannot be measured directly, so it is inferred from deformation: the optimizer adjusts $$E$$ until the simulated particle positions $$\hat{x} = \text{MPM}(E)$$ match the observed positions $$x$$. $$E$$ is modeled as a field with one value per particle, and optimized in log space, $$E_i = \exp(z_i)$$, because stiffness spans orders of magnitude and raw values cause exploding gradients.

Real surgical observations are noisy — reflections, blood, smoke. Rather than a single best estimate, the method keeps a distribution $$q(z)$$ over log-stiffness and minimizes the negative evidence lower bound, which balances fit to the observation against a medical prior. Gradients flow through every simulation step by automatic differentiation.

### Uncertainty map

The method also learns a per-particle standard deviation $$s_i$$ in the likelihood. Where the observation agrees with physics, $$s_i$$ stays small and the fit is strict; where it is corrupted, the optimizer raises $$s_i$$ there, which down-weights that region instead of letting it distort the stiffness estimate. The result is an honest map of where the simulation can and cannot be trusted — a robot could use it to stop a risky incision.

To test this, I injected a synthetic error into one region of the kidney. The converged uncertainty map lights up exactly there.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/sysid_uncertainty.jpg" title="Uncertainty map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Perturbation test: three views of the kidney, colored by the learned standard deviation. The injected error (red circle) is flagged as high uncertainty.
</div>

### Results

On synthetic data, deformation error shrinks across the kidney as the stiffness estimate converges to the ground truth, for spin, drop and throw scenarios. Both the deterministic estimate and the probabilistic version (mean with a confidence band) converge to the true value.

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/sysid_error_map.jpg" title="Temporal error map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/sysid_E_det.jpg" title="Deterministic estimate" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/sysid_E_prob.jpg" title="Probabilistic estimate" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Top: temporal error map — mean particle deviation over simulation steps (x) and epochs (y). Bottom left: deterministic estimate of E converging to ground truth. Bottom right: the probabilistic estimate, mean and 5th–95th percentile band.
</div>

**Speed.** The simulation is built on Genesis {% cite genesis2024 --file references %}, with the thermal model in Taichi {% cite hu2019taichi --file references %} and inference in PyTorch. One inference iteration on 178k particles — forward rollout, loss and backpropagation through every step — takes 14.7 s.

**Scope.** This is a sim-to-sim study: the observations are generated by the simulator with known parameters, so the inverse problem is checked against a known ground truth. Fitting to real tissue data is the next step, along with thermography to calibrate the thermal model and using the uncertainty map as a cost map for robot planning.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <a href="/assets/pdf/diff_sim_soft_tissue_poster.pdf">{% include figure.liquid path="assets/img/projects/sysid_poster.jpg" title="CIS II poster" class="img-fluid rounded z-depth-1" %}</a>
    </div>
</div>
<div class="caption">
    Project poster, Computer Integrated Surgery II, Spring 2026. Click to open the PDF.
</div>

### Follow-up: exact gradients in NVIDIA Warp

I later rebuilt the inverse problem on an explicit MLS-MPM {% cite hu2018mlsmpm --file references %} solver in NVIDIA Warp {% cite macklin2022warp --file references %}, backpropagating the trajectory loss through every substep with Warp's reverse-mode autodiff. On a soft kidney drop (~2,500 particles, 540 substeps), Adam {% cite kingma2015adam --file references %} on log E recovers Young's modulus from a 10× wrong initial guess (10<sup>4</sup> → 10<sup>5</sup> Pa) to within **0.08%** in 60 epochs, at ~0.38 s per epoch on an RTX 2080.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/warp_E_epoch_001.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/warp_E_epoch_060.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true %}
    </div>
</div>
<div class="caption">
    Ground truth | initial guess | current estimate, at epoch 1 (top) and epoch 60 (bottom). By epoch 60 the simulated drop matches the ground truth.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/warp_E_training.jpg" title="Training summary" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Position loss, recovered E, relative error and gradient over training.
</div>

#### References

<div class="publications">

{% bibliography --file references --cited --group_by none %}

</div>
