window.onload = fetchNameDay;
let namedays;
function fetchNameDay() {
	let title = document.getElementById('title');
	fetch('https://api.abalin.net/today').then((res) => res.json()).then((data) => {
		namedays = data.data.namedays;
		$.ajax({
			url: 'http://ip-api.com/json',
			type: 'GET',
			success: function(json) {
				let cc = json.countryCode.toLowerCase();
                let nameDayName = namedays[cc];
                if(nameDayName == null){
                    nameDayName = namedays[us];
                }
                title.innerHTML =nameDayName;
			},
			error: function(err) {}
		});
	});
}
