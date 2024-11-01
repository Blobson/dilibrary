<?php

header('Content-Type: text/yaml; charset=utf-8');

$CATALOG_FILE = 'data/catalog.yaml';

print(file_get_contents($CATALOG_FILE));
