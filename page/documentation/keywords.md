---
layout: default
title: Keyword Documentation
parent: Documentation
nav_order: 1
has_children: true
has_toc: false
summary: "The entire list of available command line arguments for CREST."
permalink: /page/documentation/keywords.html
---

# {{page.title}}
{: .no_toc }

This page contains the documentation of all available keywords for CREST.
The command line arguments are grouped according to different functions.
For the general command line usage [see the parent page.]({{site.baseurl}}/page/documentation/#general-usage) 
This page specifies the `[OPTIONS]`. Required arguments will be marked with `< >`, optional arguments are marked by brackets `[ ]`.
{: .fs-6 .fw-300 .text-justify }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


---



## General and Technical Options

{% include 2tab.html obj=site.data.keywords.general %}


---

## Runtype Options

The general runtype selection as specified in the following table will set the program into the respective runtype.
Only one of these options can be selected!

{% include 3tab.html obj=site.data.keywords.runtype %}


---

### Level-of-Theory Options
These are the options related to the level of theory and settings for `xtb` through CREST.

{% include 2tab.html obj=site.data.keywords.leveloftheory %}


---

### Molecular Dynamics and Metadynamics Options
The following options can be used to modify settings for the MD and MTD simulations during the conformational sampling.

{% include 2tab.html obj=site.data.keywords.mdsettings %}



---

### Conformational Search Settings
The following options modify some algorithmic aspects of the conformational searches and concern mainly the runtypes `--v3` and `--v4`.

{% include 2tab.html obj=site.data.keywords.confsettings %}



---

### Entropy Mode Settings
The following options modify some algorithmic aspects and thresholds of the conformational entropy runtype `--entropy`. Partially also applies for `--v4`.

{% include 2tab.html obj=site.data.keywords.entropysettings %}



---

## Ensemble Sorting Options
The options in this section are used to modify the CREGEN sorting algorithm, in both the 
[standalone version (`--cregen <FILE>`) <i class="fa-solid fa-circle-up"></i>]({{site.baseurl}}/page/documentation/keywords.html#cregen) and tied in to the conformational sampling.
An application of the standalone CREGEN application is shown in [Example 2]({{site.baseurl}}/page/examples/example_2.html).

{% include 2tab.html obj=site.data.keywords.sortingsettings %}



---

### PCA Clustering Options

An extension to the CREGEN sorting is an automatic principle component analysis (PCA) and k-Means sorting clustering algorithm. It can be invoked with the `--cluster` command.

{% include tip.html content="The `--cluster` option serves as an extension for regular conformational searches, the `--cregen <FILE>` standalone usage, or the `--for <FILE>` command and can be used with any of these." %}

{% include note.html content="This algorithm currently does not work well for non-covalent complexes or molecular clusters and should only be applied to singular molecules." %}

{% include 2tab.html obj=site.data.keywords.pcasettings %}



---

## Constraining Options

CREST offers an interface to `xtb`'s constraints by passing the respective arguments, 
e.g. manually via the `--cinp` option, or by an automatic setup like `--cbonds`.
Constrainment syntax for the `xtb` can be found [here.](https://xtb-docs.readthedocs.io/en/latest/xcontrol.html#fixing-constraining-and-confining)
Some examples for constrained CREST calculations are presented [here.](../examples/example_4.html)
{: .text-justify }

{% include 2tab.html obj=site.data.keywords.constrainment %}



---

## Standalone Tools

The following tools can be used as as standalone application in CREST, similar to the main [runtype options. <i class="fa-solid fa-circle-up"></i>]({{site.baseurl}}/page/documentation/keywords.html#runtype-options)

{% include 3tab.html obj=site.data.keywords.standalonetools %}


---

## Quantum Cluster Growth (QCG) Options

The QCG keyword section can be found on the next page:

[Go to Quantum Cluster Growth Keyword Documentation <i class="fa-solid fa-book"></i>](qcg.html){: .btn .btn-blue }

