import react from "react";
import { SimpleRender } from '../components/threejs/SimpleRender'
export class Home extends react.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <SimpleRender />
            </div>
        )
    }

}