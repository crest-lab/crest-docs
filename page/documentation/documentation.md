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
The program supports molecular input files in the
- Turbomole coord format (**.coord** extension, Bohr)
- Xmol format (**.xyz** extension, Ångström) 
- MDL molfile format (V2000,V3000, **.sdf**/**.mol** extension, Ångström)

Examples for these input formats can be found [on this page.]({{site.baseurl}}/page/documentation/coords.html)

```bash
 crest [INPUT] [OPTIONS]
```

If no file is given as `[INPUT]`, then CREST automatically searches for a file called `coord` in the **.coord** format.
Either must be present. 
The different `[OPTIONS]` can be found [on this page.]({{site.baseurl}}/page/documentation/keywords.html)


