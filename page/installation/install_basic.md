---
layout: default
title: Step-by-step Installation
parent: Installation
nav_order: 1
permalink: /page/installation/install_basic.html
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
Installation instructions shown in the following were tested on *Ubuntu 20.04 LTS* {{ site.data.icons.ubuntu }}.
{: .text-justify }

## Requirements

Requirements for the installation can depend on whether you decide to install CREST from
the precompiled binaries, or build the program on yourself locally:
- In general, [compiling the program from source](/page/installation/install_basic.html#compiling-from-source) will provide you with a binary more tailored to your specific computer/architecture.
  Furthermore, you will be able to get the newest developments and code updates more quickly.
  However, building the program from source will require some effort.
- The installation of {% include tooltip.html tool="statically compiled binaries" tip=site.data.glossary.static_binary %} from GitHub {{ site.data.icons.github }} is faster and will in most cases be sufficient.
  However, in rare cases you might encounter runtime errors.
  Additionally, the precompiled program is updated only periodically with a new release, so some code updates might not yet be included.
- We also provide a `conda` installation (see *Option 2* below), which is probably the most straighforward way of obtaining the program. 
{: .text-justify }

Most CREST applications will require access to the [`xtb` program. {{ site.data.icons.ext }}](https://github.com/grimme-lab/xtb)
You will need to install `xtb` on your machine and make sure it can be executed globally.
You can follow the installation instructions for `xtb` on the [GitHub repository {{ site.data.icons.github }}](https://github.com/grimme-lab/xtb), but note that most of the process is similar to the CREST installation presented here.
If you plan on using QCG, you can either use the recommended `aISS` docking algorithm implemented in `xtb` version 6.6.0 and above or the [`xtbiff` program. {{ site.data.icons.ext }}](https://github.com/grimme-lab/xtbiff)
{: .text-justify }

---

## **Option 1**: Installation from precompiled binaries

[![Latest Version](https://img.shields.io/github/v/release/crest-lab/crest?color=khaki)](https://github.com/crest-lab/crest/releases/latest)
[![Github Downloads All Releases](https://img.shields.io/github/downloads/crest-lab/crest/total)](https://github.com/crest-lab/crest/releases)

The *statically linked* binaries can be found at the [release page](https://github.com/crest-lab/crest/releases) of this repository.
The most recent program version is automatically build (both Meson/Intel and CMake/GNU) from the main branch and can be found at the [continous release page](https://github.com/crest-lab/crest/          releases/tag/latest), or directly download them here:

[![Download (GNU)](https://img.shields.io/badge/download-GNU_build_binary-green)](https://github.com/crest-lab/crest/releases/download/latest/crest-gnu-12-ubuntu-latest.tar.xz)
[![Download (ifort)](https://img.shields.io/badge/download-ifort_build_binary-blue.svg)](https://github.com/crest-lab/crest/releases/download/latest/crest-intel-2023.1.0-ubuntu-latest.tar.xz)

Downloading the binary from one of those links skips step 1 and 2 in the following.

1. Navigate to the **_Releases_** tab on CREST's [GitHub page {{ site.data.icons.github }}]( {{ site.project }} ) 
   (Note, there is also a [**continuous release**  {{ site.data.icons.github }}](https://github.com/crest-lab/crest/releases/tag/latest), tied to the two above download links)
   {% include image.html file="install-1.png" %}

2. Select the release version you want to install (probably the one flagged as "*Latest*")
   and download the packed binary
   {% include image.html file="install-2.png" max-width=400 %}

3. Move the packed tarball (which includes the binary and license files) to some place of your choice (e.g., `/home/$USER/bin/`) and
   unpack it there
   Simply unpack the binary  and add it to your *PATH* variable.
   ```bash
   tar -xf crest-gnu-12-ubuntu-latest.tar.xz
   ```
   or
   ```bash
   tar -xf crest-intel-2023.1.0-ubuntu-latest.tar.xz
   ```


4. Assuming you put CREST in `/home/$USER/bin/`, make the statically linked binary
   an executable (might require `sudo`) with
   ```bash
   chmod +x /home/$USER/bin/crest
   ```
5. Then export it to your `PATH` variable to make it accessible on your system, if necessary
   ```bash
   export PATH=$PATH:/home/$USER/bin/
   ```
   You can check if the export was successful by executing the command
   ```bash
   which crest
   ```
   which should return the full path to the CREST binary.
   You can also add the `export` line to your `~/.bashrc` to load it on the terminal startup.

That's pretty much all.
If `xtb` has been correctly installed, you can now start to use CREST.
You can test the installation, for example by executing
```bash
crest --version
```
which should print the program header to the terminal.

---

## **Option 2**: Conda
[![Conda Version](https://img.shields.io/conda/vn/conda-forge/crest?color=khaki)](https://anaconda.  org/conda-forge/crest)
[![Conda Downloads](https://img.shields.io/conda/dn/conda-forge/crest.svg)](https://anaconda.org/    conda-forge/crest)

A [conda-forge](https://github.com/conda-forge) feedstock is maintained at <https://github.com/conda-forge/crest-feedstock>.

Installing CREST from the `conda-forge` channel can be done via:
  
```
conda install conda-forge::crest
```

The conda-forge distribution is based on a *dynamically linked* CMake/GNU build.
`conda` should take care of all the setup and core dependencies, but since it is a dynamically linked build, it can access different linear algebra backends like OpenBLAS or MKL.
{% include important.html content="When using OpenBLAS as shared library backend for the linear algebra in CREST, please set the  system variable `export OPENBLAS_NUM_THREADS=1`, as there may be an ugly warning in the concurrent (nested) parallel code parts otherwise." %}

You can test the installation, for example by executing
```bash
crest --version
```
which should print the program header to the terminal


---

## **Option 3**: Compiling from source

If you wish to build the program yourself from the source code, you will first
have to obtain it.
For this, navigate to CREST's [GitHub page {{ site.data.icons.github }}]( {{ site.project }} ) and
either fork it (if you are familiar with GitHub), or locate the "*Code*" button.
{: .text-justify }

{% include image.html file="install-3.png" max-width=400 %}

There, you will have the option to either clone the project with `git` via the command line
```bash
git clone {{ site.project }}.git /directory/of/your/choice
```

If you chose to build the program from source, it is advisable to download any motential subprojects that will be build into CREST.
To do so, go to the project directory that you just have set up, and execute
```bash
git submodule init
git submodule update
```
which should check out all the subprojects.
To update the submodule sources from the respective remote branches
```bash
git submodule update --remote
```
can be used.



After you have obtained the source code, you will need to build the program.
Instructions on this can be found on the next page.
{: .text-justify }

[ Continue: Compiling from Source {{ site.data.icons.aright }}](./install_compile.html){: .btn .btn-blue }
