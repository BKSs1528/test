import db from "./db.json"

const Popup =()=>{
    return(
        <>
            <div className="main-popup">
                {
                    db.map((data)=>{
                        return(
                            <div className="conatiner-popup" style={{'borderRadius':"5px"}}>
                                <div>
                                    <img src={data.thumbnail.small}/>
                                </div>
                                <div>
                                    <h3>{data.title}</h3>
                                </div>
                                <div>
                                    <p>{data.content}</p>
                                </div>
                                <div>
                                    <span><img style={{width:"50%"}} src={data.author.avatar}/></span>
                                    <span>{data.author.name}-{data.author.role}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Popup;