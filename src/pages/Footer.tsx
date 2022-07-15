import react from "react";

export class Footer extends react.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <footer className="flex flex-col n p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 mt-80 dark:bg-gray-800" style={{
                bottom: 0,
            }}>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://github.com/BryceDouglasJames.com" className="hover:underline">Bryce James</a>. All Rights Reserved.
                </span>
            </footer>
        )
    }

}


