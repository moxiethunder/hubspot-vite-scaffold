import { spawn } from 'child_process'
import { config } from 'dotenv'
import path from 'path'

config()
const hsSrcDir = process.env.VITE_HS_SRC_DIR
const hsDestDir = process.env.VITE_HS_DEST_DIR

function runWatch(command, args, dir) {
  if ( dir ) {
    process.chdir(path.join(__dirname, '..', dir))
  }

  const spawnedProcess = spawn(command, args, { stdio: 'inherit', shell: true });

  spawnedProcess.on('close', (code) => {
      console.log(`Process ${command} exited with code ${code}`);
  });

  return spawnedProcess;
}

runWatch('vite', ['build', '--watch'], hsSrcDir);
runWatch('hs', ['watch', hsSrcDir, hsDestDir]);