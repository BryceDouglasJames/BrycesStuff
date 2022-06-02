import react from 'react';
import * as THREE from 'three';
// @ts-ignore
import { ObjectControls } from 'threejs-object-controls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Camera, LoopPingPong, MeshBasicMaterial, TextureLoader, Vector3 } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import Stats from 'three/examples/jsm/libs/stats.module'
//import meobject from './meobject.obj'

//FOR ANIMATIONS
let mixer: THREE.AnimationMixer
let modelReady = false
const animationActions: THREE.AnimationAction[] = []
let activeAction: THREE.AnimationAction
let lastAction: THREE.AnimationAction

var Y_AXIS = new THREE.Vector3(0, 1, 0)
const clock = new THREE.Clock()
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
//camera.setFocalLength(2)
camera.position.z = 3
let renderer = new THREE.WebGLRenderer({ alpha: true });
let mouseX = 0, mouseY = 0;
//let windowHalfX = window.innerWidth / 2;
//let windowHalfY = window.innerHeight / 2;
var controls: ObjectControls;
let object_map = new Map();

const orb = new OrbitControls(camera, renderer.domElement)


/*function renderObj_With_Texture(loader: OBJLoader, scene: THREE.Scene, matloader: MTLLoader) {
    matloader
        .load("me_material.mtl",
            (material) => {
                material.preload()
                loader
                    .setMaterials(material)
                    .load(
                        'meobject.obj',
                        (object) => {
                            object.scale.set(3, 3, 3);
                            var axis = new THREE.Vector3(4, 0, 7).normalize();
                            var speed = 0.01;
                            object.rotateOnAxis(axis, speed);
                            //return object;
                            scene.add(object);

                            controls = new ObjectControls(camera, renderer.domElement, object);
                            controls.setDistance(8, 200); // set min - max distance for zoom
                            controls.setZoomSpeed(0.7); // set zoom speed
                            //controls.enableVerticalRotation();
                            controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
                            controls.setRotationSpeed(0.05);
                        }, undefined, (err) => {
                            console.log(err)
                        }
                    )
            })
    /*var axis = new THREE.Vector3(4, 0, 7).normalize();
    var speed = 0.01;
    controls.setDistance(8, 200); // set min - max distance for zoom
    controls.setZoomSpeed(0.5); // set zoom speed
    controls.enableVerticalRotation();
    controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
    controls.setRotationSpeed(0.05);
    /* loader.load(
         './meobject.obj',
         function (object) {
             //object_map.set('me', object.id);
             object.scale.set(20, 20, 20)
 
             //const t_loader = new TextureLoader().load('me_texture.jpg')
             //t_loader.wrapS = THREE.RepeatWrapping;
             //t_loader.wrapT = THREE.RepeatWrapping;
 
             //return object;
             /*var axis = new THREE.Vector3(4, 0, 7).normalize();
             var speed = 0.01;
             object.rotateOnAxis(axis, speed);
             scene.add(object);
             /*controls = new ObjectControls(camera, renderer.domElement, object);
             controls.setDistance(8, 200); // set min - max distance for zoom
             controls.setZoomSpeed(0.5); // set zoom speed
             controls.enableVerticalRotation();
             controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
             controls.setRotationSpeed(0.05);
 
         },
         function (xhr) {
             console.log((xhr.loaded / xhr.total * 100) + '% loaded');
         },
         function (error) {
             console.log('An error happened: ' + error);
         }
     )


}

function renderObj(loader: OBJLoader, scene: THREE.Scene) {
    loader.load(
        'bunny.obj',
        function (object) {
            //object_map.set('bunny', object.id);
            object.scale.set(20, 20, 20);
            var axis = new THREE.Vector3(4, 0, 7).normalize();
            var speed = 0.01;
            object.rotateOnAxis(axis, speed);
            //return object;
            scene.add(object);
            controls = new ObjectControls(camera, renderer.domElement, object);
            controls.setDistance(8, 200); // set min - max distance for zoom
            controls.setZoomSpeed(0.5); // set zoom speed
            controls.enableVerticalRotation();
            controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
            controls.setRotationSpeed(0.05);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened' + error);
        }
    );
}*/

