//Check for weekend
var startHour = 21;
var workHours =8;

//This variable will be used by a timer to check if hour has passed
var timerReferenceDate =new Date();

var printDay = function(){
    var today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    var startWork = new Date(year, month+1,day );
    startWork.setHours(startHour,0,0);

    var containerEl = $(".container");
    // Show todays date in header in the format day, month, and date.
    var showDate = today.toLocaleString('default',{weekday: "long"})+', '
                    +today.toLocaleString('default', {month: 'long'})+' '
                    +today.getDate();
    var showCurrentDateEl = $("#currentDay");
    showCurrentDateEl.text(showDate);

    //Run the loop to print each hour of the working day. Use workHours as loop counter.
    for (var i = 0; i<= workHours ; i++)
    {   //Each row will display the hour in Am/PM format.
        var hourDisplay = startWork.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        var divRowEl = $("<div>").addClass("row");
        var divTimeEl = $("<div>").addClass("col-1 border border-left-0 border-dark").text(hourDisplay);

        //For each row a textarea is available to enter task for the hour.
        var divEventEl = $("<textArea>").addClass("col-10 border evnt  bg-secondary");
        divEventEl.attr("dat-date", startWork );

        //Save option available at each row. A save icon is used for the row.
        var divBtnEl =  $("<div>").addClass("col-1 border saveChanges rounded-left text-center bg-info text-white");
        var btnIconEl = $("<i>").addClass("fa fa-save fa-2x mt-4");
        divBtnEl.append(btnIconEl);
        divRowEl.append(divTimeEl, divEventEl, divBtnEl);

        //Add all dynamically created rows to main container.
        containerEl.append(divRowEl);
        
        //Move time ahead by 1 hour, to print next row.
        startWork.setHours(startWork.getHours()+1,0,0);             
    }   
    setColor();   
    populateTasks();     
}

var populateTasks = function(){
    var tasks = JSON.parse(localStorage.getItem("tasks"));    
    if(tasks)
    {
          $(tasks).each(function(i,obj){
            var textEl = $("textarea[dat-date='"+obj.dt+"']") ;
            if(textEl)
            {
                $(textEl).val(obj.txt);
            }               
        })
    }
}

var setColor = function(){
    $(".evnt").each(function(i, obj) {
       var eventDate= $(this).attr("dat-date");
       var dtEvent = new Date(eventDate);      

       var newDate = new Date();
       var day = newDate.getDate();
       var month = newDate.getMonth();
       var year = newDate.getFullYear();
       var hrs = newDate.getHours();

       var currentDate = new Date(year, month+1,day );
       currentDate.setHours(hrs,0,0);
        //console.log("event", eventDate);
        //console.log("current", currentDate);
        if(dtEvent < currentDate)
       {
           //console.log("setting to grey");
           $(this).removeClass("bg-danger");
           $(this).removeClass("bg-success");
           $(this).addClass("bg-secondary");
       }
       else if (dtEvent > currentDate)
       {
           //console.log("setting to green");
            $(this).removeClass("bg-danger");
            $(this).removeClass("bg-secondary");
            $(this).addClass("bg-success");
       }  
       else{
        //console.log("setting to red");
        $(this).removeClass("bg-secondary");
        $(this).removeClass("bg-success");
        $(this).addClass("bg-danger");
       }     
    }); 
}

var timer = setInterval(function(){
    //Paint the page only if the hour has passed. 
    //When page loads save a reference date. Keep updating it as hour passes.
    var currentDate = new Date();

    var currentHour = currentDate.getHours();
    var referHour = timerReferenceDate.getHours();

    var today = currentDate.getDate();
    var referDate = timerReferenceDate.getDate();
    //console.log("Running timer");
    if(today !=referDate )
    {
        printDay;
        timerReferenceDate = currentDate;
    }
    else if(currentHour != referHour)
    {
        //console.log("running color change")
        setColor();
        timerReferenceDate = currentDate;
    }   
} ,5000);

var saveRecord = function(event) {
    var taskText = $(this).siblings('textarea').val();
    var taskDate = $(this).siblings('textarea').attr("dat-date");
    var taskObj = {
        txt : taskText,
        dt : taskDate
    };

    //To handle the case where a user deletes a previously saved note. 
    //The following code runs without checking if user entered a text.
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if(!tasks)
    {
        tasks=[];
    }

    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));   
}

var saveRecord = function(event) {
    var taskText = $(this).siblings('textarea').val();
    var taskDate = $(this).siblings('textarea').attr("dat-date");
    var taskObj = {
        txt : taskText,
        dt : taskDate
    };

    //To handle the case where a user deletes a previously saved note. 
    //The following code runs without checking if user entered a text.
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if(!tasks)
    {
        tasks=[];
    }

    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));   
}

printDay();
$(".container").on("click",".saveChanges",saveRecord);