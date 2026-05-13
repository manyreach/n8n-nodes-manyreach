FROM n8nio/n8n:latest

ARG MANYREACH_BUILD_ID=unknown
ARG MANYREACH_DISTRIBUTION=docker-repo

USER root
COPY . /opt/n8n-custom-nodes/node_modules/@manyreach/n8n-nodes-manyreach
RUN cd /opt/n8n-custom-nodes/node_modules/@manyreach/n8n-nodes-manyreach && \
    export MANYREACH_BUILD_ID=${MANYREACH_BUILD_ID} && \
    export MANYREACH_DISTRIBUTION=${MANYREACH_DISTRIBUTION} && \
    npm install --include=dev --legacy-peer-deps && \
    npm run build && \
    npm prune --omit=dev --legacy-peer-deps && \
    chown -R node:node /opt/n8n-custom-nodes
ENV N8N_CUSTOM_EXTENSIONS=/opt/n8n-custom-nodes
USER node
