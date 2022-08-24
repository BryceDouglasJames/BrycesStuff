import React from "react";
import './CoolStuff.css';

type item = {
    name?: string
    description?: string
    category?: string
    link?: string
    style?: string
}

export class CoolStuff_Row extends React.Component<item>{
    goToLiveDemo = (e: any): void => {
        e.preventDefault();
        window.open(this.props.link);
    }

    render(): React.ReactNode {
        //hover:bg-sky-500 hover:ring-sky-500 
        let style_val = this.props.style + " sm:w-full md:w-3/4 lg:w-5/8 p-3 coolcard";
        return (
            <div className={style_val} style = {{}}>
                <div className="grid grid-flow-row auto-rows-min rounded-2xl ring-slate-650/5 items-center justify-center p-3 bg-black m-auto z-10">
                    <h1>{this.props.name}</h1>  
                    <h2>Category: {this.props.category}</h2>
                  
                    <br></br>
                    <hr
                        className="z-10 m-auto p-0"
                        style={{
                            color: "fuchsia",
                            backgroundColor: "fuchsia",
                            height: 2,
                            width: '80%'
                        }}
                    />
                    <div className="m-auto p-3 text-center justify-evenly z-10" style={{ color: "white" }}>
                        <h1>{this.props.description}</h1>
                    </div>
                </div >
            </div >
        )
    }
};