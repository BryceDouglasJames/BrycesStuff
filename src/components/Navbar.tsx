import React from "react";
import { Link } from 'react-router-dom'

type ToggleState = {
    toggled: boolean;
};

export class Navbar extends React.Component<{}, ToggleState> {

    state: ToggleState = {
        toggled: false
    };

    public toggle = this.state.toggled;

    public changeToggle() {
        this.toggle = !this.toggle;
        this.setState({
            toggled: this.toggle
        })
    }

    render() {
        const { toggled } = this.state;

        return (
            <nav className="flex items-center justify-evenly flex-wrap bg-black p-6 grid grid-rows-2 lg:divide-y lg:divide-white">
                <div className="items-center text-white text-center text-3xl p-5">
                    <h1>Bryce James</h1>
                </div>
                <button
                    className="text-white border items-center justify-center border-solid rounded lg:hidden bg-white p-3 w-10 m-auto"
                    type="button"
                    onClick={() => this.changeToggle()}
                >
                    <svg className="h-3 w-3 items-center" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6h50v2H0V3zm0 6h50v2H0V9zm0 6h50v2H0v-2z" />
                    </svg>
                </button>
                <div className={
                    "lg:flex flex-grow text-sm items-center justify-center" +
                    (toggled ? "" : " hidden")
                }>
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto text-center">
                        <li className="nav-item m-auto p-auto">
                            <Link to="/">
                                <a
                                    className="px-3 py-2 flex text-lg font-bold text-white hover:opacity-75"
                                    href="#pablo"
                                >
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item m-auto p-auto">
                            <a
                                className="px-3 py-2 flex text-lg font-bold text-white hover:opacity-75"
                                href="#pablo"
                            >
                                Projects
                            </a>
                        </li>
                        <li className="nav-item m-auto p-auto">
                            <Link to="/coolstuff/home">
                                <a
                                    className="px-3 py-2 flex text-lg font-bold text-white hover:opacity-75"
                                    href="#pablo"
                                >
                                    Neat Stuff
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item m-auto p-auto">
                            <Link to="/about">
                                <a
                                    className="px-3 py-2 flex text-lg font-bold text-white hover:opacity-75"
                                    href="#pablo"
                                >
                                    About
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}