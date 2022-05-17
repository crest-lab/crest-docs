---
layout: default
title: QCG Keywords
parent: Keyword Documentation
grand_parent: Documentation
nav_order: 1
summary: "The list of available command line arguments for QCG."
permalink: /docs/documentation/qcg.html
---

# {{page.title}}
{: .no_toc }

This page contains the documentation of available keywords for QCG.
Required arguments will be marked with `< >`, optional arguments are marked by brackets `[ ]`.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


---

{% include note.html content="Be aware that most QCG applications require the `xtbiff` program than can be obtained as a statically compiled binary from the respective [*xtbiff* GitHub repository <i class='fa-brands fa-github'></i>](https://github.com/grimme-lab/xtbiff)." %}

The QCG extension of CREST can be invoked via the command line. 
To activate QCG, use a command similar to

```bash
crest <SOLUTE> -qcg <SOLVENT> [OPTIONS]
```

Two files containing `<SOLUTE>` and `<SOLVENT>` coordinates have to be provided that can be in any format supported by CREST. 
The general and technical command line options of CREST also apply for the QCG runtype (see [Keyword Documentation](/docs/documentation/keywords.html)).
Take care to always set the number of cores with `--T <INT>`.
The `[OPTIONS]` that can be used in conjunction with `-qcg` are documented below.

## QCG Runtypes

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
{% include tr.html ctd2="--grow" td1="Grow algorithm" td2="The [default] runtype of QCG. The grow algorithm is employed without ensemble generation. [See here.](/docs/overview/workflows.html#automated-grow-algorithm-and-ensemble-generation)" %}

{% include tr.html ctd2="--ensemble" td1="Ensemble algorithm" td2="The grow algorithm is employed *with* ensemble generation. [See here.](/docs/overview/workflows.html#automated-grow-algorithm-and-ensemble-generation)" %}

{% include tr.html ctd2="--gsolv" td1="Solvation Free Energy" td2="Generates ensembles to compute the solvation free energy. [See here.](/docs/overview/workflows.html#solvation-free-energy)" %}
</tbody>
</table>

### Grow Algorithm Options

{% include important.html content="Without setting a number of solvents that should be added, QCG will add solvent molecules until the interaction energy converges. 
As this is often difficult, it might occur that the program will not stop adding solvents. 
It is **highly recommended** to always define a number of solvent molecules that should be added with `--nsolv <INT>`." %}

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
{% include tr.html ctd1="-h, --help" td2="Print an overview of most available options (*i.e.*, more  or less this site completely)." %}

</tbody>
</table>

### Ensemble Algorithm Options

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
{% include tr.html ctd1="-h, --help" td2="Print an overview of most available options (*i.e.*, more  or less this site completely)." %}

</tbody>
</table>


### Solvation Free Energy Options

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
{% include tr.html ctd1="-h, --help" td2="Print an overview of most available options (*i.e.*, more  or less this site completely)." %}

</tbody>
</table>

