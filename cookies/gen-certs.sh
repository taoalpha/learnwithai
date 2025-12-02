#!/bin/bash

# Create certs directory if it doesn't exist
mkdir -p certs

# Generate self-signed certificate
openssl req -nodes -new -x509 -keyout certs/server.key -out certs/server.cert -days 365 -subj "/CN=*.tao.corp"

echo "Certificates generated in certs/"
echo "NOTE: You may need to manually trust 'certs/server.cert' in your system keychain or browser."
