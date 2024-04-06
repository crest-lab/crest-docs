---
layout: default
title: Documentation
nav_order: 5
has_children: true
permalink: /page/documentation
toc: false
---

# {{page.title}}

On these pages you will find detailed information about the usage of CREST.
{: .fs-6 .fw-300 }

---

## General Usage

CREST is usually invoked via command line, and requires only a coordinate input file. 

```bash
 crest [INPUT] [OPTIONS]
```

Examples for atomic coordinate input formats can be found on the [**File Formats** {{site.data.icons.book}}]({{site.baseurl}}/page/documentation/coords.html) page.
If no file is given as `[INPUT]`, then CREST automatically searches for a file called `coord` in the **.coord** format.
Usually, either must be present. 
The different command line `[OPTIONS]` can be found in the [**Keyword Documentation** {{site.data.icons.book}}]({{site.baseurl}}/page/documentation/keywords.html).
{: .text-justify }


**As of, [CREST 3.0]({{site.baseurl}}/page/releases/release_current.html) instructions can be defined entriely in a separate input file in the TOML format.**
The `*.toml` input file can be given as the `[INPUT]` argument or passed explicitly via
```bash
crest --input <INPUTFILE>
```
For more information see the [**Input File Documentation** {{site.data.icons.book}}]({{site.baseurl}}/page/documentation/inputfiles.html) section,
or [some **input examples**]({{site.baseurl}}/page/documentation/inputfiles_examples).


{% include note.html content="Command line arguments and options read from the TOML input file are usually compatible. As a rule-of-thumb, command line arguments have a higher parsing priority and will overwrite options from the input file at runtime." %}

