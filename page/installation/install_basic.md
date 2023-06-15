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
{: .text-justify }

Most CREST applications will require access to the [`xtb` program. {{ site.data.icons.ext }}](https://github.com/grimme-lab/xtb)
You will need to install `xtb` on your machine and make sure it can be executed globally.
You can follow the installation instructions for `xtb` on the [GitHub repository {{ site.data.icons.github }}](https://github.com/grimme-lab/xtb), but note that most of the process is similar to the CREST installation presented here.
If you plan on using QCG, you will also need to install the [`xtbiff` program. {{ site.data.icons.ext }}](https://github.com/grimme-lab/xtbiff)
{: .text-justify }

---

## Installation from precompiled binaries

Installation via precompiled static binaries is the the simplest option.
First, you will have to download the program.

1. Navigate to the **_Releases_** tab on CREST's [GitHub page {{ site.data.icons.github }}]( {{ site.project }} ) 
   (Note, there is also a [**continuous release**  {{ site.data.icons.github }}](https://github.com/crest-lab/crest/releases/tag/latest))
   {% include image.html file="install-1.png" %}

2. Select the release version you want to install (probably the one flagged as "*Latest*")
   and download the packed binary
   {% include image.html file="install-2.png" max-width=400 %}

3. Move the packed binary to some place of your choice (e.g., `/home/$USER/bin/`) and
   unpack it there
   ```bash
   unzip crest.zip
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

## Compiling from source

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

or simply download the ZIP file.
After you have obtained the source code, you will need to build the program.
Instructions on this can be found on the next page.
{: .text-justify }

[ Continue: Compiling from Source {{ site.data.icons.aright }}](./install_compile.html){: .btn .btn-blue }
