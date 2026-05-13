#!/usr/bin/env bash
set -euo pipefail

# Build and optionally push the n8n-manyreach Docker image.
#
# Usage:
#   ./build.sh                                              # build :latest locally
#   ./build.sh --push ghcr.io/manyreach/n8n                 # build + push :latest
#   ./build.sh --push ghcr.io/manyreach/n8n --tag v0.1.0    # build + push :v0.1.0
#   ./build.sh --push ghcr.io/manyreach/n8n --tag v0.1.0 --tag latest  # push both

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

LOCAL_IMAGE="n8n-manyreach"
REGISTRY=""
TAGS=()

while [[ $# -gt 0 ]]; do
    case $1 in
        --push) REGISTRY="$2"; shift 2 ;;
        --tag)  TAGS+=("$2"); shift 2 ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
done

if [[ ${#TAGS[@]} -eq 0 ]]; then
    TAGS=("latest")
fi

# Distribution label embedded in telemetry: distinguishes images pushed to a
# registry from images built only locally.
if [[ -n "$REGISTRY" ]]; then
    DIST="docker-registry"
else
    DIST="docker-repo"
fi

# Use git SHA as BUILD_ID when available (falls back inside the build script).
BUILD_ID=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

echo "Building ${LOCAL_IMAGE}: ${TAGS[*]}  (BUILD_ID=${BUILD_ID}, DIST=${DIST})"

docker build \
    --build-arg "MANYREACH_BUILD_ID=${BUILD_ID}" \
    --build-arg "MANYREACH_DISTRIBUTION=${DIST}" \
    -t "${LOCAL_IMAGE}:${TAGS[0]}" \
    .

for tag in "${TAGS[@]:1}"; do
    docker tag "${LOCAL_IMAGE}:${TAGS[0]}" "${LOCAL_IMAGE}:${tag}"
done

echo "Built ${LOCAL_IMAGE}: ${TAGS[*]}"

if [[ -n "$REGISTRY" ]]; then
    for tag in "${TAGS[@]}"; do
        docker tag "${LOCAL_IMAGE}:${TAGS[0]}" "${REGISTRY}:${tag}"
        docker push "${REGISTRY}:${tag}"
        echo "Pushed ${REGISTRY}:${tag}"
    done
fi
