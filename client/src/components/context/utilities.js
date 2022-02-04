    /**
     * Load all scripts.
     * @param {url} script url
     */
    const addScripts = (scripts)=> {
        [...scripts].forEach(scirpt=>{
            let tag = document.createElement('script')
            tag.async = true
            tag.src = scirpt
            document.body.appendChild(tag);
        })
        
    }

export  {addScripts}