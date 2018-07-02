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
      log_file: 'combined.outerr.log',
      out_file: 'out.log',
      error_file: 'err.log',
    },
  ],
};
