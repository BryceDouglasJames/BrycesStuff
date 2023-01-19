import react, { BaseSyntheticEvent } from "react";
import emailjs, { init } from 'emailjs-com';

type ContactState = {
    Name: String
    Email: String
    Message: String
}
export class Footer extends react.Component<any, ContactState>{

    state:ContactState = {
        Name: "",
        Email: "",
        Message: "",
    };

    public setName(e:BaseSyntheticEvent) : void{
        let name = e.target.value;
        this.setState({Name: name});
        console.log(name);
        return;
    }

    public setEmail(e:BaseSyntheticEvent) : void{
        let email = e.target.value;
        this.setState({Email: email});
        return;
    }

    public setMessage(e:BaseSyntheticEvent) : void{
        let message = e.target.value;
        this.setState({Message: message});
        return;
    }

    public sendEmail(e:any) : boolean{
        e.preventDefault();
        init("iJZ_j8mkPO00aPVmt");
        try{
            emailjs.send("service_bvdw3j5","template_xa1pm08",{
                from_name: this.state.Name,
                message: this.state.Message,
                contact: this.state.Email,
            },
            );
            return true;
        }catch(e){
            return false;
        }
    }

    render() {
        return (
            <>
                <footer className="flex flex-row-2 flex-wrap p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 mt-70 bg-gray-800" style={{
                    bottom: 0,
                }}>
                    <div className = "flex flex-col m-auto items-center">
                    <span className="text-gray-500 dark:text-gray-400 p-5" style ={{fontSize:"1.2rem", textAlign:"center", top:"50px"}}>© 2023 Bryce James. All Rights Reserved.</span>
                        <div className="footnav flex flex-row gap-2 ">
                            <span className="footnavlink p-3 m-auto items-center"> <a href="https://github.com/BryceDouglasJames"> <img src = "GitHub-Mark-64px.png" alt = "gitphoto" /></a></span>
                            <span className="footnavlink p-3 m-auto items-center"> <a href="https://www.linkedin.com/in/bryce-james-0761821b8"><img src = "In-Blue-72.png" alt = "linkedinlogo"></img></a></span>    
                            <span className="footnavlink p-3 m-auto items-center"> <a href="https://www.instagram.com/afrosofly/?hl=en"> <img src = "Instagram_Glyph_Black.png" width="70px" height="70px" alt = "instalogo" /></a></span>
                        </div>
                        <br></br>
                        <hr style = {{width: "80%", padding: "0"}}></hr>
                        <br></br>
                    </div>
                    <div className="flex flex-col flex-wrap m-auto gap-3 text-center rounded p-4" style = {{backgroundColor:"#171717", color:"white"}}>
                        <div className="form-floating flex flex-row m-auto w-100">
                            <div className = "flex flex-col m-auto p-2">
                                <label htmlFor="NameInput">Name</label>
                                <input type="email"  onChange={(e)=>{this.setName(e)}} className="form-control text-gray-700 w-full p-2 text-base bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                                    ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none" id="NameInput" placeholder="name"></input>
                            </div>
                            <div className = "flex flex-col flex-wrap m-auto p-2">
                                <label htmlFor="EmailInput">Email address</label>
                                <input type="email"  onChange={(e)=>{this.setEmail(e)}} className="form-control text-gray-700 w-full p-2 text-base bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
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
                            onChange={(e)=>{this.setMessage(e)}}
                            placeholder="Your message"
                            ></textarea>
                        </div>
                        <button type = "button" className="stuffbutton m-auto" onClick={(e)=>{
                            var answer:boolean = this.sendEmail(e);
                            if(answer){
                                alert("Email sent! Thank you.");
                            }else{
                                alert("Uh Oh... There was something wrong when sending this email. Make sure you have all the fields filled in before sending.");
                            }
                        }}>
                            Send message
                        </button>
                    </div>
                </footer>
                
            </>
        )
    }

}