//FIX THIS WITH A VALID FBX FILE. BUILT IN PARSER IS VERY PICKY
function render_fbx(loader: FBXLoader, scene: THREE.Scene, name: String) {
    loader.load("big_walk.fbx", function (object) {
        object.scale.set(0.3, 0.3, 0.3);
        //object.mixer = new THREE.AnimationMixer( object );
        mixer = new THREE.AnimationMixer(object)
        const tLoader = new THREE.TextureLoader();
        tLoader.load("man_color.jpg", function (texture) {
            object.traverse(function (child) {
                let node = child as THREE.Mesh;
                if (node.isMesh) {
                    let mat = node.material as THREE.MeshStandardMaterial
                    mat.map = texture
                }
                child = node
            });
        }, undefined, function (err) {
            console.log(err);
        });
        object_map.set(name, object);
        //camera.position.y = 50 - Math.sin(45)
        //camera.zoom = -5
        object.visible = true
        const animationAction = mixer.clipAction(
            (object as THREE.Object3D).animations[0]
        )
        console.log(animationAction)

        //animationActions.push(animationAction)
        //animationsFolder.add(animations, 'default')
        //activeAction = animationActions[0]
        //animationAction.reset()
        //animationAction.fadeIn(1)
        orb.update()
        object.position.set(0, 0, 0)
        var camera_pivot = new THREE.Object3D()
        camera.lookAt(object.position)
        camera_pivot.add(object)
        animationAction.loop = THREE.LoopPingPong
        animationAction
            .startAt(2)
            .play();
        scene.add(object);

        //controls = new Orbi
        //controls = new ObjectControls(camera, renderer.domElement, object);
        //controls.setDistance(8, 200); // set min - max distance for zoom
        //controls.setZoomSpeed(1); // set zoom speed

        //controls.enableVerticalRotation();
        //ontrols.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
        //controls.setRotationSpeed(0.05);

        //var camera_pivot = new THREE.Object3D()
        //var Y_AXIS = new THREE.Vector3(0, 1, 0)
        //camera_pivot.rotateOnAxis(Y_AXIS, 0.01)
        //scene.add(camera_pivot)
        modelReady = true
    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (error) {
        console.log('An error happened: ' + error as String);
    })
}



export class SimpleRender extends react.Component<any, any>{
    tempObj!: THREE.Group;
    constructor(props: any) {
        super(props);
        this.tempObj = new THREE.Group();
        /*window.addEventListener('mousemove', event => {
 
            if (mouseX < -25) {
                mouseX = -25;
            } else if (mouseY > 30) {
                mouseX = 30;
            } else {
                mouseX = (event.clientX - windowHalfX) / 2;
            }
 
            if (mouseY < -20) {
                mouseY = -20;
            } else if (mouseY > 2) {
                mouseY = 2;
            } else {
                mouseY = (event.clientY - windowHalfY) / 2;
            }*/
        console.log(mouseX);
        console.log(mouseY);
        //});
    }

    componentDidMount() {
        //INIT DELEGATES

        //ATTATCH RENDERER TO WINDOW
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        const manager = new THREE.LoadingManager()

        manager.onStart = function () {
            console.log("Starting to load file...")
        }

        manager.onLoad = function () {
            console.log("Loading completed!")
        }

        manager.onError = function () {
            console.log("There was an error loading this object.")
        }


        //CREATE OBJECT(s) TO BE RENDERED
        const ObjLoad = new OBJLoader(manager);
        const aniloader = new FBXLoader();
        const textloader = new TextureLoader();
        const matloader = new MTLLoader();

        // SKYBOX/FOG
        //var materialArray: THREE.MeshBasicMaterial[] = [];
        //materialArray.push(new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./skybox/cave3_bk.png') }));
        //materialArray.push(new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./skybox/cave3_dn.png') }));
        //materialArray.push(new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./skybox/cave3_ft.png') }));
        //materialArray.push(new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./skybox/cave3_lf.png') }));
        //materialArray.push(new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./skybox/cave3_rt.png') }));
        //materialArray.push(new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./skybox/cave3_up.png') }));
        //for (var i = 0; i < 6; i++)
        //    materialArray[i].side = THREE.BackSide;
        //var skyboxMaterial = new THREE.Mesh(materialArray)
        //var skyboxGeom = new THREE.BoxGeometry(10000, 10000, 10000);
        //var skybox = new THREE.Mesh(skyboxGeom, materialArray);
        //scene.add(skybox);
        //console.log(skybox)

        var skybox = new THREE.CubeTextureLoader().load(["./skybox/cave3_lf.png", "./skybox/cave3_lf.png", "./skybox/cave3_lf.png", "./skybox/cave3_lf.png", "./skybox/cave3_lf.png", "./skybox/cave3_lf.png"])
        scene.background = skybox

        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        //mesh.receiveShadow = true;
        scene.add(mesh);

        camera.position.set(0, 0, 300)
        //camera.position.z = 20;
        //camera.position.y = 15 * Math.sin(-30)
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        scene.add(camera);
        scene.add(new THREE.AxesHelper(10));
        render_fbx(aniloader, scene, "homie")
        //renderObj(ObjLoad, scene);
        //renderObj_With_Texture(ObjLoad, scene, matloader)
        //scene.add(test);
        orb.autoRotate = true
        orb.autoRotateSpeed = 0.5
    }
    componentWillUnmount(): void {
        renderer.render(scene.clear(), camera.clear());
    }


    render() {

        //OPTIONAL::CREATE FUNCTIONS FOR EACH OBJECT
        var draw = function (this: any) {
            requestAnimationFrame(draw);
            orb.update()
            if (modelReady) mixer.update(clock.getDelta())
            //camera.lookAt(scene.position);
            renderer.render(scene, camera);

            //camera.position.x += (mouseX - camera.position.x) * 0.02;
            //camera.position.y += (- mouseY - camera.position.y) * 0.02;

            //console.log(mouseX + " ::: " + window.innerWidth / 2 / 2 / 2)
            if (mouseX > (window.innerWidth / 2) / 2 / 2) {
                camera.rotateOnAxis(Y_AXIS, 0.001)
            } else if (mouseX < (window.innerWidth / 2) / 2 / 2) {
                camera.rotateOnAxis(Y_AXIS, 0.001)
            } else {

            }

            //camera.position.x += Math.sin(camera.rotation.y) * 3;
            //camera.position.z += Math.cos(camera.rotation.y) * 3;
            // camera.position.y += cameraHeight; // optional
            //tempVector.copy(target).y+=cameraHeight; // the += is optional


            //var man = object_map.get('homie');
            //console.log(man);
            //var bu = object_map.get('bunny');
            //bu = scene.getObjectById(bu);
            //bu.rotateX(0.1);
            //camera.position.x += (mouseX - camera.position.x) * .02;
            //camera.position.y += Math.abs((- mouseY - camera.position.y) * .02);
            camera.lookAt(new Vector3(0, 0, 0));

        };
        draw();

        const MouseMove = (event: any) => {
            console.log("MOUSE MOVING")
            mouseX = (event.clientX - window.innerWidth / 2);
            mouseY = (event.clientY - window.innerHeight / 2);
        }

        const mouse = () => {
            console.log("OHHHHH")
        }

        document.addEventListener('mousemove', MouseMove)
        return (
            <div id="render" onMouseMove={MouseMove} onMouseDown={mouse}></div>
        );
    }
}