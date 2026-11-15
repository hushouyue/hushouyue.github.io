---
layout: page
title: interests
permalink: /interests/
nav: true
nav_order: 5
---

<style>
.art-grid { display: grid; gap: 1.75rem 1.5rem; margin: 1.5rem 0 2.5rem; }
.art-grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.art-grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 640px) { .art-grid.two, .art-grid.three { grid-template-columns: minmax(0, 1fr); } }
.art-grid figure { margin: 0; }
.art-grid .art-media { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 6px; display: block; }
.art-grid.three .art-media { aspect-ratio: 1 / 1; }
.art-grid iframe.art-media { border: 0; }
.art-grid .art-top { object-position: center 15%; }
.art-grid .art-media.art-square { aspect-ratio: 1 / 1; }
.art-grid .art-media.art-natural { aspect-ratio: auto; height: auto; object-fit: contain; }
.art-grid .art-head { object-position: center 0%; }
.art-card h5 { margin: 0.75rem 0 0.15rem; }
.art-card .meta { font-size: 0.85rem; font-style: italic; opacity: 0.75; margin-bottom: 0.35rem; }
.art-card p { font-size: 0.9rem; margin: 0; }
.art-wide .art-media { aspect-ratio: auto; }
.art-tile .meta { font-size: 0.8rem; text-align: center; opacity: 0.75; margin-top: 0.4rem; }
.art-tile p { font-size: 0.85rem; text-align: center; margin: 0.2rem 0 0; }
</style>

<h4>Fencing</h4>

I fenced sabre for Queen's University on the [varsity team](https://gogaelsgo.com/sports/fencing/roster/shouyue-hu/11033) (2018–2022), competing at the OUA Championships, and was named a Queen's Academic All-Star.

<div class="art-grid two art-wide" style="grid-template-columns: minmax(0, 1fr);">
  <div class="art-card">
    {% include figure.liquid loading="eager" path="assets/img/interests/fencing_team.jpg" title="Queen's varsity fencing team" class="art-media" %}
    <div class="meta" style="text-align:center; margin-top:0.4rem;">Queen's varsity fencing team (yearbook). I am in the second row, third from the right.</div>
  </div>
</div>

<div class="art-grid two">
  <div class="art-tile">{% include figure.liquid path="assets/img/interests/fencing_bout_1.jpg" title="Sabre bout" class="art-media" %}</div>
  <div class="art-tile">{% include figure.liquid path="assets/img/interests/fencing_bout_2.jpg" title="Sabre bout" class="art-media" %}</div>
</div>
<p style="text-align:center; font-size:0.85rem; opacity:0.75; margin-top:-1.5rem;">Sabre bouts at the Queen's Invitational, 2019.</p>

<h4>Art</h4>

My research interest in robot perception extends from the way I perceive the world. I paint what I see.

<div class="art-grid two" style="align-items:start">
  <div class="art-card">
    {% include figure.liquid path="assets/img/art/robot_portrait.jpg" loading="eager" title="Robot portraiture" class="art-media art-square art-head" %}
    <h5>Robot Portraiture</h5>
    <div class="meta">Computer vision &amp; motion planning, 2025</div>
    <p>The robot "perceives" the subject through pixels and executes the drawing via inverse kinematics and trajectory planning — rendered on a pizza box. Thanks to Dr. Kim for his teaching in Robot Devices, Kinematics, Dynamics, and Control.</p>
  </div>
  <div class="art-card">
    {% include figure.liquid loading="eager" path="assets/img/art/color_decomposition.jpg" title="Color decomposition" class="art-media art-natural" %}
    <h5>Color Decomposition</h5>
    <div class="meta">Pointillism study, 2023</div>
    <p>A matrix can be decomposed into components, and so can color: we perceive many colors from mixtures of a few pure wavelengths of light.</p>
  </div>
  <div class="art-card">
    {% include figure.liquid path="assets/img/art/as_city.jpg" title="Moving from Toronto" class="art-media art-natural" %}
    <h5>Moving from Toronto</h5>
    <div class="meta">Digital painting, 2025</div>
    <p>A fisheye view of downtown Toronto from my bedroom window, drawn as I moved out of my apartment near Lake Ontario.</p>
  </div>
  <div class="art-card">
    {% include figure.liquid path="assets/img/art/as_asura_1.jpg" title="Asuras" class="art-media art-square art-top" %}
    <h5>Asuras</h5>
    <div class="meta">Digital sculpting, 2022</div>
    <p>A multi-armed Asura from mythology, sculpted digitally.</p>
  </div>
  <div class="art-card">
    <iframe class="art-media" src="https://www.youtube.com/embed/Og1DaGBEPmY" title="Marshmallow Campfire" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <h5>Marshmallow Campfire</h5>
    <div class="meta">Outer Wilds, 2023</div>
    <p>An audio-visual piece inspired by Outer Wilds, built around a line from the game: “The past is past, but there’s something important about seeing it with your own eyes.”</p>
  </div>
</div>

