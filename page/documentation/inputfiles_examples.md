---
layout: default
title: Example Input Files
parent: Input File Documentation
grand_parent: Documentation
nav_order: 1
summary: "Examples for CREST input files in the TOML format."
permalink: /page/documentation/inputfiles_examples.html
---

# {{page.title}}
{: .no_toc }

This page contains a collection of TOML input files for CREST 3.0.
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.0</div>


## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


---

## Singlepoint energy evaluation
A minimal example to perform a singlepoint evaluation for the structure given in `struc.xyz` at the GFN2-xTB level via `tblite`. No charge or uhf parameters are assumed.
```bash
#This is a CREST input file
input='struc.xyz'
runtype='sp'

#calculation level
[[calculation.level]]
method="gfn2"
```
---
## Geometry optimization (basic)
A minimal example to perform a geometry optimization for the structure given in `struc.xyz` via the  GFN-FF calculator and tight optimization thresholds. A charge of +1 and implicit solvation of ALPB(acetonitrile) is assumed.
```bash
#This is a CREST input file
input='struc.xyz'
runtype='ancopt'
optlev='tight'

#calculation level
[[calculation.level]]
method="gfnff"
chrg=1
alpb='acetonitrile'
```
---
## Geometry optimization (custom)
An extended example for customizing the geometry optimization. For example, setting energy and gradient convergence thresholds explicitly, or the max number of cycles.
```bash
#This is a CREST input file
input='struc.xyz'
runtype='ancopt'

#calculation settings
[calculation]
opt_engine='ancopt'
hess_update='bfgs'
converge_e=1.0e-5
converge_g=1.0e-5
maxcycle=200

#calculation level
[[calculation.level]]
method="gfnff"
```
---
## Molecular dynamics (basic)
An example to perform a molecular dynamics simulation for the structure given in `struc.xyz` via the  GFN-FF calculator. A runtime of 100 ps with a time step of 1.5 fs is selected. Energies are documented in `energies.log`
```bash
#This is a CREST input file
input='struc.xyz'
runtype='dynamics'

#calculation data
[calculation]
elog="energies.log"

[[calculation.level]]
method="gfnff"

#molecular dynamics data
[dynamics]
length_ps=100.0 
tstep=1.5
```
---
## Molecular dynamics (extended/metadynamics)
An example to perform a RMSD-based metadynamics simulation for the structure given in `struc.xyz` via the GFN-FF calculator. A runtime of 100 ps with a time step of 1.5 fs is selected. Energies are documented in `energies.log`
```bash
#This is a CREST input file
input='struc.xyz'
runtype='dynamics'

#calculation data
[calculation]
elog="energies.log"

[[calculation.level]]
method="gfnff"

#molecular dynamics data
[dynamics]
length_ps=100.0
tstep=1.5
shake=1 # SHAKE algorithm on H atoms
dump=100.0
hmass=2.008 # increased H atom mass
temp=100 # temperature in K

[[dynamics.meta]]
kpush=0.1
alpha=1.0
type='rmsd'
dump_ps=10.0
```
---
## Constrained geometry optimization
An example for performing a geometry optimization while introducing geometrical constraints. For simplicity and compatibility reasons, constraints can be given in a separate file (here `xtbinput`) in the `xtb` input format.
```bash
#This is a CREST input file
input='struc.xyz'
runtype='ancopt'
optlev='tight'
constraints='xtbinput'

#calculation level
[[calculation.level]]
method="gfnff"
```
with `xtbinput` looking something like
```
$constrain
 force constant=0.5
 bond: 1,2,auto
$end
```
**Alternatively**, Single constraints can also be defined directly within the TOML file. However, for a large number of constraints this will be tedious.
```bash    
#This is a CREST input file
input='struc.xyz'
runtype='ancopt'
optlev='tight'

#calculation level
[[calculation.level]]
method="gfnff"

#constaints
[[calculation.constraint]]
type='bond'
atoms=[1,2]
fc=0.5
```
---
## Ensemble optimization 
A minimal example to perform a geometry optimization for multiple structures in the file `ensemble.xyz`, e.g. a MD trajectory.
```bash
#This is a CREST input file
input='struc.xyz'
ensemble_input='ensemble.xyz'
runtype='ancopt_ensemble'
optlev='tight'

threads=10

#calculation level
[[calculation.level]]
method="gfnff"
```
---
## Conformational sampling (basic)
Standard input for conformational sampling.
```bash
#This is a CREST input file
input='struc.xyz'
runtype='imtd-gc'

#parallelization
threads=8

[[calculation.level]]
method="gfnff"
```
---
## Conformational sampling (custom)
A customized input for conformational sampling. All metadynamics calculations will be run at GFN-FF level, but optimizations are run at GFN2-xTB level. Furthermore, multilevel optimization is turned off (expensive).
```bash
#This is a CREST input file
input='struc.xyz'
runtype='imtd-gc'
multilevelopt=false

#parallelization
threads=8

#calculation data
[calculation]
[[calculation.level]]
method="gfnff"
weight=1.0

[[calculation.level]]
method='gfn2'

#molecular dynamics data (activate only GFN-FF)
[dynamics]
active=[1]
```
---
## Multicenter ONIOM3 setup
A commeted example for setting up a MC-ONIOM3 calculation.
```bash
#This is a CREST input file
input='struc.xyz'  # coordinates will be read from this file
runtype='ancopt'  # Geometry optimization runtype

#parallelization
threads=9

#calculation data. The calculation object can contain several [[calculation.level]]s
[calculation]
type=0  # specify energy & gradient from [[calculation.level]] to be used
        # if type=0, or it is absent, all energies and gradients will simply be added together.

#calculation levels
[[calculation.level]]   # a GFN-FF as outer layer
method="gfnff"
chrg=0

#calculation levels
[[calculation.level]]   # a GFN0-xTB calculation as basis
method="gfn0"
uhf=0
chrg=0

[[calculation.level]]   # GFN2-xTB for smallest fragments
method="gfn2"
uhf=0
chrg=0

# All data for lwONIOM must be contained in a corresponding [lwoniom]-block
[lwoniom]
# The systems total number of atoms must be specified
natoms = 58
# Then, the XYZ file name can be given.
xyz = 'struc.xyz'
# Optionally, some topology or bond order can be defined.
# If this is left out, the connectivity is determined from vdW radii
topo = 'example.wbo'
 
# Next, fragments must be defined on an by-atom basis
# An ascending fragment numbering is assumed, i.e., fragment.1 will be the parent system
fragment.1 = 'all'   # fragment 1 contains all atoms
fragment.2 = [1,2]   # fragment 2 contains atoms 1 (Cl) and 2 (Al)
fragment.3 = "29-34" 
fragment.4 = "3-8"
fragment.5 = "22-27"
fragment.6 = "11,13-16,19"

# Finally, layers are defined on an by-fragment basis
# As with the fragments, layers are given in ascending order
# One layer can contain multiple (non-overlapping) fragments in MC-ONIOM, which is not the case here
layer.1 = [1]  # layer 1 contains only fragment 1
layer.2 = [2]
layer.3 = [3,4,5,6]

# Lastly, the layers must be attached to the respective [[calculation.level]]
layerlevel.1 = 1
layerlevel.2 = 2
layerlevel.3 = 3
```

