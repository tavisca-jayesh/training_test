//creating anonymous function so that the widget does not interfere with other elements
(function () {
    //locally loading the jquery
    var jQuery;
    if (window.jQuery === undefined) {
        //boot-strap css
        var link_tag = document.createElement('link');
        link_tag.setAttribute("rel", "stylesheet");
        link_tag.setAttribute("href", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css");
        document.getElementsByTagName("head")[0].appendChild(link_tag);

        //jquery and boot-strap js
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js");


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
        (document.getElementsByTagName("head") || document.documentElement)[0].appendChild(script_tag);
    }
    else {
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        jQuery = window.jQuery;
        var script_tag_2 = document.createElement('script');
        script_tag_2.setAttribute("type", "text/javascript");
        script_tag_2.setAttribute("src", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js");
        document.getElementsByTagName("head")[0].appendChild(script_tag_2);
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {
            //default stock exchange
            var stockExchangeName = "Nifty";

            var initTabContent = function (stockExchangeName) {
                //Header
                var headerDiv = document.createElement('div');
                headerDiv.setAttribute("Id", "HeaderDiv");
                headerDiv.setAttribute("Class", "HeaderDiv");
                mainDiv.appendChild(headerDiv);
                headerDiv.innerHTML = "initValue";//stock exchange name

                var bodyDiv = document.createElement('div');
                bodyDiv.setAttribute("Id", "BodyDiv");
                bodyDiv.setAttribute("Class", "BodyDiv");
                mainDiv.appendChild(bodyDiv);

                // Low and High Value
                var lowSpan = document.createElement('div');
                lowSpan.setAttribute("Id", "LowSpan");
                mainDiv.appendChild(lowSpan);
                lowSpan.innerHTML = "initValue";//"Low value from API";

                var highSpan = document.createElement('div');
                highSpan.setAttribute("Id", "HighSpan");
                mainDiv.appendChild(highSpan);
                highSpan.innerHTML = "initValue";//"High value from API";

                //change and % change
                var changeVal = document.createElement('div');
                changeVal.setAttribute("Id", "ChangeValue");
                changeVal.setAttribute("Class", "ChangeValue");
                mainDiv.appendChild(changeVal);
                changeVal.innerHTML = "initValue";//"The Changed Value from API";

                var percentChange = document.createElement('div');
                percentChange.setAttribute("Id", "PercentValue");
                percentChange.setAttribute("Class", "PercentValue");
                mainDiv.appendChild(percentChange);
                percentChange.innerHTML = "initValue";//"The percentage Changed Value from API";

                stockExchangeValues(stockExchangeName);
            }

            var renderTabContent = function (stockExchangeValues) {
                var tab_content = document.getElementById("tab_content");
                tab_content.innerHTML = stockExchangeValues[1];
                //Header
                var headerDiv = document.getElementById("HeaderDiv");
                headerDiv.innerHTML = "Stock Exchange Name : " + stockExchangeValues[1];//stock exchange name
                //Current Value
                var bodyDiv = document.getElementById("BodyDiv");
                bodyDiv.innerHTML = "Stock Exchange Value : " + stockExchangeValues[2];//Stock Exchange Value
                // Low and High Value
                var lowSpan = document.getElementById("LowSpan");
                lowSpan.innerHTML = "Lowest Value Today : " + stockExchangeValues[7];//"Low value from API";
                lowSpan.style.color = "red";
                var highSpan = document.getElementById("HighSpan");
                highSpan.innerHTML = "Highest Value Today : " + stockExchangeValues[6];//"High value from API";
                highSpan.style.color = "green";
                //change and % change
                var changeVal = document.getElementById("ChangeValue");
                changeVal.innerHTML = "Change In Value : " + stockExchangeValues[3];//"The Changed Value from API";
                var percentChange = document.getElementById("PercentValue");
                percentChange.innerHTML = "Percentage Value : " + stockExchangeValues[4];//"The percentage Changed Value from API";
                //Set Color for Direction
                if (stockExchangeValues[5] >= 0) {
                    changeVal.style.color = "green";
                    percentChange.style.color = "green";
                }
                else {
                    changeVal.style.color = "red";
                    percentChange.style.color = "red";
                }
            }

            var stockExchangeValues = function (stockExchangeName) {
                var status = $.getJSON("http://training.appyoda.io/api/stock/" + stockExchangeName, function (jsonData) {
                    var iterator = 0;
                    var APIValueList = [];
                    $.each(jsonData, function (itr, value) {
                        APIValueList[iterator] = value;
                        iterator++;
                    })
                    renderTabContent(APIValueList);
                });
            }

            //supported stock exchanges
            var stockExngList = ["sensex", "cac", "dowjones", "ftse", "nasdaq", "nifty"];
            //main division
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute("Id", "stockExchange");
            mainDiv.setAttribute("Class", "outerDiv");
            document.getElementsByTagName("body")[0].appendChild(mainDiv);

            //create nav bar
            var navTabs = document.createElement('ul');
            navTabs.setAttribute("class", "nav nav-tabs");
            mainDiv.appendChild(navTabs);
            var length = stockExngList.length;
            while (length) {
                var listElement = document.createElement('li');
                navTabs.appendChild(listElement);
                var anchorElement = document.createElement('a');
                listElement.appendChild(anchorElement);
                anchorElement.setAttribute("href", "#" + stockExngList[stockExngList.length - length]);
                anchorElement.setAttribute("Id", stockExngList[stockExngList.length - length]);
                anchorElement.innerHTML = stockExngList[stockExngList.length - length];
                length = length - 1;
            }
            listElement.setAttribute("class", "active");

            //Tab contents
            var tabContent = document.createElement('div');
            tabContent.setAttribute("class", "tab-content");
            tabContent.setAttribute("Id", "tab_content");
            mainDiv.appendChild(tabContent);
            var length = stockExngList.length;
            while (length) {
                var stockTab = document.createElement('div');
                tabContent.appendChild(stockTab);
                stockTab.setAttribute("Id", stockExngList[stockExngList.length - length]);
                stockTab.setAttribute("class", "tab-pane fade");
                var content = document.createElement("h3");
                content.innerHTML = stockExngList[stockExngList.length - length];
                stockTab.appendChild(content);
                length = length - 1;
            }
            stockTab.setAttribute("class", "tab-pane fade in active");


            //initialize the Widget
            initTabContent(stockExchangeName);
            //show function here
            $(".nav-tabs a").click(function () {
                console.log(this); //delete this line later
                $(this).tab('show');
                var tabName = this.toString();
                var quotePositionStart = tabName.indexOf('#', 0);
                var tabName = tabName.substring(quotePositionStart + 1, tabName.length);
                console.log(tabName);
                stockExchangeValues(tabName);
            });
        });

    }
})();