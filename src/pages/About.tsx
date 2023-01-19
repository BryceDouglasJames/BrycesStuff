import React from "react";
import about_image1 from './assets/about_Image1.jpeg';
import about_image2 from './assets/about_Image2.jpeg';
import about_image3 from './assets/about_Image3.jpeg';

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
        //console.log(this.state.index);
        this.setState({
            index: (this.state.index + 1) % this.images.length
        });
    };
  
    public handlePrev() {
        //console.log(this.state.index);
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
            <div className = "flex flex-col items-stretch">
                <br></br><br></br>
                <div className="m-auto flex align-center p-auto" data-bs-ride="carousel" style = {{justifyContent:"center", top:"5px"}}>
                    <div className="w-full overflow-hidden">
                        <div className=" w-full">
                            <img
                                className="w-auto h-auto m-auto align-center"
                                style = {{objectFit: "cover", maxHeight:"80vh", minHeight:"80vh"}}
                                src={this.images[index]}
                                alt="..."
                            />
                        </div>
                    </div>
                </div>
                <br></br><br></br>

                <h3 className = "m-auto" style ={{
                        color:"white",
                        letterSpacing: "0.2rem",
                        width:"80vw",
                        fontSize: "1.1rem",
                        textShadow: "2px 2px 5px",
                        textAlign:"center",
                        justifyContent:"center",
                        position:"relative"
                    }}>
                        Welcome to my personal website, where I aim to showcase my talents and passions, as well as an opportunity to explore new technologies and share my interests.<br></br><br></br>

                        I was born on December 14th, 1999, and grew up in Liberty, NY. From a young age, I have had a passion for technology and have enjoyed experimenting with various gadgets and devices. At the age of 12, I assembled my first personal computer, which sparked a deep interest in understanding the workings of various components, such as motherboards, graphics cards, and power supplies. I enjoyed helping others with their technology needs and often found myself fixing laptops and building computer setups for my friends and family. <br></br><br></br>

                        During my teenage years, my family moved to Florida, where I attended high school. During this time, I took an introductory course in web design and an advanced placement course in computer science, where I learned Java and C#. Additionally, I was a part of an after-school club that participated in the annual "Harris Design Challenge" hosted by L3Harris in Palm Bay, FL. This experience provided me with the opportunity to work with other local schools to complete a rough software development kit and solve a set of challenges. My team placed 3rd in my sophomore year and 2nd in my junior year, which further fueled my passion for computer science and problem-solving in software development. <br></br><br></br>

                        I am currently on the verge of graduating from the State University of New Paltz with a bachelor's degree in computer science. I am excited to bring my skills, passion, and enthusiasm to a team that is just as a nerd about technology as I am.<br></br><br></br>

                        I don't necessarily have a focus on where I would like to hone my skills in software because, honestly, I love a vast array of topics in this field. Throughout my college experience and as of recent, I have developed a particular interest in programming language concepts such as compilers, parsers, interpreters, and natural language processing. However, I am open to and excited about exploring other areas within software engineering.<br></br><br></br>
                        
                        I am seeking an opportunity to work with a team that is passionate and collaborative, where there is a shared desire for continuous learning and growth. I am proficient in a variety of programming languages including Java, Python, Javascript, and Golang, and also have experience in languages such as C, C++, Rust, PHP, and SQL as required. Furthermore, I am familiar with various JavaScript frameworks and have experience working with different development workflows.<br></br><br></br>

                        One of the most important things to know about me is that I am a creative individual and have a passion for creating. In recent years, I have been fortunate enough to meet some incredibly talented individuals who have inspired me to pursue various other interests, such as garment making, music production, drawing, and rock climbing. My passion for these activities is deeply rooted in my mother, who passed away from cancer when I was sixteen. She remains a constant inspiration to me and everything I do is in her honor and in line with her wishes for me.<br></br><br></br>

                        Thank you for taking the time to read about me. I hope you have enjoyed getting to know me a little better. If you have any questions or would like to connect, please don't hesitate to reach out. <br></br><br></br>
                        Wishing you all the best,<br></br>

                        Bryce James
                        </h3>
                        <br></br><br></br><br></br>
            </div>
        )
    }
}
