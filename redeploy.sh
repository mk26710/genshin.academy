#!/bin/bash

docker pull ghcr.io/tenkospirit/genshin.zenless.club:main
docker stop genshin-zenless
docker system prune -f
docker run -d --name genshin-zenless -p 3000:3000 ghcr.io/tenkospirit/genshin.zenless.club:main
