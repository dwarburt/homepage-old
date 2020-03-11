#!/bin/bash
set -e
test -n "$GITHUB_SHA"
test -n "$DOCTL_API_KEY"

doctl \
    -t $DOCTL_API_KEY \
    kubernetes cluster \
    config save rcluster
echo "Deploying dwarburton/homepage:$GITHUB_SHA"
envsubst ./deploy.yaml | kubectl apply -f -
