/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Projects_Row } from "./Project_Row";
import "./Project_Style.css";
import phone from "./assets/phone_frame.png";
import scraper_photo from "./assets/geniusandpython.png";
import justforyouphoto from "./assets/JustForYouHome.png";
import facetofacephoto from "./assets/facetofacephoto.png";
import grep_photo from "./assets/GREP_photo.png";

import { Project_Card } from "./Project_Card";



export class ProjectsList extends React.Component<any, any> {
    render() {
        return (
            <>
                <div className="mb-80" style={{ backgroundColor: "#171717" }}>
                    <div className="title">
                        <h1>Let's see what I've been up to!</h1>
                    </div>

                    <div className="flex flex-col flex-wrap">
                        <div className="lg:grid lg:grid-flow-col lg:grid-flow-col lg:gap-20 lg:content-start" style={{ backgroundColor: "#171717" }} >
                            <div className="row p-2 lg:ml-10">
                                <br></br><br></br><br></br>
                                <div>
                                    <img className = "m-auto" src="Mayhem_Title.svg" alt="HELP"></img>
                                    <br></br>
                                    <Projects_Row
                                        name="Conceptual Mayhem E-Commerce Platfrom"
                                        link="https://theworldkeepsstaringat.me"
                                        style="lg:col-span-2"
                                        description="This E-Commerce website was developed to provide a collective platform for customers to interact with my clothing line, showcasing a dynamic and abstract storefront. 
                                        The website was optimized for mobile viewing, so for the best experience, please switch to responsive view and refresh the page when accessing on a browser. This project was an 
                                        opportunity for me to express my personality and creativity, and I consider it more of an artistic expression than a traditional e-commerce platform. This
                                        was also my first 'big' project as this taught me a lot about web development."
                                        technologies={["ReactJS", "Netlify", "Figma", "PaypalAPI", "WebGL (Pre-recorded for adding outfit to 3-D model)", "Bootstrap"]}>
                                    </Projects_Row>
                                </div>
                                <br></br><br></br>
                            </div>
                            <img className="phone-frame-1 lg:col-span-1 p-20 mb-full" src={phone} alt="phone1"></img>
                        </div>
                        <hr
                            className="z-10 lg:mt-10 m-auto lg:mb-10 p-0 w-3/4"
                            style={{
                                color: "fuchsia",
                                backgroundColor: "fuchsia",
                                height: 2,
                            }}
                        />

                        <div className="lg:grid lg:grid-flow-col lg:grid-flow-col lg:gap-20 lg:content-start" style={{ backgroundColor: "#171717" }} >
                            <div className="row p-2 lg:ml-10">
                                <br></br><br></br><br></br>
                                <div>
                                    <img className = "m-auto" src="NLP_Text.svg" alt="HELP"></img>
                                    <Projects_Row
                                        name="Natural Language Lyric Generator"
                                        link="http://nlp-lyric-generator.us-east-1.elasticbeanstalk.com"
                                        style="lg:col-span-2"
                                        description="This project, which was completed for a data science class, aimed to generate pseudo-lyrics that are similar to those of a specific artist chosen by the user. 
                                        The project employed an N-Gram language model along with sentiment and topic analysis to achieve this goal. As part of the project requirements, we implemented a form of 
                                        map-reduce in order to efficiently gather and partition data. However, for deployment purposes, we ultimately adopted a more general approach due to the limited scope of 
                                        the project. Through this project, we gained valuable insights and experience in natural language processing, as well as in deploying and managing workflows in AWS."
                                        technologies={["Python", "SKLearn", "Django", "Docker", "Hadoop", "AWS Elastic Beanstalk", "AWS Elastic Mapreduce", "NGINX"]}>
                                    </Projects_Row>
                                </div>
                                <br></br><br></br>
                            </div>
                            <img className="phone-frame-2 lg:col-span-1 p-20 mb-full" src={phone} alt="phone1"></img>
                        </div>
                        <hr
                            className="z-10 lg:mt-10 m-auto lg:mb-10 p-0 w-3/4"
                            style={{
                                color: "fuchsia",
                                backgroundColor: "fuchsia",
                                height: 2,
                            }}
                        />

                        <div className="lg:grid lg:grid-flow-col lg:grid-flow-col lg:gap-20 lg:content-start" style={{ backgroundColor: "#171717" }} >
                            <div className="row p-2 lg:ml-10">
                                <br></br><br></br><br></br>
                                <div>
                                    <img className = "m-auto" src="bjauto_text.svg" alt="HELP"></img>
                                    <Projects_Row
                                        name="BJ-Auto-Complete"
                                        link="https://bjautocomplete.netlify.app"
                                        style="lg:col-span-2"
                                        description="This website features an autocomplete functionality implemented using a suffix trie data structure. It was created to gain a deeper understanding 
                                        of the trie data structure and to learn more about the typescript language. The website includes a search bar that allows users to see available completion words 
                                        in real-time, based on the user's search parameter. Additionally, the website also allows for manual word addition, generation of random words, and the ability 
                                        to delete the current word list, providing a fresh start."
                                        technologies={["ReactJS", "Typescript", "Netlify"]}>
                                    </Projects_Row>
                                </div>
                                <br></br><br></br>
                            </div>
                            <img className="phone-frame-3 lg:col-span-1 p-20 mb-full" src={phone} alt="phone1"></img>
                        </div>
                        <hr
                            className="z-10 lg:mt-10 m-auto lg:mb-10 p-0 w-3/4"
                            style={{
                                color: "fuchsia",
                                backgroundColor: "fuchsia",
                                height: 2,
                            }}
                        />

                        <div className="lg:grid lg:grid-flow-col lg:grid-flow-col lg:gap-20 lg:content-start" style={{ backgroundColor: "#171717" }} >
                            <div className="row p-2 lg:ml-10">
                                <br></br><br></br><br></br>
                                <div>
                                    <img className = "m-auto" src="Goproj_Title.svg" alt="HELP"></img>
                                    <br></br>
                                    <Projects_Row
                                        name="Hill Climbing Algorithm using Golang"
                                        link="https://geneticalgos-production.up.railway.app"
                                        style="lg:col-span-2"
                                        description="This project is an exploration of the field of genetic algorithms, utilizing the hill climbing technique. The project was implemented using Golang, 
                                        allowing me to gain a deeper understanding of the language with an oddly practical example and experiment with its templating engine. It presents a simple example, where the 
                                        algorithm attempts to 'guess' the combination of 10 numbers provided by the user."
                                        technologies={["Golang, Railway.io"]}>
                                    </Projects_Row>
                                </div>
                                <br></br><br></br>
                            </div>
                            <img className="phone-frame-4 lg:col-span-1 p-20 mb-full" src={phone} alt="phone1"></img>
                        </div>
                        <hr
                            className="z-10 lg:mt-10 m-auto lg:mb-10 p-0 w-3/4"
                            style={{
                                color: "fuchsia",
                                backgroundColor: "fuchsia",
                                height: 2,
                            }}
                        />
                    </div >
                    <div className="other_title">
                        <h1>Some other stuff I've worked on!</h1>
                    </div>
                    <br></br>
                    <div className = "flex items-stretch flex-col-3 flex-wrap gap-10 content-center text-center items-center" style={{justifyContent: "center"}}>
                        <Project_Card
                            title="Genius Lyrics Scraper"
                            description="A tool was made to assist in collecting lyrics for a data science project. The tool uses a headless browser, 
                            which is a browser that runs in the background without a graphical user interface, to look up a random number of top artists 
                            on the website Genius.com. It then outputs the artist's name and associated ID in a text file, which could be used for further data 
                            analysis or research. We used it for our NLP Lyric Generator and used the generated output in a hadoop instance to scrape and parse 
                            selected lyrics."
                            link="https://github.com/BryceDouglasJames/Lyric_Scraper"
                            photo={scraper_photo}
                            technologies={["Python", "Selenium"]}
                        ></Project_Card>
                        <Project_Card
                            title="NFA to DFA converter"
                            description="A small project that a colleague and I worked on for a language processing course was a program that converts Non-deterministic Finite Automata 
                            (NFA) to Deterministic Finite Automata (DFA). Finite automata are mathematical models of computation that are used in the 
                            study of formal languages and automata theory. An NFA is a type of finite automaton that can be in multiple states at the same time, 
                            while a DFA is a type of finite automaton that can be in only one state at a time. The goal of the program was to take an NFA as input and convert it to an equivalent DFA, which can 
                            be more efficient to work with in some cases."
                            link="https://github.com/QuinnHerden/NFA-to-DFA"
                            photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9-47ed9qgeA7m8IrDuSIzf5jBhnSwpUi7yA&usqp=CAU"
                            technologies={["Python"]}
                        ></Project_Card>
                        <Project_Card
                            title="Just For You"
                            description="This project was developed as part of a software engineering course, it is a daily wellness tracker that allows users to self-evaluate their health status by answering questions 
                            related to different health categories. It includes a forum system where users can post updates, data visualization to better understand the data and a basic authentication system using providers. 
                            Additionally, we implemented a simple regression model to better evaluate the data collected. "
                            other_links={["https://github.com/BryceDouglasJames/JustForYouAPI", "https://github.com/BryceDouglasJames/JustForYouClient"]}
                            other_names={["Just For You API", "Just For You Client"]}
                            link="https://www.youtube.com/watch?v=8uVdqslx5pw"
                            photo={justforyouphoto}
                            technologies={["Javascript", "PHP", "Bootstrap", "ReactJS", "MySQL", "XAMPP"]}
                        ></Project_Card>
                        <Project_Card
                            title="FaceToFaceImaging.com"
                            description="A standard website was created for a company that I work for on a part-time basis. This was the first 
                            website that I personally had ever made and it was able to be served on a public domain. The website was designed to serve as an online presence for 
                            the company, providing information about the company's products, services, and contact information. The website was built to be user-friendly and 
                            easy to navigate, with a clean and modern design. The website's purpose is to help promote the company's brand and make it more accessible to 
                            potential customers."
                            link="https://facetofaceimaging.com"
                            photo={facetofacephoto}
                            technologies={["HTML", "Javascript", "JQuery", "Express.js", "NodeJS", "Netlify"]}
                        ></Project_Card>
                        <Project_Card
                            title="GREP Compiler Design Project"
                            description="The project was a very enjoyable experience to work on. It was an implementation of the GREP command line utility in Java. 
                            The task given was to create a set of tools based on a context-free grammar for a regular expression. The first step was to create a bottom-up 
                            parser for the language. This is a type of parsing algorithm that is very common for simple grammars. Next, an NFA (Non-deterministic Finite Automata) 
                            was constructed using the states generated from the input string. Finally, the tool evaluated the NFA by traversing it and displaying the results. 
                            The results are the set of strings that match the regular expression defined by the context-free grammar. The implementation of GREP in Java allowed for more 
                            flexibility and control in the evaluation of regular expressions, giving us a good sense of what is happening under the hood."
                            link="https://github.com/BryceDouglasJames/grep_compiler_design_project"
                            photo={grep_photo}
                            technologies={["Java"]}
                        ></Project_Card>
                        <Project_Card
                            title="Memory Allocator Project"
                            description="This project was for my Operating Systems class and the task was to write a program that would emulate the worst-fit, best-fit and first-fit memory allocation methods.
                             Memory allocation is the process of assigning memory blocks to a running program or process. These three methods of memory allocation are different algorithms used to determine 
                             where to place a program in memory. he project helped me to understand how memory allocation works under the hood and how different methods affect the performance of the system. 
                             It also helped me to understand the trade-offs between different memory allocation methods and how to choose the best one for a given application."
                            link="https://github.com/BryceDouglasJames/MemoryAllocator"                       
                            photo="https://s3.ap-south-1.amazonaws.com/s3.studytonight.com/tutorials/uploads/pictures/1608189390-71449.png"
                            technologies={["Java"]}
                        ></Project_Card>

                    </div>
                    <div className="final_title" style={{top:"2vh", background:"none"}}>
                        <h1>You can check out my <a style ={{textDecoration:"underline"}} href = "https://github.com/BryceDouglasJames">Github</a> to see some other projects!</h1>
                        <br></br>
                    </div>
                    <div className="final_title" style={{top:"2vh", background:"none"}}>
                            <h1>Much more to come!</h1>
                    </div>
                </div>
            </>
        );
    }

}
