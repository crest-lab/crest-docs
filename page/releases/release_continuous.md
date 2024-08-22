---
layout: default
title: Continuous Release
parent: Releases
nav_order: 1
toc: false
summary: "Notes on the continuous release version of CREST"
permalink: /page/releases/release_continuous.html
---

# CREST Continuous Release
{: .no_toc }

---

The continuous release of CREST can be found at [**https://github.com/crest-lab/crest/releases/tag/latest**  {{ site.data.icons.github }}](https://github.com/crest-lab/crest/releases/tag/latest)

It is automatically build from the most current commit on the CREST main branch, once using the `meson` build system with `ifort`/`icx` compilers and once with GNU compilers and openBLAS as linear algebra backend.

To use the program simply download the tar ball, unpack it
```bash
tar -xf crest-gnu-12-ubuntu-latest.tar.xz
```
and add the binary to your program path (see [**here**]({{site.baseurl}}//page/installation/install_basic.html#installation-from-precompiled-binaries)). Being statically linked, the binaries should not need any further dependencies at run time.

