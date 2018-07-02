module.exports = {
  apps: [
    {
      name: 'kaifazhe',
      script: './build/server.js',
      cwd: './', // 当前工作路径
      watch: [
        // 监控变化的目录，一旦变化，自动重启
        'src',
        'build',
      ],
      ignore_watch: [
        // 从监控目录中排除
        'node_modules',
        'logs',
        'public',
      ],
      // watch: true,
      node_args: '--harmony',
      env: {
        PORT: 5000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 5000,
        NODE_ENV: 'production',
      },
      // log_file: './logs/combined.outerr.log',
      out_file: './logs/out.log', // 普通日志路径
      error_file: './logs/err.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
