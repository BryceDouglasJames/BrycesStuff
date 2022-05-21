import React from "react";

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
        let style_val = this.props.style + " snap-center scroll-auto w-100 p-2 my-auto";
        return (
            <div className={style_val} >
                <div className="group grid grid-rows-3 rounded-2xl ring-slate-650/5 items-center justify-evenly p-3 bg-black m-auto">
                    <div className="flex grid grid-rows-2 items-center text-center p-5 text-white">
                        <div className="snap-start text-3xl">{this.props.name}</div>
                        <br></br>
                        <div className="snap-start flex w-70 justify-evenly m-auto text-white">{this.props.description}</div>
                    </div>
                    <div className="grid grid-cols-2 w-100">
                        <button
                            className="border items-center justify-center border-solid rounded bg-white p-3 m-auto text-black"
                            type="button"
                            onClick={this.goToLiveDemo}
                            style={{ width: "80%" }}
                        >See live demo</button>
                        <button
                            className="border items-center justify-center border-solid rounded bg-white p-3 m-auto text-black"
                            type="button"
                            onClick={this.goToLiveDemo}
                            style={{ width: "80%" }}
                        >View code</button>
                    </div>
                    <div className="m-auto p-1 text-center justify-evenly" style={{ color: "white" }}>
                        <h2>Made using:</h2>
                        <br></br>
                        <ul className="flex flex-wrap items-center">
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