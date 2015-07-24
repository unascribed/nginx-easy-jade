# nginx-easy-jade
Stuff for nginx to automatically pick up .jade files in a directory tree and use node-fastcgi to render them

Stuff an include directive in your server block and rejoice as your jade and styl files work automatically.

Intentionally does not cache files. Use a caching proxy like Varnish or CloudFlare, or just enable caching in nginx.

See it in action at [my site](https://unascribed.com/index.jade).
