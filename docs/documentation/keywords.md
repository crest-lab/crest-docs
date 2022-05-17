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
For the general command line usage [see the parent page.](/docs/documentation/#general-usage) 
This page specifies the `[OPTIONS]`. Required arguments will be marked with `< >`, optional arguments are marked by brackets `[ ]`.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


---



## General and Technical Options

<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% include tr.html ctd1="-h, --help" td2="Print an overview of most available options (*i.e.*, more or less this site completely)." %}

{% include tr.html ctd1="--version" td2="Print only the program header and disclaimer." %}

{% include tr.html ctd1="--cite" td2="Print the most relevant CREST citations." %}

{% include tr.html ctd1="--xnam <BIN>" td2="Specify the name (and path) of the `xtb` binary that should be used as `<BIN>`. The [default] is *xtb*." %}

{% include tr.html ctd1="--scratch <DIR>" td2="Performs the entire calculation in the specified `<DIR>`. If `<DIR>` does not exist, it will be created." %}

{% include tr.html ctd1="--niceprint" td2="In-line progress bar printout for optimizations." %}

{% include tr.html ctd1="--T <threads>" td2="Specify the number of CPU `<threads>` that shall be used. CREST automatically adjusts the number of processes according to this variable in each step, in order to achieve optimal parallelization of the  calculations." %}

{% include tr.html ctd1="--dry" td2="Perform a “dry” run, *i.e.*, nothing is actually done but instead an overview of the settings that would be applied in the calculation is given." %}
</tbody>
</table>

---

## Runtype Options

The general runtype selection as specified in the following table will set the program into the respective runtype.
Only one of these options can be selected!
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
{% include tr.html ctd2="--v1" td1="MF-MD-GC sampling (outdated)" td2="First generation of the GFN*n*-xTB driven conformational search algorithm, consisting out of mode following, molecular dynamics sampling and genetic structure crossing. This workflow is deprecated." %}

{% include tr.html ctd2="--v2" td1="MTD-GC sampling (outdated)" td2="Second generation of the GFN*n*-xTB driven conformational search algorithm, consisting out of a metadynamics approach and genetic structure crossing." %}

{% include tr.html ctd2="--v2i, --v3" td1="iMTD-GC sampling" td2="Iterative version of the MTD-GC workflow, which is the [default] runtype of CREST. [See here.](/docs/overview/workflows.html#imtd-gc-algorithm)" %}

{% include tr.html ctd2="--v4" td1="iMTD-sMTD sampling" td2="Iterative workflow making use of static metadynamics simulations. [See here.](/docs/overview/workflows.html#conformational-entropy-calculations)" %}

{% include tr.html ctd2="--entropy" td1="Confromational Entropy Algorithm" td2="Specialized version of the iMTD-sMTD workflow, used in the calculation of conformational entropy. [See here.](/docs/overview/workflows.html#conformational-entropy-calculations)" %}

{% include tr.html ctd2="--protonate" td1="Protonation site sampling" td2="Workflow for sampling protonation sites. [See here.](/docs/overview/workflows.html#protonation-site-screening)" %}

{% include tr.html ctd2="--deprotonate" td1="Deprotonation site sampling" td2="Workflow for sampling protonation sites. This is related to the `--protonate` option." %}

{% include tr.html ctd2="--tautomerize" td1="Prototropic Tautomer sampling" td2="Workflow for sampling prototropic tautomers. This is related to the `--protonate` option." %}

{% include tr.html ctd2="--cregen <FILE>" td1="CREGEN ensemble sorting routine" td2="The standalone option for sorting an ensemble or a trajectory into conformers and rotamers. [See detailed options below.](/docs/documentation/keywords.html#ensemble-sorting-options)" %}

{% include tr.html ctd2="--qcg" td1="QCG tool" td2="Use the Quantum Cluster Growth functionalities. QCG has several individual runtypes. [See here.](/docs/documentation/qcg.html)" %}
</tbody>
</table>

---

### Level-of-Theory Options
These are the options related to the level of theory and settings for `xtb` through CREST.
<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% include tr.html td1="" td2="**GFN*n*-xTB method selection**" %}
{% include tr.html ctd1="--gfn1" td2="Use GFN1-xTB." %}
{% include tr.html ctd1="--gfn2" td2="Use GFN2-xTB." %}
{% include tr.html ctd1="--gff, --gfnff" td2="Use GFN-FF." %}
{% include tr.html ctd1="--gfn2//gfnff" td2="Use the GFN2-xTB//GFN-FF composite method. Sampling and optimizations are done at GFN-FF level, which is appended by a GFN2-xTB singlepoint calculation." %}

