window.onload = function() {
	try {
		const params = new URLSearchParams(window.location.search);
        let title = params.get("title");
        if(title != null){
            let titles = title.split("+");
            title = titles.join(" ");
            document.getElementById("title").innerHTML = title;
        }
        let date = params.get("iso"); // example "2020-06-26T17:2352" = "YearMonthDay+T+HoursMinutes"
        if(date != null){
            var countDownDate = new Date(date).getTime();
            var d = new Date();
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            document.getElementById("date").innerHTML = months[d.getMonth()] + " " + d.getDate() + ", "+d.getFullYear();
        }
        else{
            console.log(date)
		}        
}


		

		// Update the count down every 1 second
		var x = setInterval(function() {
			// Get today's date and time
			var now = new Date().getTime();

			// Find the distance between now and the count down date
			var distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// Display the result in the element with id="demo"
			document.getElementById('td').innerHTML = addZero(days);
			document.getElementById('th').innerHTML = addZero(hours);
			document.getElementById('tm').innerHTML = addZero(minutes);
			document.getElementById('ts').innerHTML = addZero(seconds);

			// If the count down is finished, write some text
			if (distance < 0) {
				clearInterval(x);
				document.getElementById('td').innerHTML = '00';
				document.getElementById('th').innerHTML = '00';
				document.getElementById('tm').innerHTML = '00';
				document.getElementById('ts').innerHTML = '00';
			}
		}, 1000);
	} catch (error) {
		console.log(error);
	}
};
function addZero(number) {
	if (number < 10) {
		return '0' + number;
	} else {
		return number;
	}
}
