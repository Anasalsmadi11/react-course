import { useEffect } from "react";

export function useKey(key,action){

    useEffect(() => {
        // vid: 157  whenever we need to deal with the outside world we need to use useEffect
        function callback(e) {
          if (e.code.toLowerCase() === key.toLowerCase()) {
            // console.log(`unmounted`)
            action();
          }
        }
        document.addEventListener("keydown", callback);
    
        return function () {

          document.removeEventListener("keydown", callback);
        }; 
      }, [action,key]);
}