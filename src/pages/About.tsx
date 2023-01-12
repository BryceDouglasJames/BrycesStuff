import React, {useEffect} from "react";
import about_image1 from './about_Image1.jpeg';
import about_image2 from './about_Image2.jpeg';
import about_image3 from './about_Image3.jpeg';

type PhotoIndex = {
    index: number
}
export class About extends React.Component<any, PhotoIndex>{

    
    public images = [
        about_image1,
        about_image2,
        about_image3,
    ]

    public state:PhotoIndex={
        index: 0
    }


    public handleNext() {
        console.log(this.state.index);
        this.setState({
            index: (this.state.index + 1) % this.images.length
        });
    };
  
    public handlePrev() {
        console.log(this.state.index);
        this.setState({
            index: (this.state.index - 1 + this.images.length) % this.images.length
        });
    };

    componentDidMount(): void {
        setInterval(() => {
            this.setState({index: (this.state.index + 1) % this.images.length});
          }, 3000);
    }

    componentWillUnmount(): void {
        
    }
   

    render() {
        const {index} = this.state;
        return (
            <>
                <br></br><br></br>
                <div className="m-auto flex align-center p-auto" data-bs-ride="carousel" style = {{justifyContent:"center", top:"5px"}}>
                    <div className="w-full overflow-hidden">
                        <div className=" w-full">
                            <img
                                className="w-auto h-auto m-auto align-center"
                                style = {{objectFit: "cover", maxHeight:"80vh"}}
                                src={this.images[index]}
                                alt="..."
                            />
                        </div>
                    </div>
                </div>
                <br></br><br></br>
            </>
        )
    }
}

function setCounter(arg0: (prevCounter: any) => any) {
    throw new Error("Function not implemented.");
}
