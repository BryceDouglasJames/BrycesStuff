import react from 'react';
import * as THREE from 'three';

export class SimpleRender extends react.Component<any, any>{

    constructor(props: any) {
        super(props);

        window.addEventListener('keypress', event => {

        });
    }


    componentDidMount() {

        //INIT DELEGATES
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();

        //ATTATCH RENDERER TO WINDOW
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //CREATE OBJECT(s) TO BE RENDERED
        var planeW = window.innerWidth;
        var planeH = 1;
        var planeOBJ = new THREE.PlaneGeometry(planeW, planeH);
        var planeMaterial = new THREE.MeshBasicMaterial({ color: "green" });
        var plane = new THREE.Mesh(planeOBJ, planeMaterial);

        //ADD OBJECTS TO SCENE 
        //scene.add(cube);
        scene.add(plane);
        camera.position.z = 5;


        //OPTIONAL::CREATE FUNCTIONS FOR EACH OBJECT
        var draw = function () {
            requestAnimationFrame(draw);
            plane.rotation.z += 0.03;
            renderer.render(scene, camera);
        };
        draw();
    }

    render() {
        return (
            <></>
        );
    }
}