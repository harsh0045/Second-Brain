

import { BACKEND_URL } from "../../config";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { ShareIcon } from "../Icons/ShareIcon"

export function Card({ title, link, type, onDelete }) {
    const videoId = (type === "youtube") ? extractYouTubeVideoId(link) : null;
    const postId = (type === "linkedin") ? extractLinkedInPostId(link) : null;
    const handleShare = async () => {
        
        if (navigator.share) {
          try {
            await navigator.share({
              title: type,
              text: title,
              url: link, // Use the passed URL directly
            });
            console.log("Shared successfully!");
          } catch (error) {
            console.log("Error sharing:", error);
          }
        } else {
          alert("Sharing is not supported on this browser.");
        }
      };

    
    return (
        <div className="flex flex-col  h-80  bg-white  pt-0   rounded-md border shadow-md outline-slate-200 max-w-72 m-2">
            <div className="flex justify-between text-sm px-4  text-gray-500 bg-purple-200 rounded py-2">
                <div className="flex flex-col ">
                <span className="font-bold text-purple-600">{type.toUpperCase()}</span>
                  <span className="font-semibold  ">{title}</span>  
                    
                </div>
                <div className="flex items-center">
                   <div onClick={() => handleShare()} className="p-2 cursor-pointer rounded hover:bg-gray-200 transition-all duration-150">
                        <ShareIcon />
                    </div>
                    {onDelete  && <div className="cursor-pointer p-2 rounded hover:bg-gray-200 transition-all duration-150" onClick={onDelete}>
                        <DeleteIcon />
                    </div>
                    }

                </div>
            </div>

            {type === "youtube" && videoId ? (
                <>
                   <div className=" p-4 w-full ">
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
                    <div className="w-68 h-10 mt-8 flex justify-center items-center   mx-4  ">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 w-full py-2  text-white hover:bg-purple-500 rounded-md font-base text-center ">
                        Open in Youtube
                    </a>
                    </div>
                    
                </>
                
                

            ) : type === "youtube" && !videoId ? (
                <p>Invalid YouTube link</p>
            )
                : null}
            {type === "linkedin" && postId ? (
                <>
                   <div className=" px-4 pt-2 w-full overflow-y-auto ">
                    <iframe src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${postId}`}  
                    height="190"
                    width="100%" 
                    frameborder="0"
                     allowfullscreen 
                     title="Embedded-post"></iframe>
                    
                </div>
                <div className="w-68 h-10 mt-4 flex justify-center items-center   mx-4  ">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 w-full py-2  text-white hover:bg-purple-500 rounded-md font-base text-center ">
                        Open in LinkedIn
                    </a>
                </div>
                </>
                 

            ) : type === "linkedin" && !postId ? (
                <p>Invalid Linkedin link</p>
            )
                : null}
            {type === "twitter" && 
            <>
              <div className=" px-4 pt-2  overflow-y-auto ">
                <blockquote className="twitter-tweet ">
                    <a href={link.replace("x.com", "twitter.com")} />
                </blockquote>
                
             </div>
             <div className="w-68 h-10 mb-2 flex justify-center items-center   mx-4  ">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 w-full py-2  text-white hover:bg-purple-500 rounded-md font-base text-center ">
                        Open in Twitter
                    </a>
                </div>
            </>
            
            
            }
            {type === "docs" ? (
                <>
                    <div className=" px-4 pt-2 ">

                        <iframe
                            
                            src={`${link}?embedded=true`}
                            title="Google Docs"
                            height="190"
                            width="100%"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                        </div>
                        <div className="w-68 h-10 mt-4 flex justify-center items-center   mx-4  ">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 w-full py-2  text-white hover:bg-purple-500 rounded-md font-base text-center ">
                        Open in Google Docs
                    </a>
                </div>
                        
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

