FROM keymetrics/pm2:18-alpine

# 在容器内创建目录
RUN mkdir /app

# 切换工作目录
WORKDIR /app

# 复制打包产物至容器目录内
COPY .output ./.output
COPY package.json pnpm-lock.yaml .npmrc ecosystem.config.js ./

# 对外暴露容器运行端口
EXPOSE 3000

# 容器启动命令
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]