import react from 'react';
import * as THREE from 'three';
// @ts-ignore
import { ObjectControls } from 'threejs-object-controls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TextureLoader, Vector3 } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Watch } from 'react-loader-spinner'

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
    loading: boolean;
};



export class SimpleRender extends react.Component<any, ToggleState>{
    tempObj!: THREE.Group;
    mount: HTMLDivElement | HTMLCanvasElement | null | undefined;
    constructor(props: any) {
        super(props);
        this.tempObj = new THREE.Group();
        //console.log(mouseX);
        //console.log(mouseY);
    }


    //controls for collapsing animation canvas
    state: ToggleState = {
        toggled: true,
        loading: true
    };
    public toggle = this.state.toggled;
    public CollapseCanvas() {
        this.toggle = !this.toggle;
        this.setState({
            toggled: this.toggle
        })
        this.forceUpdate();
    }


    public loadAnimationToCanvas() {
        this.setState({
            loading: true
        })
        camera.position.set(0, 60, 100)
        let iterator = object_map.entries();
        let obj = iterator.next();
        if (scene.getObjectByName('homie') !== undefined) {
            return;
        }
        scene.remove(obj.value[1]);
        object_map.clear();
        this.render_fbx(aniloader, scene, "homie")
    }


    public loadModelOneToCanvas() {

        camera.position.set(0, 0, 300)
        let iterator = object_map.entries();
        let obj = iterator.next();
        if (scene.getObjectByName('angel') !== undefined) {
            return;
        }
        this.setState({
            loading: true
        })
        scene.remove(obj.value[1]);
        object_map.clear();
        this.renderObj_With_Texture(ObjLoad, scene, matloader, 'angel')
    }

    public loadModelTwoToCanvas() {

        camera.position.set(0, 0, 300)
        let iterator = object_map.entries();
        let obj = iterator.next();
        if (scene.getObjectByName('field_me') !== undefined) {
            return;
        }
        this.setState({
            loading: true
        })
        scene.remove(obj.value[1]);
        object_map.clear();
        this.renderObj_With_Texture(ObjLoad, scene, matloader, 'field_me')
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
        orb.autoRotate = false
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
        this.renderObj_With_Texture(ObjLoad, scene, matloader, 'angel')
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

            if (scene.getObjectByName('homie') !== undefined) {
                mixer.update(clock.getDelta())
            }

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


        document.getElementById('root')?.addEventListener('mousemove', MouseMove)
        draw();

        const { toggled, loading } = this.state;

        return (
            <>
                <div className={'grid grid-rows-auto content-start'}>
                    {loading ?
                        <div className='m-auto items-center	' style={{ width: window.innerWidth / 1.5, height: window.innerHeight / 1.5, textAlign: 'center', alignContent: "center" }}>

                            <div className='grid grid-cols-3 gap-4 content-center' style={{ textAlign: "center", fontSize: "60px", color: "white" }}>
                                <h1>||</h1>
                                <Watch
                                    height={window.innerHeight / 3}
                                    width={window.innerWidth / 3}
                                    radius="48"
                                    color="#caeaff"
                                    ariaLabel="watch-loading"
                                    wrapperStyle={{}}
                                    visible={true}
                                />
                                <h1>||</h1>
                            </div>
                            <h1 className="" style={{ color: "white", fontSize: "35px", fontFamily: "roboto" }}>LOOOOOADING...</h1>
                        </div>
                        :
                        <></>
                    }
                    <div className={(!loading || !toggled ? '' : 'hidden')} ref={mount => { this.mount = mount }} id="render" onMouseMove={MouseMove}></div>

                </div>


                {toggled ?
                    <div className={'grid grid-rows-auto content-start p-2'}>
                        <div className="inline-flex gap-6 m-auto">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => this.loadModelOneToCanvas()}>
                                Model #1
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => this.loadModelTwoToCanvas()}>
                                Model #2
                            </button>
                        </div>
                        <br></br>
                        <div className="inline-flex gap-6 m-auto p-4">
                            <hr></hr>
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
                            Show Controls
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
                <div className="grid p-10 m-auto justify-center w-70 m-auto" style={{ fontSize: "140%", textAlign: "center", color: "white" }}>
                    <div>
                        <img className="m-auto" style={{ borderRadius: "100%" }} src="pfp.jpeg" alt = "pfp"></img>
                    </div>
                    <h1 className="m-auto pt-3 font-body text-4xl font-semibold text-primary dark:text-white md:text-5xl lg:text-6xl">
                        Soooooo what's up?
                    </h1>
                    <p className="pt-3 font-body text-xl font-light text-primary dark:text-white m-auto">
                        I am a 'software engineer' from 'Upstate' New York!
                    </p>
                    <br></br><br></br>
                    <h4 className="m-auto pt-3 font-body text-xxl font-light text-primary dark:text-white m-auto text-center">
                        I always find myself in the most random of activites, whether it be in the realm of fixing X-Ray machines, sewing, or even learning a new language. <br></br><br></br><h4 className='underline decoration-sky-500'> I am always open to new opportunities and experiences.</h4><br></br>
                        If you would like to learn more about me, please feel free to visit my "About" section.  <br></br> <br></br>
                        Also, if you're interested in experimenting with my object renderer above, that's cool too.  <br></br> <br></br> Have a great day :3
                    </h4>
                </div>
            </>
        );
    }

    public renderObj_With_Texture(loader: OBJLoader, scene: THREE.Scene, matloader: MTLLoader, name: string) {
        matloader
            .load(name + ".mtl",
                (material) => {
                    console.log(material)
                    material.preload()
                    loader
                        .setMaterials(material)
                        .load(
                            name + '.obj',
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
                                setTimeout(() => {
                                    this.setState({
                                        loading: false
                                    })
                                }, 2000);
                            }, undefined, (err) => {
                                console.log(err)
                            }
                        )
                },
            )

    }

    //FIX THIS WITH A VALID FBX FILE. BUILT IN PARSER IS VERY PICKY
    public render_fbx(loader: FBXLoader, scene: THREE.Scene, name: string) {
        loader.load("big_walk.fbx",
            (object) => {
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
                //console.log(animationAction)

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
                //modelReady = true


                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 2000);
            }, function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            }, function (error) {
                console.log('An error happened: ' + error as String);
            })
    }

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