# Lappeland Label Configurator (React)

Ferdig frontend for navnelapper til WooCommerce/WordPress.

## Kjøre lokalt
```bash
npm i
npm run dev
npm run build
```

## Bygge for WordPress
`dist/lappeland-configurator.umd.js` produseres. Last opp i tema eller plugin og enqueue scriptet.

### Mount i tema
```php
<div id=\"lappeland-label-app\"
     data-product-id=\"123\"
     data-currency=\"NOK\"
     data-max-chars=\"17\"
     data-pack-sizes='[{"qty":130,"price":179},{"qty":195,"price":199},{"qty":330,"price":249}]'
     data-backgrounds-endpoint=\"/wp-json/lappeland/v1/backgrounds\"
     data-icons-endpoint=\"/wp-json/lappeland/v1/icons\"
     data-add-to-cart-endpoint=\"/wp-json/lappeland/v1/add-to-cart\"></div>
<script>window._llNonce = "<?php echo wp_create_nonce('wp_rest'); ?>";</script>
```

### Backend (anbefalt)
Lag REST-endepunkt `lappeland/v1/add-to-cart` som legger produktet i handlekurv med design-data i line item meta.
