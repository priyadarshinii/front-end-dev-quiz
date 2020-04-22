const fetchBtn = document.querySelector(".container button");
const errorContainer = document.querySelector(".error");
fetchBtn.addEventListener('click', fetchPosts);

function sendHttpRequest(method, url, data) {

    const promise = new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';

        xhr.onload = function() {

            if(xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error("Something went wrong!"))
            }
        }

        xhr.onerror = function() {
            reject(new Error("Failed to send request!"))
        }

        xhr.send(JSON.stringify(data));
        
    });

    return promise;
}

async function fetchPosts () {

    try {
        errorContainer.textContent = "";
        const response = await sendHttpRequest("GET", "https://aimtell.com/files/sites.json");

        // This is the default context, which is passed to the template
        const context = {
            sites: response.sites
        };

        // Grab the template script
        let theTemplateScript = document.getElementById("example-template").textContent;
        // Compile the template
        let theTemplate = Handlebars.compile(theTemplateScript);

        // Pass our data to the template
        let theCompiledHtml = theTemplate(context);

        // Add the compiled html to the page
        document.getElementsByTagName('tbody')[0].innerHTML = theCompiledHtml;

    } catch(error) {
        errorContainer.textContent = error.message;
    }
    
}


