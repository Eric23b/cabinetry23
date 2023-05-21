
// @ts-ignore
const isTauri = !!window.__TAURI__;
let projectsDB;

export async function listProjects() {
    if (isTauri) {
        // @ts-ignore
        const {readDir, BaseDirectory} = window.__TAURI__.fs;
        const entries = await readDir('projects', { dir: BaseDirectory.AppData, recursive: false });
        const list = [];
        entries.forEach((entry) => {
            if (entry.name.endsWith('.json')) {
                list.push(entry.name.replace('.json', ''));
            }
        });
        return list;
    }
    else {
        return new Promise((resolve) => {
            listProjectsInIndexedDB(resolve)});
    }
}

async function listProjectsInIndexedDB(resolve) {
    const objectStore = projectsDB.transaction('projects').objectStore('projects');

    let projectArray = [];
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            projectArray.push({id: cursor.value.id, name: cursor.value.name});
            cursor.continue(); // Jumps back to objectStore.openCursor().onsuccess and increments key
        }
        else {
            resolve(projectArray);
        }
    }
}

export async function initProjectsDB() {
    if (isTauri) {
        // @ts-ignore
        const {createDir, BaseDirectory} = window.__TAURI__.fs;
        return createDir('projects', { dir: BaseDirectory.AppData, recursive: true });
    }
    else {
        return new Promise((resolve, reject) => {
            initProjectsDatabaseWithIndexedDB(resolve, reject)});
    }
}

function initProjectsDatabaseWithIndexedDB(resolve, reject) {
    const openerDB = window.indexedDB.open('projects', 1);

    openerDB.onsuccess = () => {
        projectsDB = openerDB.result;
        resolve("Successfully initialized projects database");
    }

    openerDB.onupgradeneeded = (event) => {
        // @ts-ignore
        let eventDB = event.target.result;
        let objectStore = eventDB.createObjectStore('projects', { keyPath: 'id'});

        objectStore.createIndex('id', 'id', { unique: true });
    }

    openerDB.onerror = () => {
        reject("Could not initialize projects database");
    }
}

export async function saveProject(project) {
    if (isTauri) {
        // @ts-ignore
        const { writeTextFile, BaseDirectory } = window.__TAURI__.fs;
        return writeTextFile(`projects/${project.id}.json`, JSON.stringify(project), { dir: BaseDirectory.AppConfig });
    }
    else {
        return new Promise((resolve, reject) => {
            saveProjectWithIndexedDB(project, resolve, reject)});
    }
}

function saveProjectWithIndexedDB(project, resolve, reject) {
    const transaction = projectsDB.transaction('projects', 'readwrite');
    const objectStore = transaction.objectStore('projects');

    const request = objectStore.get(project.id);

    request.onsuccess = () => {
        objectStore.put(project);
    }

    transaction.oncomplete = () => {
        resolve("Project saved.");
    }

    transaction.onerror = () => {
        reject('Project could not be saved.');
    }
}

export async function getProject(id) {
    if (isTauri) {
        // @ts-ignore
        const { readTextFile, BaseDirectory } = window.__TAURI__.fs;
        try {
            return JSON.parse(await readTextFile(`projects/${id}.json`, { dir: BaseDirectory.AppConfig })); 
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    else {
        return new Promise((resolve) => {
            getProjectWithIndexedDB(id, resolve)});
    }
}

function getProjectWithIndexedDB(id, resolve) {
    const transaction = projectsDB.transaction(['projects'], 'readwrite');
    const objectStore = transaction.objectStore('projects');
    const project = objectStore.get(id);

    transaction.oncomplete = () => {
        resolve(project.result);
    }
}