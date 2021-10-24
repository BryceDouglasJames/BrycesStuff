import react from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { deflateRawSync } from 'zlib';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ alpha: true });
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;


function renderObj(loader: OBJLoader, scene: THREE.Scene) {
    loader.load(
        'bunny.obj',
        function (object) {
            object.scale.set(20, 20, 20);
            scene.add(object);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );
}

export class SimpleRender extends react.Component<any, any>{

    constructor(props: any) {
        super(props);
        window.addEventListener('mousemove', event => {
            mouseX = (event.clientX - windowHalfX) / 2;
            mouseY = (event.clientY - windowHalfY) / 2;
        });
    }

    componentDidMount() {
        //INIT DELEGATES

        //ATTATCH RENDERER TO WINDOW
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //CREATE OBJECT(s) TO BE RENDERED
        const ObjLoad = new OBJLoader();
        renderObj(ObjLoad, scene);
        camera.position.z = 5;

    }

    render() {
        //OPTIONAL::CREATE FUNCTIONS FOR EACH OBJECT
        var draw = function () {
            requestAnimationFrame(draw);

            camera.lookAt(scene.position);
            renderer.render(scene, camera);

            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.rotateX((mouseX - camera.position.x) * .02);

            camera.position.y += (mouseY - camera.position.y) * .05;
        };
        draw();
        return (
            <></>
        );
    }
}