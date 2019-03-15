This gives an example of building a shared css file for the bolt design
system, while also exporting the mixins, functions for use in other
sass compilations.


The generated files are:

 - bolt-shared.css - can be shared by multiple sites using the design system.
 - sitea.css - can be included on one site
 - siteb.css - can be included on another site

To build the example:

```
make
```

To clean the generated files:

```
make clean
```
