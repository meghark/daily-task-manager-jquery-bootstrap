
var startHour = 9;
var endHour = 17;
var workHours =8;

var today = new Date();
console.log(today);
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
var startWork = new Date(year, month+1,day );
startWork.setHours(9,0,0);

var timerReferenceDate =new Date();

var printDay = function(){
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
        var divEventEl = $("<textArea>").addClass("col-10 border evnt list-group-item-secondary");
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
}

printDay();