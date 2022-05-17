---
layout: default
title: Keyword Documentation
parent: Documentation
nav_order: 1
has_children: true
has_toc: false
summary: "The entire list of available command line arguments for CREST."
permalink: /docs/documentation/keywords.html
---

# {{page.title}}
{: .no_toc }

This page contains the documentation of all available keywords for CREST.
The command line arguments are grouped according to different functions.
For the general command line usage [see the parent page.]({{site.baseurl}}/docs/documentation/#general-usage) 
This page specifies the `[OPTIONS]`. Required arguments will be marked with `< >`, optional arguments are marked by brackets `[ ]`.
{: .fs-6 .fw-300 }

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
[standalone version (`--cregen <FILE>`) <i class="fa-solid fa-circle-up"></i>]({{site.baseurl}}/docs/documentation/keywords.html#cregen) and tied in to the conformational sampling.
An application of the standalone CREGEN application is shown in [Example 2]({{site.baseurl}}/docs/examples/example_2.html).

{% include 2tab.html obj=site.data.keywords.sortingsettings %}



---

### PCA Clustering Options

An extension to the CREGEN sorting is an automatic principle component analysis (PCA) and k-Means sorting clustering algorithm. It can be invoked with the `--cluster` command.

{% include tip.html content="The `--cluster` option serves as an extension for regular conformational searches, the `--cregen <FILE>` standalone usage, or the `--for <FILE>` command and can be used with any of these." %}

{% include note.html content="This algorithm currently does not work well for non-covalent complexes or molecular clusters and should only be applied to singular molecules." %}

{% include 2tab.html obj=site.data.keywords.pcasettings %}



---

## Constraining Options


---

## Standalone Tools

The following tools can be used as as standalone application in CREST, similar to the main [runtype options. <i class="fa-solid fa-circle-up"></i>]({{site.baseurl}}/docs/documentation/keywords.html#runtype-options)

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th>Runtype</th>
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% include tr.html ctd2="--zsort" td1="ZSORT z-matrix sorting" td2="The atom order of the given input file is sorted in order to yield a more consistent z-matrix, *i.e.*, atoms are grouped together according to the molecular structure (e.g. methyl groups)." %}

{% include tr.html ctd2="--mdopt <FILE>" td1="MDOPT ensemble optimization" td2="Optimize each point on a given trajectory or ensemble file `<FILE>` with GFN*n*–xTB." %}

{% include tr.html ctd2="--screen <FILE>" td1="SCREEN ensemble optimization" td2="Optimize each point on a given trajectory or ensemble file `<FILE>` with GFNn–xTB. The resulting ensemble is sorted using the CREGEN routine." %}

{% include tr.html ctd2="--rrhoav <FILE>" td1="Thermostatistical frequency contribution for ensembles" td2="Calculate the $$\overline{S}$$<sub>msRRHO</sub> contribution for a given ensemble (similar to the `--mdopt` and `--screen` functions). The number of structures taken  from the ensemble for this calculation is determined dynamically based on their respective Boltzmann population. The calculation can  be modified similar to the entropy mode, [see entropy mode settings.](/docs/documentation/keywords.html#entropy-mode-settings) " %}


{% include tr.html ctd2="--rmsd, --rmsdheavy <FILE1> <FILE2>" td1="Atomic RMSD calculation" td2="Calculate the RMSD or heavy atom RMSD between two given structures. Input format of the two structures can be any of the formats that can be read by CREST, output will always be the RMSD in Ångström." %}

{% include tr.html ctd2="--testtopo <FILE>" td1="Topology information" td2="Calculate the topology (neighbour lists) for a given input structure and print info (coordination numbers, neighbors for each atom) to screen." %}

{% include tr.html ctd2="--thermo <FILE>" td1="Thermostatistical calculations from frequencies" td2="Calculate thermo data for given structure. Also requires vibrational frequencies in the Turbomole format, saved as file called `vibspectrum`. The calculation can be modified by `--fscal` and `--sthr`, [see entropy mode settings.](/docs/documentation/keywords.html#entropy-mode-settings)" %}


{% include tr.html ctd2="--for, --forall <FILE>" td1="Ensemble processing" td2="Calculate some things for the ensemble specified as `<FILE>`. This option is to be used with the `--prop ...` option ([see above](/docs/documentation/keywords.html#conformational-search-settings)).
Also applicable for a standalone use of the [`--cluster` option](/docs/documentation/keywords.html#pca-clustering-options)." %}

{% include tr.html ctd2="--splitfile <FILE> [from] [to]" td1="Ensemble file splitting" td2="Split an ensemble from `<FILE>` into separate directories for each structure. `[from]` and `[to]` can optionally be used to select specific structures from the file or a range of structures. The new directories are collected in a directory called SPLIT." %}

</tbody>
</table>

