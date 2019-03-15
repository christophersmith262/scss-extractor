all: node_modules bolt-shared.css sitea.css siteb.css

_bolt-library.scss: node_modules
	./node_modules/.bin/scss-extractor bolt-shared.scss --importfilter=^node_modules/@bolt > _bolt-library.scss

bolt-shared.css: node_modules
	./node_modules/.bin/npm-sass bolt-shared.scss > bolt-shared.css

sitea.css: node_modules _bolt-library.scss
	./node_modules/.bin/npm-sass sitea.scss > sitea.css

siteb.css: node_modules _bolt-library.scss
	./node_modules/.bin/npm-sass siteb.scss > siteb.css

node_modules:
	yarn

clean:
	rm -f bolt-shared.css sitea.css siteb.css _bolt-library.scss
