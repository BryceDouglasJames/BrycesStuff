import react, { useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { ObjectControls } from 'threejs-object-controls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Camera, LoopPingPong, Mesh, MeshBasicMaterial, TextureLoader, Vector3 } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import Stats from 'three/examples/jsm/libs/stats.module'
import { Footer } from '../../pages/Footer';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
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
const object_map = new Map();

const ObjLoad = new OBJLoader();
const aniloader = new FBXLoader();
const textloader = new TextureLoader();
const matloader = new MTLLoader();

const orb = new OrbitControls(camera, renderer.domElement)

type ToggleState = {
    toggled: boolean;
};

//FIX THIS WITH A VALID FBX FILE. BUILT IN PARSER IS VERY PICKY
function render_fbx(loader: FBXLoader, scene: THREE.Scene, name: string) {
    loader.load("big_walk.fbx", function (object) {
        object.name = name;
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
        object_map.set(name, object);

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
export class SimpleRender extends react.Component<any, ToggleState>{
    tempObj!: THREE.Group;
    mount: HTMLDivElement | HTMLCanvasElement | null | undefined;
    constructor(props: any) {
        super(props);
        this.tempObj = new THREE.Group();
        //this.state = {
        //    view: null
        //};

        console.log(mouseX);
        console.log(mouseY);
    }

    state: ToggleState = {
        toggled: true
    };

    public toggle = this.state.toggled;

    public CollapseCanvas() {

        this.toggle = !this.toggle;
        this.setState({
            toggled: this.toggle
        })
        this.forceUpdate();
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        //INIT DELEGATES

        //ATTATCH RENDERER TO WINDOW
        renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
        renderer.domElement.className = 'grid h-screen place-items-center content-start m-auto p-6'
        this.mount?.appendChild(renderer.domElement);


        //create manager for assuring and logging canvas progress
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
        OBJLoader.bind(manager)


        //CREATE OBJECT(s) TO BE RENDEREd

        //set camera atrributes
        camera.position.set(0, 0, 300)
        camera.position.y = 15 * Math.sin(-450)
        orb.autoRotate = true
        orb.autoRotateSpeed = 0.1

        //for debugging axes location
        //scene.add(new THREE.AxesHelper(10));

        //set skybox images and properties
        var skybox = new THREE.CubeTextureLoader().load(["./skybox/cave3_lf.png", "./skybox/cave3_lf.png", "./skybox/cave3_lf.png", "./skybox/cave3_lf.png", "./skybox/cave3_lf.png", "./skybox/cave3_lf.png"])
        scene.background = skybox;


        //create 'floor'
        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        scene.add(mesh);


        //add light to the scene
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);


        scene.add(camera);

        //render animations and-or objects
        //TODO schedule different renders once user selects different button options through callback functions
        //render_fbx(aniloader, scene, "homie")
        //renderObj(ObjLoad, scene);
        renderObj_With_Texture(ObjLoad, scene, matloader, 'angel')
        //scene.add(test);

    }
    componentWillUnmount(): void {
        renderer.render(scene.clear(), camera.clear());
    }


    render() {
        let count: number = 0;
        //OPTIONAL::CREATE FUNCTIONS FOR EACH OBJECT
        var draw = function (this: any) {
            requestAnimationFrame(draw);
            orb.update()
            if (modelReady) mixer.update(clock.getDelta())
            renderer.render(scene, camera);
            if (mouseX > (window.innerWidth / 2) / 2 / 2) {
                camera.rotateOnAxis(Y_AXIS, 0.001)
            } else if (mouseX < (window.innerWidth / 2) / 2 / 2) {
                camera.rotateOnAxis(Y_AXIS, 0.001)
            } else {
                //...
            }


            if (camera.position.x < -301 || camera.position.x > 301) {
                camera.position.x = 0;
            } else if (camera.position.y <= 1) {
                camera.position.y = 1.1;
            } else if (camera.position.z >= 250) {
            }
            camera.lookAt(new Vector3(0, 0, 0));

        };

        //add canvas events and init draw loop
        const MouseMove = (event: any) => {
            mouseX = (event.clientX - window.innerWidth / 2);
            mouseY = (event.clientY - window.innerHeight / 2);
        }



        const RotateToggle = () => {
            orb.autoRotate = !orb.autoRotate;
        }

        const loadAnimationToCanvas = () => {
            camera.position.set(0, 60, 100)
            let iterator = object_map.entries();
            let obj = iterator.next();
            if (scene.getObjectByName('homie') !== undefined) {
                return;
            }
            scene.remove(obj.value[1]);
            object_map.clear();
            render_fbx(aniloader, scene, "homie")
        }

        const loadModelOneToCanvas = () => {
            camera.position.set(0, 0, 300)
            let iterator = object_map.entries();
            let obj = iterator.next();
            if (scene.getObjectByName('angel') !== undefined) {
                return;
            }
            scene.remove(obj.value[1]);
            object_map.clear();
            renderObj_With_Texture(ObjLoad, scene, matloader, 'angel')
        }

        document.getElementById('root')?.addEventListener('mousemove', MouseMove)
        draw();

        const { toggled } = this.state;

        return (
            <>
                <div className={'grid grid-rows-auto content-start'}>
                    <div className={(toggled ? '' : 'hidden')} ref={mount => { this.mount = mount }} id="render" onMouseMove={MouseMove}></div>
                </div>
                {toggled ?
                    <div className={'grid grid-rows-auto content-start'}>
                        <div className="inline-flex gap-4 m-auto">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={loadAnimationToCanvas}>
                                Animation
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={loadModelOneToCanvas}>
                                Model #1
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                Model #2
                            </button>
                        </div>
                        <br></br>
                        <div className="inline-flex gap-4 m-auto">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={RotateToggle}>
                                Toggle rotate
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => this.CollapseCanvas()}>
                                Collapse
                            </button>
                        </div>
                    </div >
                    :
                    <>
                        <br></br><br></br>
                        <button className="grid bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded m-auto" onClick={() => { this.CollapseCanvas(); }}>
                            Show 3D stuff :p
                        </button>
                    </>

                }

                <br></br><br></br><br></br><br></br><br></br><br></br>
                <hr
                    className=" m-auto p-0 "
                    style={{
                        color: "white",
                        backgroundColor: "white",
                        height: 2,
                        width: '80%'
                    }}
                />
                <div className="grid p-10 m-auto justify-center w-70 m-auto" style={{ fontSize: "140%" }}>
                    <div>
                        <img src="https://media-exp1.licdn.com/dms/image/C4D35AQH_kS3WtJU07A/profile-framedphoto-shrink_200_200/0/1612392489291?e=1658545200&v=beta&t=fmUgAG6x_6Xamec1tCPQFl5sQuCB_1adU1n0_wYzasg" className="h-45 w-45 rounded-full m-auto" alt="author"></img>
                    </div>
                    <h1 className="m-auto pt-3 font-body text-4xl font-semibold text-primary dark:text-white md:text-5xl lg:text-6xl">
                        Soooooo what's up? Hope you like it here :3
                    </h1>
                    <p className="pt-3 font-body text-xl font-light text-primary dark:text-white m-auto">
                        A 'software engineer' from 'Upstate' New York
                    </p>
                    <br></br><br></br>
                    <h4 className="m-auto pt-3 font-body text-xxl font-light text-primary dark:text-white m-auto text-center">
                        Always looking for new challenges, no matter what! Whether it'd be fixing X-Ray machines, sewing, or learning a new language, <br></br><br></br><h4 className='underline decoration-sky-500'> I'm all ears. </h4><br></br>
                        If you want to learn a little more about me you can head to my about section. If you want to mess around with my little object renderer you can as well that'd be cool ;)
                    </h4>
                </div>
            </>
        );
    }
}






function renderObj_With_Texture(loader: OBJLoader, scene: THREE.Scene, matloader: MTLLoader, name: string) {
    matloader
        .load("angel.mtl",
            (material) => {
                console.log(material)
                material.preload()
                loader
                    .setMaterials(material)
                    .load(
                        'angel.obj',
                        (object) => {
                            object.name = name;
                            object.scale.set(80, 80, 80);
                            object.position.set(0, -125, 0);
                            var axis = new THREE.Vector3(4, 0, 7).normalize();
                            var speed = 0.01;
                            //object.rotateOnAxis(axis, speed);
                            //return object;
                            scene.add(object);
                            object_map.set(name, object);
                            //controls = new ObjectControls(camera, renderer.domElement, object);
                            //controls.setDistance(8, 200); // set min - max distance for zoom
                            //controls.setZoomSpeed(0.7); // set zoom speed
                            //controls.enableVerticalRotation();
                            //controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
                            //controls.setRotationSpeed(0.05);
                        }, undefined, (err) => {
                            console.log(err)
                        }
                    )
            }
        )
}


/*

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