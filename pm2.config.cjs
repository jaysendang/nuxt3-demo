module.exports = {
  apps: [{
    name: 'nuxt3-demo',
    script: './.output/server/index.mjs',
    port: '3000',
    exec_mode: 'cluster_mode',
    min_uptime: '60s',
    instances: 4,
    autorestart: true,
    max_restarts: 30,
    error_file: '/app/logs/nuxt3-demo/app-err.log',
    out_file: '/app/logs/nuxt3-demo/app-out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }],
}