{% include tr.html td1="" td2="<br>**Charge and multiplicity selection**" %}
{% include tr.html ctd1="--chrg <INT>" td2="Set molecular charge to `<INT>`. Only required if `<INT>`≠0." %}
{% include tr.html ctd1="--uhf <INT>" td2="Set the number of $$N_\alpha - N_\beta$$ electrons.
For example, `<INT>`=0 for the neutral *S*<sub>0</sub> state, `<INT>`=2 for an *S*<sub>1</sub> state, etc. Only required if `<INT>`≠0." %}

{% include tr.html td1="" td2="<br>**Implicit solvation**" %}
{% include tr.html ctd1="--gbsa <SOLVENT>" td2="Use the Generalized Born (GB) and solvent accessible surface area (SASA) model. For available `<SOLVENT>` options see the [`xtb` documentation](https://xtb-docs.readthedocs.io/en/latest/gbsa.html#gbsa). The solvent input is not case-sensitive." %}
{% include tr.html ctd1="--alpb <SOLVENT>" td2="Use the ALPB model, an improved version of GBSA. For available `<SOLVENT>` options see the [`xtb` documentation](https://xtb-docs.readthedocs.io/en/latest/gbsa.html#gbsa). The solvent input is not case-sensitive." %}

{% include tr.html td1="" td2="<br>**Geometry optimization**" %}
{% include tr.html ctd1="--opt <LEVEL>" td2="Set the optimization accuracy for GFN*n*–xTB optimizations. In CREST's multilevel approach, only the *final* geometry optimization is affected by this setting. For available `<LEVEL>` see the [`xtb` documentation](https://xtb-docs.readthedocs.io/en/latest/optimization.html#geometry-optimization). The [default] is `<LEVEL>`=*vtight*." %}


</tbody>
</table>

---

### Molecular Dynamics and Metadynamics Options
The following options can be used to modify settings for the MD and MTD simulations during the conformational sampling.

<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% include tr.html ctd1="--len, --mdlen <REAL>" td2="The length of the metadynamics simulations in CREST is usually determined automatically, but with this flag it can be set to `<REAL>` (in ps). It is also possible to set a multiple of the automatically determined length by using `x<REAL>` instead, where `<REAL>` then is a multiplicative factor (e.g. `<REAL>`=*x0.5* for half the default simulation length)." %}
{% include tr.html ctd1="--shake <INT>" td2="Set SHAKE mode for MD. `<INT>` can be any of 0 (= off), 1 (= H-only), or 2 (= all bonds). The [default] is `<INT>`=2." %}
{% include tr.html ctd1="--tstep <REAL>" td2="Set MD time step to `<REAL>` fs. The [default] is 5 fs for GFN*n*-xTB calculations (requires SHAKE), and 1.5 fs for GFN-FF. The timestep is also automatically checked with a trial simulation at the beginning of the conformational search." %}
{% include tr.html ctd1="--mddump <INT>" td2="Set dump frequency in which coordinates are written to the trajectory file to `<INT>` fs. The [default] is 100 fs." %}
{% include tr.html ctd1="--vbdump <INT>" td2="Set frequency in which coordinates are dumped to the collective variable reference structure list to `<INT>` **ps**. The [default] is 1.0 ps." %}
</tbody>
</table>

---

### Conformational Search Settings
The following options modify some algorithmic aspects of the conformational searches and concern mainly the runtypes `--v3` and `--v4`.
<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% include tr.html td1="" td2="**Z-matrix sorting** ([see also ZSORT](/docs/documentation/keywords.html#standalone-tools))" %}
{% include tr.html ctd1="--zs" td2="Perform ZSORT prior to conformational sampling. Input coordinates will be overwritten." %}
{% include tr.html ctd1="--nozs" td2="Skip ZSORT. [default]" %}

{% include tr.html td1="" td2="<br>**Genertic z-matrix crossing** (only for iMTD-GC)" %}
{% include tr.html ctd1="--cross" td2="Perform GC step. [default]" %}
{% include tr.html ctd1="--nocross" td2="Do *not* perform GC z-matrix crossing." %}

{% include tr.html td1="" td2="<br>**Sampling behavior**" %}
{% include tr.html ctd1="--norotmd" td2="Turn off the additional MDs on the lowest conformers after the MTD step in iMTD-GC." %}
{% include tr.html ctd1="--tnmd <REAL>" td2="Set temperature for the additional normal MDs on the lowest conformers after the MTD step. The [default] is 400 K." %}
{% include tr.html ctd1="--mrest <INT>" td2="Adjust the iterative behaviorof iMTD-GC by setting the maximum number of possible MTD restart cycles. The [default] is 5 cycles." %}
{% include tr.html td1="`--hflip`/`--noflip`" td2="Turn on/off a small enhancement routine to rotate XH groups after MTD in iMTD-GC. The [default] is ON." %}
{% include tr.html ctd1="--maxflip <INT>" td2="To be used with `--hflip`. Maximum number of new structures by the above mentioned enhancement routine. The [default] is 1000 structures." %}
{% include tr.html ctd1="--quick" td2="Perform an iMTD-GC search with reduced settings for a crude conformer ensemble." %}
{% include tr.html ctd1="--squick" td2="Perform an iMTD-GC search with even further reduced settings than `--quick`." %}
{% include tr.html ctd1="--mquick" td2="Perform an iMTD-GC search with even further reduced settings     than `--quick` or `--squick`." %}

