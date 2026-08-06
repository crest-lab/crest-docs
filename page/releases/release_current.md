---
layout: default
title: Release 3.1.x
parent: Releases
nav_order: 3
toc: true
summary: "Release notes for current CREST version"
permalink: /page/releases/release_current.html
---

# CREST Release 3.1.x
{: .no_toc }

<div class="label label-green">CREST 3.1</div>

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## CREST 3.1.0

CREST 3.1.0 collects the developments of the past year into a single major update.
It is a refactoring release rather than a rewrite: the calculator, optimizer and MD
infrastructure introduced with [CREST 3.0](release_old.html) stays in place, but it gains
a new search algorithm, three new calculator backends, a permutation-invariant ensemble
comparison, and a considerably reworked build system.
{: .text-justify }

The sections most relevant for everyday use come first.
{: .text-justify }

---

### 1. g-xTB via tblite

The [g-xTB method {{ site.data.icons.ext }}](https://chemrxiv.org/doi/10.26434/chemrxiv-2025-bjxvt),
a new member of the GFN family, can now be used from CREST, either through the provided
`xtb` binary or through the **tblite** library.
{: .text-justify }

- New calculator level `gxtb`, selectable as `--gxtb` on the command line or
  `method = "gxtb"` in a [TOML input file]({{site.baseurl}}/page/documentation/inputfiles.html).
- The Fermi temperature is forced to 0 K for g-xTB, as the method requires. The previous
  default of 300 K produced wrong energies.
- Numerical gradients are delegated to g-xTB's own implementation, which avoids repeatedly
  reinitializing the calculator.

{% include warning.html content="The default build only supports g-xTB through the static <code>xtb</code> binary (available <a href='https://github.com/grimme-lab/g-xtb'>here</a>), which is slow because of the system-call infrastructure. The tblite path is prepared and can be enabled at compile time, but the shipped tblite 0.7.0 does <b>not</b> implement g-xTB yet, so it will only become the default once g-xTB is released there. A static CREST binary with tblite/g-xTB is [available on request <i class='fa-solid fa-envelope'></i>](mailto:research@philipp-pracht.de)." %}

---

### 2. TTConf: tensor-train conformer search

The new `-ttconf` runtype is a reimplementation of the **tensor-train (TT) conformer
search** of
[Zurek *et al.*, *J. Chem. Theory Comput.* **2025**](https://doi.org/10.1021/acs.jctc.4c01275),
integrated into the usual CREST level-of-theory and ensemble handling.
{: .text-justify }

Instead of sampling conformers by (meta)dynamics, TTConf places each rotatable dihedral on a
**discrete grid** and locates the low-energy region of the resulting energy tensor with a
**TT-cross sweep**, without ever enumerating the full grid. The optimized grid minima are
collected, sorted with CREGEN, and written out as the standard CREST ensemble files.
{: .text-justify }

On the CD25 drug-molecule benchmark, at the same GFN-FF level, this reaches the iMTD-GC
result with a **median speedup of about 5.8×**, most often locating the same global minimum
and in several cases a lower one.
{: .text-justify }

- Selected with `-ttconf` (or `runtype = "ttconf"`), optionally followed by one of the
  presets `fast`, `normal` (default) or `accurate`, or by `bruteforce` for an exhaustive
  reference run on the chosen grid.
- Tuned through the `-tt…` flags (`-ttgrid`, `-ttrank`, `-ttsweeps`, `-ttewin`, `-ttsp`,
  `-ttseed`, ...) or the equivalent `[ttconf]` block of a TOML input file.
- Flexible rings are sampled on request with `-ttrings`. The ring generator is a GFN-FF
  metadynamics on an isolated ring cut-out, which is the one deliberate deviation from the
  original publication.

[Read the TTConf guide {{ site.data.icons.aright }}]({{site.baseurl}}/page/examples/ttconf.html){: .btn .btn-blue }

{% include note.html content="TTConf is designed for a <b>single covalent molecule</b>. A warning is printed if the input contains more than one covalent fragment." %}

---

### 3. Permutation-invariant RMSD (iRMSD)

A new `irmsd_module` replaces the old fixed-order RMSD with an algorithm that determines the
optimal atom permutation before computing the distance, so that chemically identical
structures are recognized as such regardless of atom ordering, symmetry-equivalent atom
exchange, or mirror imaging. The method is described in
[*J. Chem. Inf. Model.*, **2025**, *65*, 4501–4511](https://doi.org/10.1021/acs.jcim.4c02143).
{: .text-justify }

- Two assignment solvers are provided, a classic Hungarian algorithm and an LSAP variant.
  Atom ranks derived from element identity and local connectivity keep the permutation
  search restricted to chemically equivalent atoms.
- CREGEN gains iRMSD-based sorting as an additional conformer-uniqueness criterion.
- Standalone use through `--irmsd <FILE1> <FILE2>` (and `--irmsd_noinv`), writing the
  aligned structures to `irmsd.xyz`, and through `--sort <ENSEMBLE> isort` for ensembles.
- `--inversion <auto|on|off>` controls whether mirror images are treated as identical.
- A `rmsd_cache` type avoids repeated heap allocations in tight OpenMP loops.

The implementation is consistent with the standalone Python package
[**irmsd** {{ site.data.icons.github }}](https://github.com/pprcht/irmsd), but exposed to
OpenMP parallelism for ensemble processing.
{: .text-justify }

[Read the iRMSD guide {{ site.data.icons.aright }}]({{site.baseurl}}/page/examples/irmsd.html){: .btn .btn-blue }

---

### 4. ML interatomic potentials via fmlip-relay

A new calculator backend calls Python-based ML interatomic potentials through
[**fmlip-relay** {{ site.data.icons.github }}](https://github.com/pprcht/fmlip-relay), a
persistent relay server that keeps the Python interpreter alive between calls instead of
restarting it for every single point.
{: .text-justify }

- Available backends are `lj`, `mace`, `mace_mp`, `mace_off`, `uma` (FairChem UMA) and
  `dummy`.
- Set up with `method = "mlip"` plus `mlip_backend`, `mlip_modelsize`, `mlip_device`,
  `mlip_uma_task` and related keys in a `[[calculation.level]]` block, or quickly from the
  command line with `-mlip <uma|maceoff>`.
- Multiple server instances run on different ports for parallel workflows, with a
  configurable CPU thread cap per instance via the per-level `threads` key.
- The Python package is installed separately from the Fortran build, with
  `pip install ./subprojects/fmlip_relay`.

{% include important.html content="The persistent Python socket adds overhead and can oversubscribe the machine in parallel MD/optimization loops. The recommended use is as the refinement level of a composite setup, re-ranking force-field optimized geometries with MLIP singlepoints." %}

[Read the MLIP guide {{ site.data.icons.aright }}]({{site.baseurl}}/page/examples/mlip.html){: .btn .btn-blue }

---

### 5. Method-independent implicit solvation via ddX

The [**ddX** {{ site.data.icons.github }}](https://github.com/ddsolvation/ddX) continuum
solvation library is added as a submodule and wired into a new solvation calculator. Unlike
the self-consistent reaction field of tblite, which is tied to the xTB charges, this one is
driven by *externally supplied* atomic point charges and can therefore be layered on top of
**any** parent potential, including force fields and MLIPs that bring no solvation model of
their own.
{: .text-justify }

The composite free energy is stitched together from
{: .text-justify }

- charges and their geometry derivative d*q*/d*R* from an EEQ / EEQ-BC electrostatic
  component,
- the polar (electrostatic) term from the ddX continuum engine, in a COSMO, CPCM or PCM
  flavor,
- a nonpolar surface-tension term over the SASA, using the cached GFN2/ALPB parameters, and
- an optional charge-dependent hydrogen-bond correction.

It is requested as a `method = "solvation"` level, configured with the keys `solvent`,
`solv_model` (`cosmo`, `cpcm`, `pcm`), `solv_charges` (`eeq`, `eeqbc`) and `solv_hbond`.
The charge model of the standalone electrostatics component is selected with `eeq_model`.
{: .text-justify }

{% include note.html content="ddX is pulled in as a hard dependency of the tblite block, so <code>WITH_DDX</code> is defined automatically whenever the build is configured <code>WITH_TBLITE</code>. No separate build flag is needed." %}

---

### 6. Spin-polarized calculations

GFN2-xTB and related tblite methods can be run open-shell (spin-polarized). The wavefunction
is allocated with `nspin = 2` and a `spin_polarization` container built from the tblite spin
constants is added to the calculator, which is the spGFN2-xTB setup.
{: .text-justify }

It is requested explicitly, either with `-spinpol` (alias `-spin-polarized`) on the command
line or with `spin_polarized = true` in a `[[calculation.level]]` block. The number of
unpaired electrons has to be set alongside it, most conveniently with `-mult <2S+1>`
(alias `-multiplicity`), which stores the value as `uhf = 2S+1-1`. When active, the
calculation summary reports `Spin-polarization : yes`.
{: .text-justify }

{% include note.html content="Spin-polarization applies to <b>tblite</b> levels only. Setting it on a GFN-FF, GFN0-xTB, ORCA or MLIP level has no effect, and the flag alone does nothing as long as the multiplicity is left at its closed-shell default." %}

---

### 7. External electric field for tblite

A static external electric field can be applied to tblite single-points and optimizations,
either as the TOML key `efield = [0.0, 0.0, 0.05]` (V/Å, *x*/*y*/*z* components) within a
`[[calculation.level]]` block, or via `-efield <x> <y> <z>` on the command line.
{: .text-justify }

---

### 8. Extended XYZ (extxyz) format support

A complete reader and writer for the ASE-compatible **extxyz** format is added to the
molecule I/O layer:
{: .text-justify }

- Per-atom properties and comment-line key/value pairs (`energy`, `forces`, `Lattice`, ...)
  are parsed, and `.extxyz` files are routed to the extended writer automatically.
- Energy and force units are tracked and converted to CREST internal units on read, and
  written back with an explicit `energy_units` key.
- Ensemble readers accept extxyz files, and trajectory output including `crestopt.log.xyz`
  can be written in this format, allowing direct round-trips with ASE or MACE pipelines.

{% include warning.html content="Following the extxyz convention, an <code>energy</code> without an explicit <code>energy_units</code> entry is read as <b>eV</b>, unlike a plain <b>.xyz</b> file, where the comment-line energy is read as Hartree." %}

[Read the coordinate format documentation {{ site.data.icons.aright }}]({{site.baseurl}}/page/documentation/coords.html){: .btn .btn-blue }

---

### 9. CREGEN refactor and improved output

The conformer ranking and filtering code was reorganized substantially:
{: .text-justify }

- All CREGEN routines now live under `src/sorting/` as a proper module directory; the old
  monolithic implementation is retained only as a legacy shim.
- Reconstruction of incomplete ensemble queues is parallelized, and the queue is pre-sorted
  beforehand to avoid redundant comparisons.
- The conformer list printout adds a running **50 % accumulative Boltzmann population** line,
  giving a quick indication of how many structures make up the dominant half of the ensemble.
- Column widths, energy and RMSD fields, and group labels were reformatted throughout.

---

### 10. Redesigned restart / checkpoint system

The previous restart mechanism kept full ensemble snapshots in memory, which was fragile and
memory-intensive. It is replaced by a lightweight file-based checkpoint:
{: .text-justify }

- A small plain-text `crest.restart` file records only the **stage name** (`mtd_loop`,
  `post_collect`, `entropy_smtd`, ...) and the **last written ensemble file**.
- Checkpoints are written at every stage boundary of the iMTD-GC and entropy-mode workflows.
- Re-issuing the same command in the same directory resumes the run: CREST reports what was
  completed, skips the finished stages and reuses the last dumped ensemble.
- Checkpointing is active by default and can be switched off with `--norestart`.

[Read the restart guide {{ site.data.icons.aright }}]({{site.baseurl}}/page/examples/restart.html){: .btn .btn-blue }

---

### 11. Symmetry detection ported from C to Fortran

The symmetry detection backend, originally Patchkovskii's C code from 1996/2003, was ported
to a native Fortran module. The C version wrote to shared memory, which made OpenMP-parallel
symmetry detection impossible. The Fortran module exposes `schoenflies` and `getsym` with an
identical interface, removes the C-to-Fortran bridge, and is covered by a test over the
common point groups.
{: .text-justify }

---

### 12. Thermochemistry enhancements

- **Truhlar quasi-RRHO treatment.** The Truhlar (2011) frequency cutoff model is available as
  an alternative to the Grimme quasi-RRHO approach, selectable through the `emodel` keyword.
  Modes below `sthr` are treated as free rotors, avoiding the divergence of the harmonic
  entropy at zero frequency.
- **ORCA Hessian reader.** ORCA `.hess` files are parsed directly for frequencies and, on
  request, mass-weighted Hessian data.
- **Parallel Δ*G* calculation.** The per-conformer free-energy correction used in refinement
  workflows is computed in parallel OpenMP sections rather than serially, which the symmetry
  port above made possible.

---

### 13. Composite (hybrid) method syntax

A new parser recognizes composite method strings that combine a fast workhorse method with a
higher-level quality method in a single argument:
{: .text-justify }

| Syntax | Meaning |
|---|---|
| `--<A>@<B>` | sampling entirely at *B*; all final conformers re-optimized at *A* |
| `--<A>//<B>` | inline single-point re-ranking at *A* during the *B*-driven search |
| `--<A>/sp/<B>` | explicit inline single-point variant |
| `--<A>/opt/<B>` | inline geometry re-optimization at *A* |

For example, `crest mol.xyz --gfn2@gfnff --imtdgc` runs the MD/MTD at GFN-FF speed and
refines the final structures with GFN2-xTB, while `crest mol.xyz --gxtb//gfnff --imtdgc`
samples at GFN-FF and re-ranks all structures with g-xTB singlepoints during the search.
Method tokens are validated against the known method list, so an unknown token raises an
early error instead of a silent misconfiguration.
{: .text-justify }

[Read the composite calculator guide {{ site.data.icons.aright }}]({{site.baseurl}}/page/examples/composite.html){: .btn .btn-blue }

---

### 14. New CLI and TOML keywords

| Keyword / flag | Effect |
|---|---|
| `--freeze` / `freeze` | freeze selected atoms (previously TOML-only, now also on the CLI) |
| `--inversion` | allow or forbid mirror-image matching in iRMSD comparisons |
| `--imtdgc` | alias for `--v3`, the iMTD-GC run mode |
| `--norestart` | disable the checkpoint-based restart of conformer searches |
| `--sort <ENSEMBLE> isort` | invoke the iRMSD-aware sorter |
| `-spinpol` / `spin_polarized` | open-shell spin-polarized tblite calculation |
| `-mult <2S+1>` | spin multiplicity, stored internally as `uhf = 2S+1-1` |
| `efield` (TOML) | external electric field vector for tblite |
| `ceh_guess` (TOML/CLI) | use CEH charges as the initial guess for GFN-FF / tblite |
| `gxtb` (TOML) | select g-xTB, via tblite or via an `xtb` system call |

The CLI argument parser was refactored to track processed arguments explicitly, which
prevents double-processing and yields cleaner errors for unrecognized flags.
{: .text-justify }

---

### 15. QCG refactor

The quantum cluster growth tool was moved onto the internal calculator layer:
{: .text-justify }

- The legacy `zmolecule` type is replaced by a polymorphic `coord_qcg` type extending the
  standard `coord`.
- Single-points and optimizations dispatch through the standard `engrad` interface instead of
  writing `xtb` input files by hand.
- The deprecated `xtbiff` implementation is removed.
- QCG frequency calculations are wired through the same thermochemistry module as the rest of
  CREST, and the module structure was reorganized.

{% include warning.html content="QCG still requires <code>xtb</code> (version 6.7.1 or newer) for access to the aISS docking method." %}

---

### 16. New MD thermostats

Two thermostats join the existing Berendsen thermostat in the MD module:
{: .text-justify }

- **Langevin**, a stochastic collision model adding friction and random noise forces at each
  step, appropriate when coupling to an implicit solvent bath is desired.
- **Bussi–Donadio–Parrinello (BDP/CSVR)**, stochastic velocity rescaling that preserves the
  correct canonical distribution, unlike Berendsen. The kinetic energy is drawn from a
  chi-squared distribution at each step.

The velocity Verlet integrator was cleaned up to guarantee the correct ordering of force,
velocity and thermostat steps. Berendsen remains the default.
{: .text-justify }

---

### 17. Peak memory reporting

The final timing and resource printout now includes the process peak resident set size,
obtained through a small cross-platform C helper built on `getrusage`.
{: .text-justify }

{% include note.html content="The peak memory value may be slightly off for fully static CREST builds." %}

---

### 18. Output file naming

Two output files were renamed to carry explicit extensions, which makes them recognizable to
external viewers and matches the convention used for the other trajectory and ensemble
outputs:
{: .text-justify }

| Old name | New name |
|---|---|
| `crestopt.log` | `crestopt.log.xyz` |
| `crest_dynamics.trj` | `crest_dynamics.trj.xyz` |

---

### 19. Build system updates

**Meson.** Full Meson support is restored, including static builds with GNU and Intel LLVM
(`ifx`/`icx`) compilers. `meson_options.txt` is restructured with documented options for
OpenMP, the LAPACK/BLAS provider (`auto`, `openblas`, `mkl`, `netlib`, `custom`) and the
optional features `-Dgxtb=true` and `-Dfmlip-relay=enabled`. An `intel-llvm.ini` native file
is provided for reproducible Intel oneAPI builds.
{: .text-justify }

**CMake.** New `Find*.cmake` modules cover the whole tblite dependency stack, and the build
options `WITH_GXTB` (which requires `WITH_TBLITE`) and `WITH_FMLIP_RELAY` were added.
{: .text-justify }

**Submodules.** `mctc-lib`, `mstore`, `multicharge`, `s-dftd3`, `ddx` and `test-drive` are
added as submodules so that tblite can be built from source, and the existing ones are
updated:
{: .text-justify }

| Submodule | Version |
|---|---|
| `tblite` | 0.7.0 |
| `gfnff` | 0.2.0 |
| `dftd4` | 4.2.0 |
| `s-dftd3` | 1.4.0 |
| `multicharge` | 0.5.0 |
| `mctc-lib` | 0.5.2 |
| `toml-f` | 0.5.2 |
| `ddx` | 0.8.0 |

{% include important.html content="When updating a local source build, update the submodules as well. The recommended way is to use the <code>git submodule</code> machinery rather than letting Meson or CMake resolve them, for example with <code>git submodule update --init --recursive</code>." %}

{% include warning.html content="The shipped tblite 0.7.0 does <b>not</b> implement g-xTB. A tblite build with g-xTB support is [available on request <i class='fa-solid fa-envelope'></i>](mailto:research@philipp-pracht.de)." %}

[Read the compilation guide {{ site.data.icons.aright }}]({{site.baseurl}}/page/installation/install_compile.html){: .btn .btn-blue }

---

### 20. Post-search re-ranking and re-optimization

Two standalone post-processing flags apply a higher level of theory to a finished ensemble
without re-running the search:
{: .text-justify }

- **`--rerank <METHOD>`** recomputes single-point energies at the given level and re-sorts the
  ensemble by the new energies.
- **`--reopt <METHOD>`** re-optimizes every conformer at the given level and then re-sorts.

Both add a job to the property queue, so they compose cleanly with other post-search steps
such as `--finalhess`.
{: .text-justify }

---

### 21. Ensemble Hessians and free-energy ranking

Two flags provide Hessian-based thermochemistry over conformer ensembles:
{: .text-justify }

- **`--ensemblehess <FILE>`** (alias `--mdhess`) reads the given ensemble and computes a
  numerical Hessian plus thermochemistry for each conformer, extracting the lowest structure
  as the reference geometry.
- **`--finalhess`** appends a Hessian and free-energy re-ranking step to a conformer search,
  so that Boltzmann weights come from proper free energies rather than electronic energies
  alone.

---

### 22. New protonation protocols active by default

The redesigned protonation, deprotonation and tautomerization protocols, previously gated
behind an experimental flag, are now the default for `--protonate`, `--deprotonate` and
`--tautomerize`. The legacy code path is no longer used.
{: .text-justify }

---

### 23. Revised shipped examples

The examples in `examples/expl-<#>/` were reworked and extended:
{: .text-justify }

| # | Topic | Molecule |
|---|-------|---------|
| **0** | dry run, print settings without computing | 1-propanol |
| **1** | single-point energy | 1-propanol |
| **2** | geometry optimization | 1-propanol |
| **3** | optimization + Hessian (vibrational frequencies) | 1-propanol |
| **4** | standalone MD simulation | 1-propanol |
| **5** | default iMTD-GC conformer search | 1-propanol |
| **6** | two-level conformer search (GFN2//GFN-FF) | 1-propanol |
| **7** | iMTD-GC with ALPB implicit solvation (GFN2) | 1-propanol |
| **8** | quick iMTD-GC conformer search (with `-finalhess`) | 1-propanol |
| **9** | standalone CREGEN ensemble sorting | 1-propanol |
| **10** | constrained conformer search | 1-propanol |
| **11** | ensemble optimization (mdopt) | 1-propanol |
| **12** | NCI sampling mode (iMTD-NCI) | water trimer |
| **13** | protonation site sampling | uracil |
| **14** | metal/ion adducts (Cs<sup>+</sup>) | α-D-glucose |
| **15** | tautomer screening | guanine |
| **16** | fmlip-relay, optimization with an LJ potential | Ar<sub>4</sub> cluster |
| **17** | fmlip-relay, optimization with FairChem UMA | caffeine |
| **18** | fmlip-relay, optimization with MACE-OFF23 | caffeine |

{% include note.html content="Examples 16 to 18 require a local <code>fmlip-relay</code> installation, and additionally the <code>uma</code>/<code>fairchem</code> or <code>mace</code> extras." %}
