let sceneManager: SceneManager;
let cameraManager: CameraManager;
let rendererManager: RendererManager;
let ambientLightManager: AmbientLightManager;
let directionalLightManager: DirectionalLightManager;
let updatesManager: UpdatesManager;

// Scene
const setSceneManager = (sceneManagerInstance: SceneManager) => {
    sceneManager = sceneManagerInstance;
}

const getSceneManager = () => {
    return sceneManager;
}

// Camera
const setCameraManager = (cameraManagerInstance: CameraManager) => {
    cameraManager = cameraManagerInstance;
}

const getCameraManager = () => {
    return cameraManager;
}

// Renderer
const setRendererManager = (rendererManagerInstance: RendererManager) => {
    rendererManager = rendererManagerInstance;
}

const getRendererManager = () => {
    return rendererManager;
}

// Ambient Light

const setAmbientLightManager = (ambientLightManagerInstance: AmbientLightManager) => {
    ambientLightManager = ambientLightManagerInstance;
}

const getAmbientLightManager = () => {
    return ambientLightManager;
}

// Directional Light
const setDirectionalLightManager = (directionalLightManagerInstance: DirectionalLightManager) => {
    directionalLightManager = directionalLightManagerInstance;
}

const getDirectionalLightManager = () => {
    return directionalLightManager;
}

// Updates Manager
const setUpdatesManager = (updatesManagerInstance: UpdatesManager) => {
    updatesManager = updatesManagerInstance;
}

const getUpdatesManager = () => {
    return updatesManager;
}


// Exports
export {
    setSceneManager,
    getSceneManager,
    setCameraManager,
    getCameraManager,
    setRendererManager,
    getRendererManager,
    setAmbientLightManager,
    getAmbientLightManager,
    setDirectionalLightManager,
    getDirectionalLightManager,
    setUpdatesManager,
    getUpdatesManager
}