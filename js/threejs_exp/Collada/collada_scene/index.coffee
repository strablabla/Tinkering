width = 960
height = 500
aspect = width/height
D = 8

scene = new THREE.Scene()
camera = new THREE.OrthographicCamera(-D*aspect, D*aspect, D, -D, 1, 1000)

renderer = new THREE.WebGLRenderer
  alpha: true

renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

# create two cubes
material = new THREE.MeshPhongMaterial
#   ambient: 0x555555
#   color: 0x555555
#   specular: 0xffffff
#   shininess: 50
#   shading: THREE.SmoothShading
#   side: THREE.DoubleSde
  wireframe: true

# geometry = new THREE.BoxGeometry(1,1,1)
# cube = new THREE.Mesh(geometry, material)
# scene.add(cube)

# lil_geometry = new THREE.BoxGeometry(0.2,0.2,0.2)
# lil_cube = new THREE.Mesh(lil_geometry, material)
# lil_cube.position.x = 1
# scene.add(lil_cube)

# create the light
light = new THREE.DirectionalLight(0xffffff, 1.1)
light.position.set(10, 20, 15)
scene.add(light)

# set the camera
camera.position.set(20, 20, 20)
camera.lookAt(new THREE.Vector3( 0, 0, 0 ))
camera.rotation.z = 5/6*Math.PI


# load DAE
loader = new THREE.ColladaLoader()
# loader.options.convertUpAxis = true
loader.load 'scene.dae', (collada) ->  
  collada.scene.scale.set(0.1,0.1,0.1)
  scene.add collada.scene
  renderer.render(scene, camera)
