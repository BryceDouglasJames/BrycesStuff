import react from 'react';
import * as THREE from 'three';
// @ts-ignore
import { ObjectControls } from 'threejs-object-controls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
let renderer = new THREE.WebGLRenderer({ alpha: true });
let mouseX = 0, mouseY = 0;
//let windowHalfX = window.innerWidth / 2;
//let windowHalfY = window.innerHeight / 2;
var controls: ObjectControls;
let object_map = new Map();


function renderObj(loader: OBJLoader, scene: THREE.Scene) {
    loader.load(
        'bunny.obj',
        function (object) {
            object_map.set('bunny', object.id);
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
            console.log('An error happened');
        }
    );
}

//FIX THIS WITH A VALID FBX FILE. BUILT IN PARSER IS VERY PICKY
function render_fbx(loader: FBXLoader, scene: THREE.Scene, name: String) {
    loader.load("Walking.fbx", function (object) {
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
        scene.add(object);
        controls = new ObjectControls(camera, renderer.domElement, object);
        controls.setDistance(8, 200); // set min - max distance for zoom
        controls.setZoomSpeed(0.5); // set zoom speed
        controls.enableVerticalRotation();
        controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
        controls.setRotationSpeed(0.05);
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


        //CREATE OBJECT(s) TO BE RENDERED
        const ObjLoad = new OBJLoader();
        const aniloader = new FBXLoader();
        //render_fbx(aniloader, scene, "homie")
        renderObj(ObjLoad, scene);
        //scene.add(test);
        camera.position.z = 10;
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        scene.add(camera);
        scene.add(new THREE.AxesHelper(10));

    }
    componentWillUnmount(): void {
        renderer.render(scene.clear(), camera.clear());
    }

    render() {
        //OPTIONAL::CREATE FUNCTIONS FOR EACH OBJECT
        var draw = function (this: any) {
            requestAnimationFrame(draw);
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
            var man = object_map.get('homie');
            //console.log(man);
            //var bu = object_map.get('bunny');
            //bu = scene.getObjectById(bu);
            //bu.rotateX(0.1);
            //camera.position.x += (mouseX - camera.position.x) * .02;
            //camera.position.y += (- mouseY - camera.position.y) * .02;
        };
        draw();
        return (
            <div id="render"></div>
        );
    }
}