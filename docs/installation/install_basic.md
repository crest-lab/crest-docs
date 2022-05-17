---
layout: default
title: Step-by-step Installation
parent: Installation
nav_order: 1
permalink: /docs/installation/install_basic.html
summary: "This guide contains detailed step-by-step instructions for the installation of CREST. Make sure to read it carefully."
---

# {{page.title}}
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---



CREST was built as a commandline-based application for UNIX distributions.
Therefore, this guide will assume that you are familiar with the basic navigation in the terminal.
Installation instructions shown in the following were tested on *Ubuntu 20.04 LTS*.

## Requirements

Requirements for the installation can depend on whether you decide to install CREST from
the precompiled binaries, or build the program on yourself locally:
- In general, [compiling the program from source](/docs/installation/install_basic.html#compiling-from-source) will provide you with a binary more tailored to your specific computer/architecture.
  Furthermore, you will be able to get the newest developments and code updates more quickly.
  However, building the program from source will require some effort.
- The installation of {% include tooltip.html tool="statically compiled binaries" tip=site.data.glossary.static_binary %}statically compiled binaries</a> from GitHub is faster and will in most cases be sufficient.
  However, in rare cases you might encounter runtime errors.
  Additionally, the precompiled program is mostly updated only when a new version is released, so some code updates might not be included.

Most CREST applications will require access to the [`xtb` program. {% include elink.html %}](https://github.com/grimme-lab/xtb)
You will need to install `xtb` on your machine and make sure it can be executed globally.
You can follow the installation instructions for `xtb` on the [GitHub repository {% include elink.html %}](https://github.com/grimme-lab/xtb), but note that most of the process is similar to the CREST installation presented here.
If you plan on using QCG, you will also need to install the [`xtbiff` program. {% include elink.html %}](https://github.com/grimme-lab/xtbiff)


## Installation from precompiled binaries

Installation via precompiled static binaries is the the simplest option.



## Compiling from source
