import React from "react";
import { Projects_Row } from "./Project_Row";
import "./Project_Style.css"
import phone from "./phone_frame.png"
import { Set } from "typescript";


export class ProjectsList extends React.Component<any, any> {
    render() {
        return (
            //<div className="snap-proximity snap-x">
            //</div>
            <>
                <div className="title">
                    <h1>Let's see what I've been up to!</h1>
                </div>

                <div className="grid grid-cols-3 gap-1 content-start w-full justify-center h-screen py-24 first-parallax">
                    <Projects_Row name="Test" link="https://google.com" style="col-span-2" description="This is an example of what the desciption will be." technologies={["one", "two", "three", "four", "five", "six", "seven"]}></Projects_Row>
                    <img className="phone-frame col-span-1 m-auto" src={phone} alt="phone1"></img>
                </div>
                <div className="footer"></div>
            </>
        );
    }

}
