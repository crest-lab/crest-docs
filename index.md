---
layout: default
title: Home
nav_order: 1
description: "Just the Docs is a responsive Jekyll theme with built-in search that is easily customizable and hosted on GitHub Pages."
permalink: /
---

# CREST Docs

Welcome to the documentation site of {% include tooltip.html tool="CREST" tip=site.data.glossary.crest %}.



{% include image.html file="crest.png" alt="CREST" max-width=250 %}

## Introduction

CREST is a utility and driver program for the semiempirical quantum chemistry package [`xtb`{% include elink.html %}](https://github.com/grimme-lab/xtb).
The programs name originated as an abbreviation for Conformer–Rotamer Ensemble Sampling Tool as it was developed as a program for conformational sampling at the extended tight-binding level GFN-xTB.
Since then several functionalities have been added to the code.
In its current state, the program provides a variety of sampling procedures, for example for improved thermochemistry, or solvation.
Generally, CREST functions as an IO-based scheduler for the `xtb` program and as tool for analyzing structure ensembles.

The key procedure implemented in CREST is a conformational search workflow abbreviated as iMTD-GC. 
This workflow generates conformer/rotamer ensembles by extensive metadynamics-based sampling.
Other notable standalone functionalities are automated detection and ranking of protonation sites and the quantum cluster growth (QCG) workflow for explicit solvation.

This documentation aims to provide a practical installation guide and a series of example applications.
Quick links to different sections of the documentation can be found below.


## Quick Links

<div class="row">
 <div class="col-md-3 col-sm-6 d-flex">
   <div class="card text-center">
     {% include image.html file="quicklink_install.png" alt="Installation" %}
     <div class="card-body text-center">
       <h4>Installation</h4>
       <p>View information on how to install CREST.</p>
       <a href="/docs/installation/" class="stretched-link"></a> 
     </div>
   </div>
 </div>
 <div class="col-md-3 col-sm-6 d-flex">
   <div class="card text-center">
    {% include image.html file="quicklink_cloud.png" alt="Examples" %}
     <div class="card-body text-center">
       <h4>Examples</h4>
       <p>View the example applications for CREST.</p>
       <a href="/docs/examples/" class="stretched-link"></a>
     </div>
   </div>
 </div>
 <div class="col-md-3 col-sm-6 d-flex">
   <div class="card text-center">
    {% include image.html file="quicklink_documentation.png" alt="Documentation" %}
      <h4>Documentation</h4>
      <p>View the keyword documentation.</p>
      <a href="/docs/documentation/" class="stretched-link"></a>
   </div>
 </div>
 <div class="col-md-3 col-sm-6 d-flex">
   <div class="card text-center">
    {% include image.html file="quicklink_literature.png" alt="Literature" %} 
       <h4>Literature</h4>
       <p>View literature for CREST & Co.</p>
       <a href="/docs/about/literature.html" class="stretched-link"></a>
   </div>
 </div>
</div>


