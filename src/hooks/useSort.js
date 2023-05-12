import { useState } from "react";

export default function useSort(setArr) {
    const sort = (field) => {

     
        setArr(  s=>  {
            let copy=[...s]
            
            copy.sort((a, b) => {
            return a[field] > b[field] ?1:a[field] == b[field]?0:-1
        }
        
        );
        return copy;
    })
    
    }
    return { sort }
}
