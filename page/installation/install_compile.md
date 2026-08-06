---
layout: default
title: Compiling from Source
parent: Installation
nav_order: 3
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
We recommend either the Intel `ifx`/`icx` or GNU `gfortran`/`gcc` compilers.
Both compilers can be obtained free-of-charge, but you'll only need one of them.
A quick reference on where to obtain either one is provided in the following.


### 1. GNU compilers

Installing the `gfortran` and `gcc` compilers on Unix systems is fairly straightforward.
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
sudo apt-get install build-essential
```
and check the `gcc` version with
```bash
gcc --version
```

If you decided on the GNU compilers, set them as your defaults:
```bash
export FC=gfortran CC=gcc
```

In case you are going for the GNU compilers, it also makes sense to install openBLAS as a linear algebra backend, for example on Ubuntu via
```bash
sudo apt-get install libopenblas-dev
```


### 2. Intel compilers via oneAPI

The `ifx` and `icx` compilers are available free-of-charge through Intel's [oneAPI initiative {% include elink.html %}](https://www.oneapi.io/).
You will need to first install the [Intel oneAPI Base Toolkit {% include elink.html %}](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html#base-kit) and
afterwards the [Intel oneAPI HPC Toolkit {% include elink.html %}](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html#hpc-kit).
Follow the instructions and check the installation via
```bash
ifx --version
```
If this gives you a version number, set these compilers as your defaults:
```bash
export FC=ifx CC=icx
```


---

## Install via CMake

CMake is one of the most widely used multiplatform build systems.
Starting with CREST 3.0, we will focus primarily on this build, although the Meson build may still be used.

It can be used with [Ninja {{site.data.icons.github}}](https://github.com/ninja-build/ninja) or the regular `make` as a backend.
CMake can be installed in different ways. For example from the [official website](https://cmake.org/install/), or via `pip`

```bash
pip install cmake
```


For the next steps you will need to have chosen a compiler (`ifx`/`icx` or `gfortran`/`gcc`) and exported the `FC` and `CC` variables as described [above {{site.data.icons.aup}}](#choice-of-compiler).
To start building CREST, navigate to the source (a file called `CMakeLists.txt` should be present here) and setup a `_build` directory with
```bash
cmake -B _build
```
Further arguments can be added to this command if you wish to customize the build.
Information about the subprojects is given on the programs [repository page {{site.data.icons.github}}](https://github.com/crest-lab/crest/tree/master/subprojects).

Optional feature flags (add to the `cmake -B _build` command):

| Flag | Effect |
|---|---|
| `-DWITH_GXTB=ON` | Enable g-xTB via tblite (also requires `-DWITH_TBLITE=ON`) |
| `-DWITH_FMLIP_RELAY=ON` | Enable ML potential interface via fmlip-relay |

Then build the project with
```bash
make -C _build
```
If you wish to use Ninja as a backend (instead of `make`), add the `-GNinja` option to the CMake setup command.

Unit tests can be run via
```
make test -C _build
```

{% include tip.html content="CREST 3.1 adds several new git submodules (<code>mctc-lib</code>, <code>mstore</code>, <code>multicharge</code>, <code>s-dftd3</code>). After cloning or pulling, run <code>git submodule update --init --recursive</code> to ensure all dependencies are present." %}


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
meson --version ; ninja --version
```
<br>
Instructions for building CREST with Meson are read from the `meson.build` file.
As before, you must have exported `FC` and `CC` variables to set the compilers.
To start building the program, navigate to the directory in which you have saved CREST and set up the build with
{: .text-justify }
```bash
meson setup _build
```
This will prepare the directory `_build` in which the program will be compiled.
{% include tip.html content="You may need to specify the linear algebra backend in the setup step. This is done by adding the <code>-Dlapack=&lt;option&gt;</code> keyword to the setup command. Available options are <code>auto</code> (default), <code>openblas</code>, <code>mkl</code>, <code>netlib</code>, and <code>custom</code>. For example, add <code>-Dlapack=mkl</code> to use the shared MKL library." %}

{% include tip.html content="To build a fully static binary, add <code>-Dstatic=true</code> to the Meson setup command. This attempts to link OpenMP and LAPACK runtimes statically and is useful for deployment on clusters without matching system libraries." %}

The optional features listed for the CMake build have Meson counterparts (add to the `meson setup _build` command):

| Flag | Effect |
|---|---|
| `-Dgxtb=true` | Enable g-xTB via tblite (also requires `-Dtblite=enabled`) |
| `-Dfmlip-relay=enabled` | Enable ML potential interface via fmlip-relay |

If the setup was successful, initiate the build (still in the same directory) with
```bash
ninja -C _build
```

