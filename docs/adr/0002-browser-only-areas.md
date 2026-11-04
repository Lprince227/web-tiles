# 2. Areas are plain browser pages

Accepted, 2026-11-03.

In the context of running code from many contributors on one machine, facing installation
problems on mixed operating systems and code that has not been read before it runs, we decided
for areas made of plain HTML, CSS, and JavaScript that run in the browser, served by a Python
standard-library server, and neglected server-side code per contributor and front-end
frameworks with a build step, to achieve a gallery that runs with only Python and a browser and
in which an area cannot install anything or touch files outside the browser, accepting that
areas have no server-side storage and are limited to what a browser page can do.
