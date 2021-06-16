import react from "react";

export class NotFound extends react.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h1>
                    404: NOT FOUND. TRY ANOTHER ROUTE.
                </h1>
            </div>
        )
    }

}