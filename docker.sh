NPM_PACKAGE_VERSION=$(node -p "require('./package.json').version")

echo 构建docker镜像
datetime=$(date +"%m%d-%H%M")
echo "构建时间：$datetime"

docker build -t hub.fuxi.netease.com/fuxi-web/openday:v${NPM_PACKAGE_VERSION}-$1-$datetime . --build-arg env=production
echo docker镜像构建完成

echo 推送docker镜像
docker push hub.fuxi.netease.com/fuxi-web/openday:v${NPM_PACKAGE_VERSION}-$1-$datetime


