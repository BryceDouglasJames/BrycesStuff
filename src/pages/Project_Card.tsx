import React from 'react'

type card_content = {
  title: string
  description: string
  link: string
  photo: string
  technologies?:string[]
  other_links?:string[]
  other_names?:string[]
}




export class Project_Card extends React.Component<card_content>{
  goToLiveDemo = (e: any, _other_link: string): void => {
    e.preventDefault();
    if(_other_link === ""){
      window.open(this.props.link);
    }else{
      window.open(_other_link);
    }
    console.log(e);
  }

  render(): React.ReactNode {
    return(
      <>
        <div className="flex items-stretch justify-center">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{this.props.title}</h5>
            <img className="m-auto" src= {this.props.photo} alt="Broken..."></img>
            <br></br>
            <p className="text-gray-700 text-base mb-4">
              {this.props.description}
            </p>
            <div className="m-auto p-3 text-center justify-evenly z-10" style={{ color: "black" }}>
                <h2>Made using:</h2>
                <ul className="flex flex-wrap items-center p-2">
                    {this.props.technologies?.map((val) => {
                        return <span className="underline m-auto p-1 items-center" style={{
                            overflow: "break-word", wordWrap: "break-word", hyphens: "auto", textDecorationColor: "fuchsia", textUnderlineOffset: "5px"
                        }}>&nbsp;&nbsp;{val}&nbsp;&nbsp;</span>
                    })}
                </ul>
            </div>
            {this.props.other_links ?
              <>
                <p className="text-gray-700 text-base mb-4">
                  Here are some other links in association to this project:
                </p>
                <div className="flex gap-10 items-center p-2" style = {{justifyContent:"center"}}>
                  {this.props.other_links?.map((link, index) => {
                    return(
                      <>
                        <button type="button" style = {{justifyContent:"center"}} className="flex inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e)=>{this.goToLiveDemo(e, link)}}>{this.props.other_names?.at(index)}</button>
                      </>
                    )
                  })}
                </div>
              </>
              :
              <></>
            }
            <div className='align-bottom'>
            <button type="button" className="inline-block align-bottom  px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e)=>{this.goToLiveDemo(e, "")}}>Take a looksie</button>
            </div>
           
          </div>
        </div>
      </>
    )
  }
}