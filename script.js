function loadData() {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://aimtell.com/files/sites.json");
    xhr.responseType = 'json';

    xhr.onload = function() {

        const response = xhr.response;
        const context = {
            sites: response.sites
        };
        console.log(context);

        let theTemplateScript = document.getElementById("example-template").textContent;
        let theTemplate = Handlebars.compile(theTemplateScript);
        let theCompiledHtml = theTemplate(context);
        $('tbody').html(theCompiledHtml)

    };
    xhr.send();

}