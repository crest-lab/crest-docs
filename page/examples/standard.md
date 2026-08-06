---
layout: default
title: "Standard Runtypes"
parent: "Examples and Guides"
nav_order: 0
has_children: true
permalink: /page/examples/standard.html
summary: "Singlepoints, geometry optimizations and molecular dynamics."
toc: false
---

# {{page.title}}

{{page.summary}}
{: .fs-6 .fw-300 }

Before CREST does anything else, it has to be able to evaluate an energy and a gradient.
The three runtypes collected here are exactly that machinery used on its own: a single
energy evaluation, a geometry relaxation, and a molecular dynamics simulation. They are the
building blocks that the conformational sampling workflows are assembled from, and they are
useful in their own right for quick checks of a structure or a level of theory.
{: .text-justify }

All three accept the same calculation levels, so anything documented under
[Special Calculators]({{site.baseurl}}/page/examples/calculators.html) can be used with them.
{: .text-justify }

| Runtype | Command line | TOML `runtype` |
|---|---|---|
| [Singlepoint calculations](standard_sp.html) | `--sp` | `"singlepoint"` |
| [Geometry optimizations](standard_opt.html) | `--opt`, `--ohess` | `"optimize"`, `"ancopt"` |
| [Molecular dynamics](standard_md.html) | `--dynamics` | `"dynamics"` |
| [Ensemble optimization](utilities/utils_1.html) | `--mdopt`, `--screen` | `"optimize_ensemble"`, `"screen_ensemble"` |

The last one is the ensemble counterpart of the geometry optimization: the same optimizer
applied to every structure of an ensemble or trajectory file, in parallel.
{: .text-justify }
