#!/bin/bash
set -e
test -n "$GITHUB_SHA"
test -n "$DOCTL_API_KEY"

doctl auth init -t $DOCTL_API_KEY

doctl \
    kubernetes cluster \
    config save rcluster
echo "Deploying dwarburton/homepage:$GITHUB_SHA"
envsubst < ./deploy.yaml | kubectl apply -f -
