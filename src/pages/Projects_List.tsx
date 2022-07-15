import React from "react";
import { Projects_Row } from "./Project_Row";
import "./Project_Style.css"
import phone from "./phone_frame.png"
import { Set } from "typescript";


export class ProjectsList extends React.Component<any, any> {
    render() {
        return (
            <>
                <div className="mb-80" style={{ backgroundColor: "#171717" }}>
                    <div className="title">
                        <h1>Let's see what I've been up to!</h1>
                    </div>

                    <div className="flex flex-col flex-wrap">
                        <div className="lg:grid lg:grid-flow-col lg:grid-flow-col lg:gap-20 lg:content-start" style={{ backgroundColor: "#171717" }} >
                            <div className="row p-2 lg:ml-10">
                                <br></br><br></br><br></br>
                                <Projects_Row
                                    name="Test"
                                    link="https://google.com"
                                    style="lg:col-span-2"
                                    description="Magnis dis parturient montes nascetur ridiculus mus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Integer enim neque volutpat ac. A iaculis at erat pellentesque adipiscing commodo elit at. Nibh praesent tristique magna sit amet purus. Tellus in metus vulputate eu. Pretium lectus quam id leo in vitae turpis massa. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Eget mauris pharetra et ultrices neque ornare aenean."
                                    technologies={["one", "two", "three", "four", "five", "six", "seven"]}>
                                </Projects_Row>
                                <br></br><br></br>
                            </div>
                            <img className="phone-frame lg:col-span-1 p-20 mb-full" src={phone} alt="phone1"></img>
                        </div>
                        <hr
                            className="z-10 lg:mt-10 m-auto lg:mb-10 p-0 w-3/4"
                            style={{
                                color: "fuchsia",
                                backgroundColor: "fuchsia",
                                height: 2,
                            }}
                        />

                        <div className="lg:grid lg:grid-flow-col lg:grid-flow-col lg:gap-20 lg:content-start" style={{ backgroundColor: "#171717" }} >
                            <div className="row p-2 lg:ml-10">
                                <br></br><br></br><br></br>
                                <Projects_Row
                                    name="Test"
                                    link="https://google.com"
                                    style="lg:col-span-2"
                                    description="Magnis dis parturient montes nascetur ridiculus mus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Integer enim neque volutpat ac. A iaculis at erat pellentesque adipiscing commodo elit at. Nibh praesent tristique magna sit amet purus. Tellus in metus vulputate eu. Pretium lectus quam id leo in vitae turpis massa. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Eget mauris pharetra et ultrices neque ornare aenean."
                                    technologies={["one", "two", "three", "four", "five", "six", "seven"]}>
                                </Projects_Row>
                                <br></br><br></br>
                            </div>
                            <img className="phone-frame lg:col-span-1 p-20 mb-full" src={phone} alt="phone1"></img>
                        </div>
                    </div >
                </div>
            </>
        );
    }

}
