const iframeHtml = function (script) {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>"onlineEdit"</title>
                <script src="../utils/proxyConsloe.js"></script>
            </head>
            <body>   
            <script>
               // try {
               //  
               // } catch(e) {
               //     console.error(e)
               // }
        try {
           ${script}
        } catch (err) {
          console.error(err)
        }
               
            </script>
            </body>
            </html>
            `
}

export {
    iframeHtml
}
