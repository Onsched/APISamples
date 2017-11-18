swagger-codegen generate -i http://devdocs.magento.com/swagger/schemas/latest-2.1.schema.json -l php
mv SwaggerClient.php /vendor
cd vendor/SwaggerClient-php
composer install --prefer-dist

edit composer.json
    "autoload": {
        "classmap": [
            "vendor/SwaggerClient-php"
        ],
    }
