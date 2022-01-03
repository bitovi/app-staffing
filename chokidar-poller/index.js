const path = require("path")
const fs = require("fs")
const chokidar = require("chokidar")
const exec = require('child_process').exec;

const watcher = chokidar.watch(".", {
  cwd: "/usr/src/app",

  usePolling: true,
  interval: 100,
  binaryInterval: 300,
  awaitWriteFinish: true,
  ignored: ["node_modules/*", ".git", ".git/*"],
  ignoreInitial: true
})

// watcher.on("add", notify).on("change", notify)
console.log("starting watcher")
watcher.on("all", notify)

function notify(event, file) {
  const filename = path.join(watcher.options.cwd, file)
  console.log(`Handling event (${event}) for file (${filename}).`)

    if(event === "delete" || event === "unlink"){
        console.log("TODO: removing file from main container...")
    }else{
        console.log("copying file to main container...")
        let kubepath = "/usr/src/kube"
        if(process.env.KUBE_PATH){
            kubepath = process.env.KUBE_PATH
        }
        const kubectlCpFile = "/usr/src/app/chokidar-poller/kubectl-cp.sh"
        const command = `bash ${kubectlCpFile}`
        const myShellScript = exec(command, {
            env: {
                KUBECONFIG: `${kubepath}/kubeconfig`,
                CURRENT_POD: `${process.env.HOSTNAME}`,
                FILEPATH: `${filename}`,
                CONTAINER: `app-staffing`
            }
        }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }
    console.log("")   
}