{% include tr.html td1="" td2="<br>**Conformer sampling for non-covalent systems**" %}
{% include tr.html ctd1="--nci" td2="Specialized NCI mode that can be used to find aggregates of NCI complexes. The option generates an ellipsoid potential around the input structure and adds it to the MTD simulation. Also, MTD bias parameters are adjusted and some settings are reduced in order to achieve lower computation times. See [Example X](/docs/examples/)." %}
{% include tr.html ctd1="--wscal <REAL>" td2="Scale the ellipsoid potential axes generated by the `--nci` mode by factor`<REAL>`." %}


{% include tr.html td1="" td2="<br>**Property appendix**" %}
{% include tr.html ctd1="--prop hess" td2="Performs a hessian calculation for all conformers and re-weights the ensemble on *free energies* after the conformational sampling." %}
{% include tr.html ctd1="--prop reopt" td2="Reoptimization of the ensemble with *vtight* thresholds after conformational sampling (useful for `--quick` runs)." %}
{% include tr.html ctd1="--prop autoIR" td2="Calculate vibrational modes for all conformers and average them (weighted by Boltzmann populations) in a single `crest.vibspectrum` file. Note that the `autoIR` command is case-sensitive!" %}
{% include tr.html ctd1="--prop singlepoint" td2="Calculate a singlepoint energy for all structures in the ensemble and reorder the ensemble accordingly. Not particulary useful after sampling, but effective with the `--for` command ([see below](/docs/documentation/keywords.html#standalone-tools))." %}


{% include tr.html td1="" td2="<br>**Technical settings**" %}
{% include tr.html ctd1="--origin" td2="Track conformer origins. [default]" %}
{% include tr.html ctd1="--keepdir" td2="Keep sub-directories created during the simulations." %}
{% include tr.html ctd1="--noreftopo" td2="Turn off the **only the initial** topology check prior to the conformational search. Do not confuse with [`--notopo`](/docs/documentation/keywords.html#ensemble-sorting-options)." %}


</tbody>
</table>

---

### Entropy Mode Settings
The following options modify some algorithmic aspects and thresholds of the conformational entropy runtype `--entropy`. Partially also applies for `--v4`.

<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% include tr.html ctd1="--scthr <REAL>" td2="Specify the ensemble growth threshold (% new conformers) for `--entropy` and `--v4` convergence. The [default] is 0.02 (=2%) for the entropy mode and 0.05 (=5%) for `--v4`." %}

{% include tr.html ctd1="--ssthr <REAL>" td2="Specify the entropy growth threshold (% entropy gain) for `--entropy` and `--v4` convergence. The [default] is 0.005 (=0.5%) for the entropy mode and 0.01 (=1%) for `--v4`." %}

{% include tr.html ctd1="--trange <from> <to> <step>" td2="Entropies from the `--entropy` mode are always printed for a range of temperatures. The respective temperatures can be specified with this option. `<from>` and `<to>` specify the range, `<step>` deterimines which temperatures in this range are printed." %}

{% include tr.html ctd1="--tread <FILE>" td2="Intended for similiar use as `--trange`. Read a `<FILE>` containing temperatures (one temperature per line) for which the entropies shall be evaluated explicitly instead of using the range option." %}


{% include tr.html ctd1="--ptot <REAL>" td2="The rovibrational average $$\overline{S}$$<sub>msRRHO</sub> requires frequency calculations at GFN level. To reduce computational cost, only the specified `<REAL>` fraction of structures are calculated, and the rest is averaged. The [default] is 0.9 (=90%) most populated structures." %}

{% include tr.html ctd1="--fscal <REAL>" td2="Scale vibrational frequencies for *S*<sub>msRRHO</sub> by a given factor. Also works with the `--thermo` option ([see below](/docs/documentation/keywords.html#standalone-tools)). The [default] is 1.0." %}

{% include tr.html ctd1="--sthr <REAL>" td2="Specify the RR-HO interpolation threshold for *S*<sub>msRRHO</sub> (*i.e.*, τ in cm<sup>-1</sup>). Also works with the `--thermo` option ([see below](/docs/documentation/keywords.html#standalone-tools)). The [default] is 25.0 cm<sup>-1</sup>." %}

