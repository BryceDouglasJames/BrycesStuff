import React from "react";
import './CoolStuff.css';

type item = {
    name?: string
    description?: string
    category?: string
    link?: string
    style?: string
    empty?: boolean
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
                <div className="grid grid-flow-row auto-rows-min rounded-2xl ring-slate-650/5 items-center justify-center p-3 bg-black m-auto z-10" style = {{width:"100vw"}} >
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
                    <br></br>
                    {(!this.props.empty) ? 
                        <button type="button" className="inline-block align-bottom px-6 py-2.5 bg-gray-600 text-white font-medium text-xs  uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out m-auto " style ={{width:"auto"}} onClick={(e)=>{this.goToLiveDemo(e)}}>Click if interested 😉</button>
                        :
                        <></>
                    }
                </div >
            </div >
        )
    }
};