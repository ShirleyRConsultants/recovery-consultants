#!/bin/bash

# Create public directory if it doesn't exist
mkdir -p public

# Download the white logo
curl -o public/RC-Logo-White.svg https://recovery-consultants.com/wp-content/uploads/2024/04/RC-Logo-White.svg

# Download the black logo (assuming it exists at a similar URL)
curl -o public/RC-Logo-Black.svg https://recovery-consultants.com/wp-content/uploads/2024/04/RC-Logo-Black.svg 