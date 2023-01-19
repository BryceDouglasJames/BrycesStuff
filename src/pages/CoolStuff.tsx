/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-pascal-case */
import react from "react";
import "./CoolStuff.css"
import { CoolStuff_Row } from "./CoolStuff_Row";

type PostState = {
    PostType: String
    SearchField: String
    NoResults: Boolean
}

export class CoolStuff extends react.Component<any, PostState>{
    
    private posts = [
        {
            name:"Attention Is All You Need",
            link:"https://arxiv.org/pdf/1706.03762.pdf",
            style:"col-span-1",
            banner:"",
            description:`Transformers. That's all I gotta say. This paper is amazing to me. A transformer is a type of 
            neural network architecture that is used for natural language processing tasks, such as language translation, text summarization, 
            and text generation. It was introduced in this 2017 paper by Google researchers. I wanted to use an RNN for my NLP lyric project, however 
            never got around to it. However, while researching, I learned A transformer architecture is based 
            on the idea of self-attention, which allows the model to weigh the importance of different parts of the input when making predictions. 
            This is in contrast to traditional recurrent neural networks , which process the input sequentially and use the hidden state from the 
            previous timestep to make predictions.`,
            category:"WHITEPAPER",
        },
        {
            name:"Architecture of SQLite",
            link:"https://www.sqlite.org/arch.html",
            style:"col-span-1",
            description:`While studying various parsing techniques, I happened to come across SQLite and its use of an in-house parser called the Lemon parser generator. 
            This parser uses a LALR(1) parser algorithm, which is similar to YACC. 
            I was immediately intrigued by the design of SQLite and its ability to efficiently minimize storage systems.
            I delved deeper into the source code of the Lemon parser generator and was fascinated by the architecture of SQLite. 
            The system is designed to minimize storage space by using a unique approach that is not commonly found in other storage systems. 
            Overall, I was thoroughly impressed by the design and functionality of SQLite and its in-house parser generator, and I wanted to share it! 
            `,
            category:"ARTICLE",
        },
        {
            name:"Long-Short Term Memory Combinatory Categorial Grammar Parser",
            link:"https://homes.cs.washington.edu/~lsz/papers/llz-naacl16.pdf",
            style:"col-span-1",
            description: `While studying in-depth semantic analysis and Natural Langauage parsing for my data science project and looking for resources, I came across this very cool paper. In the 
            context of natural language parsing, LSTM CCG refers to a type of model that uses both LSTM (Long-Short Term Memory) and CCG (Combinatory Categorial Grammar) techniques to analyze 
            and understand natural language. LSTMs are designed to handle sequential data by using memory cells to store information from previous timesteps 
            and gates to control the flow of information. CCGs are based on the idea of categories/types of words, and combinations for how 
            those types can be combined to form grammatically correct sentences.This type of model would use the LSTM architecture to handle the sequential nature of language, 
            while also utilizing the rules and structure of CCG to analyze and understand the grammar and meaning of sentences. This is super cool and hope to one day build some sort appliction of this.`,
            category:"WHITEPAPER",
        },
        {
            name:"Vector-Matrix-Vector Queries for Solving Linear Algebra, Statistics, and Graph Problems",
            link:"https://arxiv.org/pdf/2006.14015.pdf",
            style:"col-span-1",
            description:`I decided to take linear algebra and was blown away behind the concept of a real vector space. This led me down a deep math rabbit hole and led me towards introductions in fields like
            group theory, lambda calculus, and a whole bunch of voodoo. This paper I came across when I was look at other sort of pragmatic use cases of what I was learning in the course and seeing what sort of optimizitons
            can be found. VMV queries are used in many machine learning algorithms such as neural networks, where they are used to calculate the dot product between inputs and weights, and to update the weights during training. 
            They are also used in other linear algebra operations such as matrix factorization and eigenvalue decomposition. This paper provides some very interesting examples of this concepts I never would have thought to be possible.`,
            category:"WHITEPAPER",
        },
        {
            name:"Sad Face",
            link:"https://google.com",
            style:"col-span-1",
            description:"No blog posts yet... soon though!",
            category:"BLOG",
            empty:true
        }
    ]

    state:PostState={
        PostType : "ANY",
        SearchField : "EMPTY123445!",
        NoResults : true
    };

    public updateSearch(e:any): void {
        e.preventDefault();

        if(e.target.value === ""){
            this.setState({
                PostType: "ANY",
                SearchField: "EMPTY12345!"
            })
        }else{
            this.setState({
                PostType: "WAIT",
                SearchField: e.target.value
            })
        }
        
        return;
    }

    found : boolean = false;
    render() {
        const { PostType, SearchField } = this.state;
        return (
            <>
                <div className="mb-40" style={{ backgroundColor: "#171717" , minHeight: "90%"}}>
                        <div className="cooltitle">
                            <h1>Neat stuff I find super interesting</h1>
                        </div>
                </div>
                <div className="flex flex-row flex-wrap m-auto justify-center gap-6 items-center p-6 lg:w-1/2 md:2/3 sm: 3/4" style = {{ backgroundColor:"white", borderRadius:"7px"}}>
                    <button className="stuffbutton" onClick={()=>{this.setState({PostType:"ARTICLE"})}}>Articles</button>
                    <button className="stuffbutton" onClick={()=>{this.setState({PostType:"WHITEPAPER"})}}>WhitePapers</button>
                    <button className="stuffbutton" onClick={()=>{this.setState({PostType:"BLOG"})}}>Blog Posts</button>
                    {/*<form className="coolsearch">
                        <input type = "text" className = "coolsearchfield" placeholder="Search cool things..." onChange = {(e) => this.updateSearch(e)}></input>
                        <button type = "button" className="stuffbutton" >
                            Search
                        </button>
                    </form>*/}
                </div>
                <br></br><br></br>
                <div className="grid grid-row grid-row-wrap m-auto justify-items-center items-center p-6 align-center gap-20" style = {{width: "100%", borderRadius:"7px"}}>
                            {this.posts.map((post) =>{
                                if(post.category.toString() === PostType.toString() || PostType.toString() === "ANY" || post.name.toLowerCase().includes(SearchField.toString().toLowerCase())
                                    || post.category.toLowerCase().includes(SearchField.toString().toLowerCase()) || post.description.toLowerCase().includes(SearchField.toString().toLowerCase())){
                                    
                                    return(
                                        <CoolStuff_Row 
                                            name = {post.name} 
                                            link = {post.link}
                                            style = {post.style}
                                            description = {post.description}
                                            category = {post.category}
                                            empty = {post.empty}>
                                        </CoolStuff_Row>
                                    )
                                }
                                return<></>
                                })  
                            }   

                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </>
        )
    }

}
