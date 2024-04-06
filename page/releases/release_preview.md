# ---
# layout: default
# title: Release 3.0 Preview
# parent: Releases
# nav_order: 2
# toc: false
# summary: "Notes for the upcomming CREST version"
# permalink: /page/releases/release_preview.html
# ---
# 
# # CREST Release 3.0 Preview
# {: .no_toc }
# 
# <div class="label label-green">CREST 3.0 preview</div>
# 
# ---
# 
# 
# ## CREST 3.0 Preview
# 
# - New [**input file reader** {{site.data.icons.book}}](../documentation/inputfiles.html "Documentation / Input Files")
# - Energy- and gradient-based interface for calculations
# - Standalone ANCOPT implementation (RF optimizer with BFGS update step in approximate normal coordinates)
# - Standalone MD and metadynamics module
# - Standalone implementation of geometrical constraints
# - New minimum energy crossing point (MECP) algorithm (see [**Examples/MECP Calaculations**](../examples/mecp   "Examples / MECP Calculations"))
# - Integration of the [**tblite API** {{ site.data.icons.github }}](https://github.com/tblite/tblite "tblite on GitHub")
# - Integration of a [**GFN0-xTB API** {{ site.data.icons.github }}](https://github.com/pprcht/gfn0) (see [J. Phys. Chem. Lett. 2023, 14, 19, 4440–4448](https://doi.org/10.1021/acs.jpclett.3c00494))
# - Integration of the [**TOML-F**  {{ site.data.icons.github }}](https://github.com/toml-f/toml-f) parser
# 
# ---
# 
# To try out new implementations of CREST 3, build the development version [**from source**](../installation/install_compile.html). 
# Note, that development is done with intel (`ifort/icc`) compilers, so there might be some issues for GNU (`gfortran/gcc`) builds.
# The respective code can be found in the `3.0dev` branch of the repository:
# {% include image.html file="install-3dev.png" %}
