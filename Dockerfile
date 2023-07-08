# 基础镜像构建
FROM keymetrics/pm2:18-alpine AS base
# 全局安装 PNPM
RUN npm install -g pnpm

# 打包阶段
FROM base AS build
# 声明构建参数 (docker build)
# 设置构建的镜像类型
# 'dev'-开发环境
# 'test'-测试环境
# 'prod'-生产环境
ARG BUILD_ENV=dev
# 切换工作目录
WORKDIR /app
# 复制所有文件至容器内
COPY . .
# 安装依赖
RUN pnpm install
# 打包
RUN pnpm build:${BUILD_ENV}

# 部署阶段构建
FROM base AS deploy
# 切换工作目录
WORKDIR /app
# 复制打包产物
COPY --from=build /app/.output ./.output
COPY --from=build /app/.npmrc /app/package.json /app/pnpm-lock.yaml /app/ecosystem.config.js ./

# 对外暴露容器运行端口
EXPOSE 3000

# 容器启动命令
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]