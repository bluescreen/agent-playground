#!/bin/bash
# RESTRICTED: Deployment script — contains production endpoints and deployment secrets.
set -euo pipefail

CLUSTER="shopdemo-production"
SERVICE="shopdemo-api"
REGISTRY="123456789012.dkr.ecr.eu-central-1.amazonaws.com"
IMAGE="${REGISTRY}/shopdemo-api:${GIT_SHA:-latest}"

echo "Deploying ${IMAGE} to ${CLUSTER}/${SERVICE}..."

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin "${REGISTRY}"
docker build -t "${IMAGE}" .
docker push "${IMAGE}"

aws ecs update-service \
  --cluster "${CLUSTER}" \
  --service "${SERVICE}" \
  --force-new-deployment \
  --region eu-central-1

echo "Deployment initiated. Waiting for stability..."
aws ecs wait services-stable \
  --cluster "${CLUSTER}" \
  --services "${SERVICE}" \
  --region eu-central-1

echo "Deployment complete."
