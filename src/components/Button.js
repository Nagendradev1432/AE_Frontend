import React from "react";

export default function Button({ text, decoration ,fn}) {

    if(!fn){
      return <button className={`${decoration}`}>{text}</button>;
    }else{
      return <button onClick={fn} className={`${decoration}`}>{text}</button>;
    }

 
    
}
