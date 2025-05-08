import * as THREE from 'three'

export function initDiceBoard() {

    console.log("initDiceBoard")

    const canvas = document.getElementById('game-screen') as HTMLCanvasElement
    if (!canvas) {
        console.error('Canvas not found')
        return
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({canvas})

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    camera.position.z = 5

    // Cube
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshStandardMaterial({color: 0x00ff00})
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    // Animation loop
    function animate() {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
    }

    animate()
}
