import React from "react";

interface ISearch {
  variant : "primary" | "secondary",
  text : string
}

function Search({variant , text} : ISearch) {

  if(variant == "primary"){
    return(
      <input
      className="bg-[rgba(255,255,255,0.06)] border-1 text-white border-white px-9 py-4 w-full rounded-2xl mt-6 placeholder:text-white placeholder:opacity-40 focus:outline-0"
      placeholder={text}
      type="text"
    />
    )
  }
  else if(variant =="secondary"){
    return(
      <input
    className="bg-[rgba(255,255,255,0.06)] border-1 text-[#717171] border-[#E3E3E3] px-10 py-4 w-full rounded-2xl mt-6 placeholder:text-[#717171] placeholder:opacity-60 focus:outline-0 placeholder:text-xs"
      placeholder={text}
      type="text"
    />
    )
  }

}

export default Search;
