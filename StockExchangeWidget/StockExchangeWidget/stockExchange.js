//creating anonymous function so that the widget does not interfere with other elements
(function () {
    //locally loading the jquery
    var jQuery;
    var bootStrap;
    if (window.jQuery === undefined) {
        //boot-strap css
        var link_tag = document.createElement('link');
        link_tag.setAttribute("rel", "stylesheet");
        link_tag.setAttribute("href", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css");

        //jquery and boot-strap js
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
        

        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE is < IE 9
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        }
        else {
            // Other browsers
            script_tag.onload = scriptLoadHandler;
        }
        // if head does not exist, default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }
    else {
        jQuery = window.jQuery;
        var script_tag_2 = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js");
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        jQuery = window.jQuery.noConflict(true);
        var script_tag_2 = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js");
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {

            var stockExchangeName = "nifty";//select from drop down or nav tabs
            $.getJSON(
                "http://training.appyoda.io/api/stock/" + stockExchangeName,
                null,
                function (jsonData) {
                    JSON = jsonData;
                    //supported stock exchanges
                    var stockExngList = ["sensex", "nifty", "cac", "dowjones", "ftse", "nasdaq", "nikkie225"];
                    //main division
                    var mainDiv = document.createElement('div');
                    mainDiv.setAttribute("Id", "stockExchange");
                    mainDiv.setAttribute("Class", "outerDiv");
                    document.getElementsByTagName("body")[0].appendChild(mainDiv);
                    
                    var navTabs = document.createElement('ul');
                    navTabs.setAttribute("class", "nav nav-tabs");
                    mainDiv.appendChild(navTabs);
                    var length = stockExngList.length;
                    while(length){
                        var listElement = document.createElement('li');
                        navTabs.appendChild(listElement);
                        var anchorElement = document.createElement('a');
                        listElement.appendChild(anchorElement);
                        anchorElement.setAttribute("href", "#" + stockExngList[stockExngList.length - length]);
                        anchorElement.innerHTML = stockExngList[stockExngList.length - length];
                        length = length-1;
                    }
                    listElement.setAttribute("class", "active");

                    //Tab contents
                    var tabContent = document.createElement('div');
                    tabContent.setAttribute("class","tab-content");

                    var length = stockExngList.length;
                    while (length) {
                        var stockTab = document.createElement('div');
                        stockTab.appendChild(tabContent);
                        stockTab.setAttribute("Id", stockExngList[stockExngList.length - length]);
                        stockTab.setAttribute("class", "tab-pane fade");
                        var content = document.createElement("h3");
                        content.innerHTML = stockExngList[stockExngList.length - length];
                        //var anchorElement = document.createElement('a');
                        //listElement.appendChild(anchorElement);
                        //anchorElement.setAttribute("href", "#" + stockExngList[stockExngList.length - length]);
                        //anchorElement.innerHTML = stockExngList[stockExngList.length - length];
                        length = length - 1;
                    }
                    stockTab.setAttribute("class", "tab-pane fade in active");

                    //show function here
                    $(".nav-tabs a").click(function () {
                        console.log(this);
                        $(this).tab('show');
                    });

                    //Header
                    var headerDiv = document.createElement('div');
                    headerDiv.setAttribute("Id", "HeaderDiv");
                    headerDiv.setAttribute("Class", "HeaderDiv");
                    mainDiv.appendChild(headerDiv);
                    headerDiv.innerHTML = JSON.name;
                    //Current Value
                    var bodyDiv = document.createElement('div');
                    bodyDiv.setAttribute("Id", "BodyDiv");
                    bodyDiv.setAttribute("Class", "BodyDiv");
                    mainDiv.appendChild(bodyDiv);
                    bodyDiv.innerHTML = JSON.lastprice;//"Here Goes Current Stock Exchange Value from API"
                    var br = document.createElement('br');
                    // Low and High Value
                    var lowSpan = document.createElement('p');
                    lowSpan.appendChild(br);
                    lowSpan.innerHTML = JSON.low//"Low value from API";
                    bodyDiv.appendChild(lowSpan);
                    var br = document.createElement('br');
                    var highSpan = document.createElement('p');
                    highSpan.innerHTML = JSON.high//"High value from API";
                    highSpan.appendChild(br);
                    bodyDiv.appendChild(highSpan);
                    var br = document.createElement('br');
                    //change and % change
                    var change = document.createElement('div');
                    change.setAttribute("Id", "changeValue");
                    change.setAttribute("Class", "ChangeValue");
                    change.innerHTML = JSON.change//"The Changed Value from API";
                    bodyDiv.appendChild(change);

                    var percentChange = document.createElement('p');
                    percentChange.setAttribute("Id", "percentValue");
                    percentChange.setAttribute("Class", "percentValue");
                    percentChange.innerHTML = JSON.percent_change//"The percentage Changed Value from API";
                    change.appendChild(percentChange);

                    var direction = -1;//direction value from api
                    if (JSON.direction >= 0)
                        change.style.color = "green";
                    else
                        change.style.color = "red";

                });
        });
    }
})();