{% include tr.html ctd1="--ithr <REAL>" td2="Define an imaginary mode cutoff for vibrational frequency evaluation. Also works with the `--thermo` option ([see below](/docs/documentation/keywords.html#standalone-tools)). The [default] is -50.0 cm<sup>-1</sup>." %}



</tbody>
</table>



---

## Ensemble Sorting Options
The options in this section are used to modify the CREGEN sorting algorithm, in both the [standalone version (`--cregen <FILE>`)](/docs/documentation/keywords.html#runtype-options) and tied in to the conformational sampling.
An application of the standalone CREGEN application is shown in [Example 2](/docs/examples/example_2.html).

<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% include tr.html ctd1="--ewin <REAL>" td2="Set the energy threshold to REAL kcal/mol. This affects several runtypes. The [default] is depending on the application (e.g., 6 kcal/mol conformational searches, 30 kcal/mol protonation site tools)." %}
{% include tr.html ctd1="--rthr <REAL>" td2="Set RMSD threshold in Ångström. The [default] is 0.125 Å." %}
{% include tr.html ctd1="--ethr <REAL>" td2="Set energy threshold between conformer pairs in kcal/mol. The [default] is 0.05 kcal/mol." %}
{% include tr.html ctd1="--bthr <REAL>" td2="Set lower bound for the rotational constant threshold to `<REAL>`. The [default] is 0.01 (= 1%). The threshold is dynamically adjusted between this value and 2.5%, based on an anisotropy of the rotational constants in the enesemble." %}
{% include tr.html ctd1="--pthr <REAL>" td2="Boltzmann population threshold. Currently unused." %}
{% include tr.html ctd1="--nmr, --eqv" td2="Activate determination and printout of NMR-equivalencies for the ensemble. Writes the files `anmr_rotamer` and `anmr_nucinfo`, which are required by the [CENSO](https://xtb-docs.readthedocs.io/en/latest/CENSO_docs/censo.html) python script." %}
{% include tr.html ctd1="--athr <REAL>" td2="Similarity threshold to determine internal rotation of equal atoms for NMR (to be used in conjunction with `--nmr`). The [default] is 0.04." %}
{% include tr.html ctd1="--temp <REAL>" td2="Temperature used for Boltzmann populations in CREGEN. The [default] is 298.15 K." %}
{% include tr.html ctd1="--esort" td2="Sort only based on energy, *i.e.*, no RMSD and rotational constant comparison." %}
{% include tr.html ctd1="--nowr" td2="Skip writing new ensemble files (crest_rotamers_\*.xyz, crest_conformers.xyz)." %}
{% include tr.html ctd1="--subrmsd" td2="Compare only those parts of the structure that were also included in the metadynamics bias potential. Can be important for constrained conformational searches. See [Example X](/docs/examples/)" %}
{% include tr.html ctd1="--notopo" td2="Turn off the topology checks in CREGEN for structures in the ensemble. Do not confuse with [`--noreftopo`](/docs/documentation/keywords.html#conformational-search-settings)." %}
</tbody>
</table>

---

### PCA Clustering Options

An extension to the CREGEN sorting is an automatic principle component analysis (PCA) and k-Means sorting clustering algorithm. It can be invoked with the `--cluster` command.

{% include tip.html content="The `--cluster` option serves as an extension for regular conformational searches, the `--cregen <FILE>` standalone usage, or the `--for <FILE>` command and can be used with any of these." %}
{% include note.html content="This algorithm currently does not work well for non-covalent complexes or molecular clusters and should only be applied to singular molecules." %}

<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% include tr.html ctd1="--cluster [ARG]" td2="Perform a clustering on an ensemble to identify the most representative structures, based on dihedral angles. `[ARG]` is an unspecified optional argument. If `[ARG]` is an integer, e.g., `[ARG]`=5, that many clusters will be produced. If `[ARG]` is omitted, the routine will try to determine the best number of clusters by itself. This autonomous mode can also be accessed with different setting if `[ARG]` is an of `loose`, `normal`, `tight`,
or `vtight`. Here, cluster sizes are tested one-by-one, which can be expensive for large ensembles. To speed things up, some incremental variants are accessible via `incr`, `tightincr`, and `vtightincr`. The [default], *i.e.*, omitting `[ARG]`, corresponds to `--cluster normal`." %}
{% include tr.html ctd1="--pccap <INT>" td2="Limit the number of automatically identified principle components to the `<INT>` most contributing ones." %}
{% include tr.html ctd1="--nopcmin" td2="Remove lower bound for principal component contribution, *i.e.*, more principle components might be considerd for the clustering." %}
{% include tr.html ctd1="--pcaex <atomlist>" td2="Avoid atoms listed in `<atomlist>` in principle component setup." %}
</tbody>
</table>

---

## Constraining Options


---

## Standalone Tools

The following tools can be used as as standalone application in CREST, similar to the main [runtype options](/docs/documentation/keywords.html#runtype-options).

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

