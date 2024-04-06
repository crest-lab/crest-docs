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

{% include tip.html content="A great resource for the things discussed in the following and the *Fortran* programming language in general is the [**fortran-lang.org** <i class='fa-solid fa-arrow-up-right-from-square'></i>](https://fortran-lang.org) project. Check it out!" %}

## Choice of Compiler

In order to compile CREST from source you will need a Fortran and C compiler.
We recommend either the Intel `ifort`/`icx` or GNU `gfortran`/`gcc` compilers.
Both compilers can be obtained free-of-charge, but in our own developments we primairly use the Intel compilers.
A quick reference on where to obtain either one is proveded in the following.

{% include note.html content="We recommend the `ifort`/`icx` compilers. The `icx` compiler replaces `icc`, for which Intel has now discontinued support." %}


### 1. Intel compilers via oneAPI

The `ifort` and `icx` compilers have become publically available only recently with the introduction of Intel's [oneAPI initiative {% include elink.html %}](https://www.oneapi.io/).
You will need to first install the [Intel oneAPI Base Toolkit {% include elink.html %}](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html#base-kit) and 
afterwards the [Intel oneAPI HPC Toolkit {% include elink.html %}](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html#hpc-kit).
Follow the instructions and check the installation via
```bash
ifort -v
```
If this gives you a version number, set these compilers as your defaults:
```bash
export FC=ifort CC=icx
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

---

## Install via CMake

CMake is one of the most widely used multiplatform build systems.
Starting with CREST 3.0, we will focus primarily on this build, although the meson build may still be used 

It can be used with [Ninja {{site.data.icons.github}}](https://github.com/ninja-build/ninja) or the regular `make` as a backend.
CMake can be installed in different ways. For example from the [official webiste](https://cmake.org/install/), or via   `pip`

```bash
pip install cmake
```


For the next steps you will need to have chosen a compiler (`ifort`/`icx` or `gfortran`/`gcc`) and   exported the `FC` and `CC` variables as described [above {{site.data.icons.aup}}](#choice-of-        compiler).
To start building CREST, navigate to the source (a file called `CMakeLists.txt` should be present here) and setup a `_build` directory with
```bash
cmake -B _build
```
Further arguments can be added to this command if you wish to customize the build, for example for including or excluding suprojects. Information about the subprojects is given on the programs [repository page {{site.data.icons.github}}](https://github.com/crest-lab/crest/tree/master/subprojects).

Then build the project with
```bash
make -C _build
```
If you wish to use Ninja as a backend (instead of `make`), add the `-GNinja` option to the CMake setup command.

Starting with CREST 3.0, we introduce unit tests that can be run via the CMake build. 
To run these, after having build the program, use
```
make test -C _build
```

The unit tests will be expanded over time.


---

## Install via Meson

Meson is an open source multiplatform build system. The main development project can be found on [Meson's GitHub page {{site.data.icons.github}}](https://github.com/mesonbuild/meson).
Meson is used in combination with the [Ninja {{site.data.icons.github}}](https://github.com/ninja-build/ninja) build system (version > 1.8) as a backend.
Both can be installed from the command line via `pip` (Python version > 3.7).
```bash
python3 -m pip install meson ninja
```
**OR** via
```bash
sudo apt install meson ninja-build
```
Check their installation with
```bash
meson --version ; ninja --verison
```
<br>
Instructions for building CREST with Meson are read from the `meson.build` file.
As before, you must have  exported `FC` and `CC` variables to set the compilers.
However, momentarily the meson build defaults only work with the `ifort/icx` architecture.
To start building the program, navigate to the directory in which you have saved CREST and set up the build with
{: .text-justify }
```bash
meson setup _build
```
This will prepare the directory `_build` in which the program will be compiled.
{% include tip.html content="You may need to specify the linear algebra backend in the setup step. This is done by adding the `-Dla_backend=<option>` keyword to the setup command.
For example, add `-Dla_backend=mkl` to use the shared MKL library." %}

If the setup was successfull, initiate the build (still in the same directory) with
```bash
ninja -C _build
```

---


## Conda

[![Conda Version](https://img.shields.io/conda/vn/conda-forge/crest.svg)](https://anaconda.org/conda-forge/crest)

Installing CREST from the [`conda-forge` channel](https://conda-forge.org/) can be achieved by adding `conda-forge` to your channels with:

```bash
conda config --add channels conda-forge
```

Once the `conda-forge` channel has been enabled, CREST can be installed with:

```bash
conda install crest
```

It is possible to list all of the versions of CREST available on your platform with:

```bash
conda search crest --channel conda-forge
```
