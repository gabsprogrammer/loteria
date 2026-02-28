module.exports = {
  apps: [{
    name: 'index',
    script: './index.js',
    max_memory_restart: '150M',
    exp_backoff_restart_delay:'3',
    restart_delay: '1' 
}]
}