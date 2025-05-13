let sceneManager: SceneManager;
let cameraManager: CamaraManager;
let rendererManager: RendererManager;
let ambientLightManager: AmbientLightManager;
let directionalLightManager: DirectionalLightManager;
let canvasManager: CanvasManager;

// Scene
const setSceneManager = (sceneManagerInstance: SceneManager) => {
    sceneManager = sceneManagerInstance;
}

const getSceneManager = () => {
    return sceneManager;
}

// Camera
const setCameraManager = (cameraManagerInstance: CamaraManager) => {
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
    getDirectionalLightManager
}