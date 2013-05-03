curl "http://www.initializr.com/builder?boot-hero&modernizr&jquerydev&h5bp-iecond&h5bp-favicon&izr-emptyscript&boot-css&boot-scripts" > bbp.zip
unzip bbp.zip
rm bbp.zip
mkdir templates
mv initializr/index.html templates
mv initializr static

