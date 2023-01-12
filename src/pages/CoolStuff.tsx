/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-pascal-case */
import react from "react";
import "./CoolStuff.css"
import { CoolStuff_Row } from "./CoolStuff_Row";
import MAYHEM_ROW from './Mayhem_Title.svg'

type PostState = {
    PostType: String
    SearchField: String
}

export class CoolStuff extends react.Component<any, PostState>{
    
    private posts = [
        {
            name:"Conceptual Mayhem",
            link:"https://theworldkeepsstaringat.me",
            style:"col-span-1",
            banner:"Mayhem_Title.svg",
            description:"Magnis dis parturient montes nascetur ridiculus mus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Integer enim neque volutpat ac. A iaculis at erat pellentesque adipiscing commodo elit at. Nibh praesent tristique magna sit amet purus. Tellus in metus vulputate eu. Pretium lectus quam id leo in vitae turpis massa. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Eget mauris pharetra et ultrices neque ornare aenean.",
            category:"ARTICLE",
        },
        {
            name:"Test1",
            link:"https://google.com",
            style:"col-span-1",
            description:"Magnis dis parturient montes nascetur ridiculus mus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Integer enim neque volutpat ac. A iaculis at erat pellentesque adipiscing commodo elit at. Nibh praesent tristique magna sit amet purus. Tellus in metus vulputate eu. Pretium lectus quam id leo in vitae turpis massa. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Eget mauris pharetra et ultrices neque ornare aenean.",
            category:"WHITEPAPER",
        },
        {
            name:"Test2",
            link:"https://google.com",
            style:"col-span-1",
            description:"Magnis dis parturient montes nascetur ridiculus mus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Integer enim neque volutpat ac. A iaculis at erat pellentesque adipiscing commodo elit at. Nibh praesent tristique magna sit amet purus. Tellus in metus vulputate eu. Pretium lectus quam id leo in vitae turpis massa. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Eget mauris pharetra et ultrices neque ornare aenean.",
            category:"BLOG",
        },
        {
            name:"Test3",
            link:"https://google.com",
            style:"col-span-1",
            description:"Magnis dis parturient montes nascetur ridiculus mus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Integer enim neque volutpat ac. A iaculis at erat pellentesque adipiscing commodo elit at. Nibh praesent tristique magna sit amet purus. Tellus in metus vulputate eu. Pretium lectus quam id leo in vitae turpis massa. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Eget mauris pharetra et ultrices neque ornare aenean.",
            category:"ARTICLE",
        }
    ]

    state:PostState={
        PostType : "ANY",
        SearchField : "EMPTY123445!"
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

    render() {
        const { PostType, SearchField } = this.state;
        return (
            <>
                <div className="mb-40" style={{ backgroundColor: "#171717" , minHeight: "90%"}}>
                        <div className="cooltitle">
                            <h1>Neat stuff found along my way</h1>
                        </div>
                </div>
                <div className="flex flex-row flex-wrap m-auto justify-center gap-6 items-center p-6 lg:w-1/2 md:2/3 sm: 3/4" style = {{ backgroundColor:"white", borderRadius:"7px"}}>
                    <button className="stuffbutton" onClick={()=>{console.log(PostType); this.setState({PostType:"ARTICLE"})}}>Articles</button>
                    <button className="stuffbutton" onClick={()=>{this.setState({PostType:"WHITEPAPER"})}}>WhitePapers</button>
                    <button className="stuffbutton" onClick={()=>{this.setState({PostType:"BLOG"})}}>Blog Posts</button>
                    <form className="coolsearch">
                        <input type = "text" className = "coolsearchfield" placeholder="Search cool things..." onChange = {(e) => this.updateSearch(e)}></input>
                        <button type = "button" className="stuffbutton" >
                            Search
                        </button>
                    </form>
                </div>
                <br></br><br></br>
                <div className="grid grid-row grid-row-wrap m-auto justify-items-center items-center p-6 align-center gap-20" style = {{width: "100%", borderRadius:"7px"}}>
                            {this.posts.map((post) =>{
                                if(post.category.toString() === PostType.toString() || PostType.toString() === "ANY" || post.name.toLowerCase().includes(SearchField.toString().toLowerCase())
                                    || post.category.toLowerCase().includes(SearchField.toString().toLowerCase()) || post.description.toLowerCase().includes(SearchField.toString().toLowerCase())){
                                    return <><CoolStuff_Row 
                                        name = {post.name} 
                                        link = {post.link}
                                        style = {post.style}
                                        description = {post.description}
                                        category = {post.category}>
                                    </CoolStuff_Row>
                                    </>
                                }
                                return <><br></br><br></br></>
                                })
                                
                            }      
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </>
        )
    }

}
