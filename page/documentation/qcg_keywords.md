---
layout: default
title: QCG Keywords
parent: Keyword Documentation
grand_parent: Documentation
nav_order: 1
summary: "The list of available command line arguments for QCG."
permalink: /page/documentation/qcg.html
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
The general and technical command line options of CREST also apply for the QCG runtype 
(see [**Keyword Documentation**]({{site.baseurl}}/page/documentation/keywords.html)).
Take care to always set the number of cores with `--T <INT>`.
The `[OPTIONS]` that can be used in conjunction with `-qcg` are documented below.
{: .text-justify }

## QCG Runtypes

{% include 3tab.html obj=site.data.qcg.qcgruntypes %}

### Grow Algorithm Options

{% include important.html content="Without setting a number of solvents that should be added, QCG will add solvent molecules until the interaction energy converges. 
As this is often difficult, it might occur that the program will not stop adding solvents. 
It is **highly recommended** to always define a number of solvent molecules that should be added with `--nsolv <INT>`." %}

{% include 2tab.html obj=site.data.qcg.qcggrow %}


### Ensemble Algorithm Options

{% include 2tab.html obj=site.data.qcg.qcgensemble %}


### Solvation Free Energy Options

{% include 2tab.html obj=site.data.qcg.qcgsolv %}
