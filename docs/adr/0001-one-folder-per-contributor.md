# 1. One folder per contributor

Accepted, 2026-11-03.

In the context of about 30 people adding to one repository through pull requests at the same
time, facing merge conflicts between their changes, we decided for one folder per contributor
(`areas/<github-username>/`), found by the server at run time, and neglected a shared list of
areas that each contributor edits, to achieve pull requests that merge without conflicts and
can be reviewed by looking at one folder, accepting that areas cannot share code with each
other except by copying it.
