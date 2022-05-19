---
layout: default
title: Compiling from Source
parent: Installation
nav_order: 2
permalink: /page/installation/install_compile.html
summary: "This guide contains instructions for compiling CREST from source."
---

# {{page.title}}
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

{% include tip.html content="A great resource for the things discussed in the following and the *Fortran* programming language in general is also the [**fortran-lang.org** <i class='fa-solid fa-arrow-up-right-from-square'></i>](https://fortran-lang.org) project. Check it out!" %}

## Choice of Compiler

In order to compile CREST from source you will need a Fortran and C compiler.
We recommend either the Intel `ifort`/`icc` or GNU `gfortran`/`gcc` compilers.
Both compilers can be obtained free-of-charge, but in our own developments we primairly use the Intel compilers.
A quick reference on where to obtain either one is proveded in the following.

{% include note.html content="We recommend the `ifort`/`icc` compilers." %}


### 1. Intel compilers via oneAPI

The `ifort` and `icc` compilers have become publically available only recently with the introduction of Intel's [oneAPI initiative {% include elink.html %}](https://www.oneapi.io/).
You will need to first install the [Intel oneAPI Base Toolkit {% include elink.html %}](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html#base-kit) and 
afterwards the [Intel oneAPI HPC Toolkit {% include elink.html %}](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html#hpc-kit).
Follow the instructions and check the installation via
```bash
ifort -v
```
If this gives you a version number, set these compilers as your defaults:
```bash
export FC=ifort CC=icc
```


### 2. GNU compilers

Installing the `gfortran` and `gcc` compilers on Unix systems is fairly straight-foward.
The installation can be done directly via the commandline, e.g., with
```bash
sudo apt-get install gfortran
```
Check the installation and `gfortran` version with
```bash
gfortran --version
```

The `gcc` compiler is included in the `build-essential` package and there is a good chance you have installed this on your Linux system already.
If not, try installing it via
```bash
sudo apt update
sudo apt-get install build-essentials
```
and check the `gcc` version with
```bash
gcc --version
```

If you decided on the GNU compilers, set them as your defaults:
```bash
export FC=gfortran CC=gcc
```

## Install via CMake

## Install via Meson

