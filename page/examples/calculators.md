---
layout: default
title: "Special Calculators"
parent: "Examples and Guides"
nav_order: 5
has_children: true
permalink: /page/examples/calculators.html
summary: "Energy and gradient backends beyond the built-in semiempirical methods."
toc: false
---

# {{page.title}}

{{page.summary}}
{: .fs-6 .fw-300 }

CREST can obtain energies and gradients from external programs and from machine-learned
interatomic potentials. All of these are set up via `[[calculation.level]]` blocks of a
[TOML input file]({{site.baseurl}}/page/documentation/inputfiles.html).
{: .text-justify }
