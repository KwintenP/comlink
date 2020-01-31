importScripts("/base/dist/umd/comlink.js");

let otherWorkerProxy;
let onDataFromWorker;

const workerAPI = {
    foo: (workerId, message) => {
        onDataFromWorker(workerId, message);
    }
};

// API exposed to main thread
const mainThreadAPI = {
    connectToWorker: (port, expose, id) => {
        Comlink.expose(workerAPI, port);

        otherWorkerProxy = Comlink.wrap(port);
        otherWorkerProxy.foo(id, 'Hi');
    },
    onDataFromWorker : (cb) => {
        onDataFromWorker = cb;
    }
};

Comlink.expose(mainThreadAPI);
