// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen Three.js Animation
    const loadingScene = new THREE.Scene();
    const loadingCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const loadingRenderer = new THREE.WebGLRenderer({ alpha: true });
    const loadingContainer = document.querySelector('.loading-container');

    loadingRenderer.setSize(200, 200);
    loadingContainer.insertBefore(loadingRenderer.domElement, loadingContainer.firstChild);

    // Create a torus knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0xf17676,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    loadingScene.add(torusKnot);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    loadingScene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    loadingScene.add(pointLight);

    loadingCamera.position.z = 5;

    // Progress tracking
    let progress = 0;
    const progressText = document.querySelector('.loading-progress');
    const loadingScreen = document.querySelector('.loading-screen');
    let isComplete = false;

    // Animation function
    function animate() {
        if (!isComplete) {
            requestAnimationFrame(animate);
        }

        // Rotate the torus knot
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;

        // Update progress
        if (progress < 100) {
            progress += 1;
            if (progress > 100) progress = 100;
            progressText.textContent = Math.round(progress) + '%';
        }

        // Check if loading is complete
        if (progress >= 100 && !isComplete) {
            isComplete = true;
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }

        loadingRenderer.render(loadingScene, loadingCamera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        loadingCamera.aspect = window.innerWidth / window.innerHeight;
        loadingCamera.updateProjectionMatrix();
        loadingRenderer.setSize(200, 200);
    });

    // Start animation
    animate();
}); 