import React from "react";
import './card.css';

type item = {
    name?: string
    description?: string
    technologies?: string[]
    link?: string
    style?: string
}

export class Projects_Row extends React.Component<item>{
    goToLiveDemo = (e: any): void => {
        e.preventDefault();
        window.open(this.props.link);
    }

    render(): React.ReactNode {
        //hover:bg-sky-500 hover:ring-sky-500 
        let style_val = this.props.style + "snap-center scroll-auto w-100 p-3 sm:m-auto lg:ml-3 mt-10 projcard";
        return (
            <div className={style_val} >
                <div className="grid grid-flow-row auto-rows-min rounded-2xl ring-slate-650/5 items-center justify-evenly p-3 bg-black m-auto z-10">
                    <div className="flex grid grid-flow-row auto-rows-minitems-center text-center p-5 text-white">
                        <div className="snap-start text-3xl z-10">{this.props.name}</div>
                        <br></br>
                        <div className="snap-start flex justify-evenly text-white z-10 w-75 m-auto">{this.props.description}</div>
                    </div>
                    <br></br>
                    <div className="grid grid-cols-1 w-100 z-10">
                        <button
                            className="border items-center justify-center border-solid rounded bg-white p-3 m-auto text-black"
                            type="button"
                            onClick={this.goToLiveDemo}
                            style={{ width: "80%" }}
                        >See live demo</button>
                    </div>
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
                        <h2>Made using:</h2>
                        <ul className="flex flex-wrap items-center p-2">
                            {this.props.technologies?.map((val) => {
                                return <span className="underline m-auto p-1 items-center" style={{
                                    overflow: "break-word", wordWrap: "break-word", hyphens: "auto", textDecorationColor: "fuchsia", textUnderlineOffset: "2px"
                                }}>&nbsp;&nbsp;{val}&nbsp;&nbsp;</span>
                            })}
                        </ul>
                    </div>
                </div >
            </div >
        )
    }
};