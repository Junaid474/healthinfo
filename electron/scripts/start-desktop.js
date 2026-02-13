const { exec } = require('child_process');

console.log('Starting Desktop App...');

// Start Next.js server
const server = exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`server error: ${error}`);
    return;
  }
  console.log(`server stdout: ${stdout}`);
  console.error(`server stderr: ${stderr}`);
});

// Start Electron (wait a bit for server)
setTimeout(() => {
  const electron = exec('npm run electron', (error, stdout, stderr) => {
    if (error) {
      console.error(`electron error: ${error}`);
      return;
    }
    console.log(`electron stdout: ${stdout}`);
  });

  electron.on('exit', () => {
    server.kill();
    process.exit();
  });
}, 3000);
