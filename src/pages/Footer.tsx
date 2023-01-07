import react from "react";

export class Footer extends react.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <footer className="flex flex-row flex-wrap p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 mt-70 dark:bg-gray-800" style={{
                    bottom: 0,
                }}>
                    <div className = "flex flex-col m-auto items-center">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 p-3" style ={{fontSize:"1.2rem"}}>© 2022 Bryce James. All Rights Reserved.
                        </span>
                        <br></br>
                        <hr style = {{width: "80%", padding: "0"}}></hr>
                        <br></br>
                        <div className="footnav flex flex-row gap-2 ">
                            
                            <span className="footnavlink p-3 m-auto items-center"> <a href="https://github.com/BryceDouglasJames"> <img src = "GitHub-Mark-64px.png" alt = "gitphoto" /></a></span>
                            <span className="footnavlink p-3 m-auto items-center"> <a href="https://www.linkedin.com/in/bryce-james-0761821b8"><img src = "In-Blue-72.png" alt = "linkedinlogo"></img></a></span>    
                            <span className="footnavlink p-3 m-auto items-center"> <a href="https://www.instagram.com/afrosofly/?hl=en"> <img src = "Instagram_Glyph_Black.png" width="70px" height="70px" alt = "instalogo" /></a></span>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap m-auto text-center rounded p-4" style = {{backgroundColor:"#171717", color:"white"}}>
                        <div className="form-floating flex flex-row m-auto w-100">
                            <div className = "flex flex-col m-auto p-2">
                                <label htmlFor="NameInput">Name</label>
                                <input type="email"  className="form-control text-gray-700 w-full p-2 text-base bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                                    ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none" id="NameInput" placeholder="name"></input>
                            </div>
                            <div className = "flex flex-col flex-wrap m-auto p-2">
                                <label htmlFor="EmailInput">Email address</label>
                                <input type="email"  className="form-control text-gray-700 w-full p-2 text-base bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                                    ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none" id="EmailInput" placeholder="name@example.com"></input>
                            </div>
                        </div>
                    
                        <div className="m-auto w-100 p-3">
                            <label htmlFor="MessageTextArea" className="form-label inline-block mb-2"
                            >Enter your inquiry</label>
                            <textarea 
                            className="form-control  text-gray-700 w-full p-2 text-base bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="MessageTextArea"
                            placeholder="Your message"
                            ></textarea>
                        </div>
                        <button type = "button" className="stuffbutton m-auto">
                            Send message
                        </button>
                    </div>
                </footer>
            </>
        )
    }

}


