

import { BACKEND_URL } from "../../config";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { ShareIcon } from "../Icons/ShareIcon"

export function Card({ title, link, type, onDelete }) {
    const videoId = (type === "youtube") ? extractYouTubeVideoId(link) : null;
    const postId = (type === "linkedin") ? extractLinkedInPostId(link) : null;
    return (
        <div className="flex flex-col  h-80  bg-white p-4 rounded-md border shadow-md outline-slate-200 max-w-72 ">
            <div className="flex justify-between text-sm text-gray-500 ">
                <div className="flex  items-center gap-2  ">
                    <div className="p-2 cursor-pointer rounded hover:bg-gray-200 transition-all duration-150">
                        <ShareIcon />
                    </div>
                    <span>{type}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>{title}</span>
                    <div className="cursor-pointer p-2 rounded hover:bg-gray-200 transition-all duration-150" onClick={onDelete}>
                        <DeleteIcon />
                    </div>

                </div>
            </div>

            {type === "youtube" && videoId ? (
                <>
                   <div className=" pt-4 w-full ">
                    <iframe
                        className="w-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                    </div>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white hover:bg-purple-500 rounded-md font-base px-4 py-2 mt-12 text-center">
                       Open in Youtube
                   </a>
                </>
                
                

            ) : type === "youtube" && !videoId ? (
                <p>Invalid YouTube link</p>
            )
                : null}
            {type === "linkedin" && postId ? (
                <>
                   <div className=" pt-4 w-full overflow-y-auto ">
                    <iframe src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${postId}`}  
                    height="190"
                    width="100%" 
                    frameborder="0"
                     allowfullscreen 
                     title="Embedded-post"></iframe>
                    
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white hover:bg-purple-500 rounded-md font-base px-4 py-2 mt-2 text-center">
                Open in LinkedIn
             </a>
                </>
                 

            ) : type === "linkedin" && !postId ? (
                <p>Invalid Linkedin link</p>
            )
                : null}
            {type === "twitter" && 
            <>
              <div className=" pt-4 w-full overflow-y-auto ">
                <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")} />
                </blockquote>
                
             </div>
             <a href={link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white hover:bg-purple-500 rounded-md font-base px-4 py-2 mt-2 text-center">
                    Open in Twitter
             </a>
            </>
            
            
            }
            {type === "docs" ? (
                <>
                    <div className=" pt-4 ">

                        <iframe
                            
                            src={`${link}?embedded=true`}
                            title="Google Docs"
                            height="190"
                            width="100%"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                        </div>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white hover:bg-purple-500 rounded-md font-base px-4 py-2 mt-2 text-center">
                            Open in Google Docs
                        </a>
                        
                    </>

                        ) : type === "docs" && !link ? (
                        <p>Invalid docs link</p>
                        )
                        : null}
               
        </div>
    )

}
function extractLinkedInPostId(url) {
    const match = url.match(/activity-(\d+)/);
    console.log(match);
    return match ? match[1] : null;
}

function extractYouTubeVideoId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}

