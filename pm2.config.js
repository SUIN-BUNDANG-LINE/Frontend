module.exports = {
    apps: [
    {
        name: "sulmun2yong-production-client",
        script: "./node_modules/next/dist/bin/next",
        args: "start",
        instances: "max",
        exec_mode: "cluster"
    },
    ],
};