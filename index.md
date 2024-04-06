---
layout: default
title: Home
nav_order: 1
description: "CREST is an IO-based scheduler for semiempirical quantum mechanical calculations at the GFN<i>n</i>-xTB level."
permalink: /
---

# CREST Docs

Welcome to the documentation site of {% include tooltip.html tool="CREST" tip=site.data.glossary.crest %}.

{% include image.html file="newtoc.png" alt="CREST" max-width=800 %}


## Introduction

CREST was developed as a utility and driver program for the semiempirical quantum chemistry package [`xtb`{{ site.data.icons.github }}](https://github.com/grimme-lab/xtb).
The programs name originated as an abbreviation for *Conformer–Rotamer Ensemble Sampling Tool* as it was developed as a program for conformational sampling at the extended tight-binding level GFN-xTB.
Since then several functionalities have been added to the code.
In its current state, the program provides a variety of sampling procedures, for example for improved thermochemistry, or explicit solvation.
{: .text-justify }

This documentation aims to provide a practical [installation guide](./page/installation) and a series of [example applications](./page/examples).
Quick links to different sections of the documentation can be found below. 
{: .text-justify }


## Quick Links

<div class="row">
 <div class="col-md-3 col-sm-6 d-flex">
   <div class="card text-center">
     {% include image.html file="quicklink_install.png" alt="Installation" %}
     <div class="card-body text-center">
       <h4>Installation</h4>
       <p>View information on how to install CREST.</p>
       <a href="{{site.baseurl}}/page/installation" class="stretched-link"></a> 
     </div>
   </div>
 </div>
 <div class="col-md-3 col-sm-6 d-flex">
   <div class="card text-center">
    {% include image.html file="quicklink_cloud.png" alt="Examples" %}
     <div class="card-body text-center">
       <h4>Examples</h4>
       <p>View the example applications for CREST.</p>
       <a href="{{site.baseurl}}/page/examples" class="stretched-link"></a>
     </div>
   </div>
 </div>
 <div class="col-md-3 col-sm-6 d-flex">
   <div class="card text-center">
    {% include image.html file="quicklink_documentation.png" alt="Documentation" %}
      <h4>Documentation</h4>
      <p>View the keyword documentation.</p>
      <a href="{{site.baseurl}}/page/documentation" class="stretched-link"></a>
   </div>
 </div>
 <div class="col-md-3 col-sm-6 d-flex">
   <div class="card text-center">
    {% include image.html file="quicklink_literature.png" alt="Literature" %} 
       <h4>Literature</h4>
       <p>View literature for CREST & Co.</p>
       <a href="{{site.baseurl}}/page/about/literature.html" class="stretched-link"></a>
   </div>
 </div>
</div>


---
## News

{% for post in site.posts %}
  <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
  <p>{{ post.excerpt }}</p>
{% endfor %}


{% include twitter.html %}
