//javascript

let views = {
    intro: document.querySelector("#intro"),
    fireInfo: document.querySelector("#fireInfo"),
};
if (window.location.hash) {
	displayView(window.location.hash);
} else {
	displayView("intro");
}
document.body.addEventListener("click", function (e) {
	if (e.target.classList.contains("introLink")) {
		displayView("intro");
	} else if (e.target.classList.contains("fireInfoLink")) {
		displayView("fireInfo");
	}
});
async function displayView(view) {
	view = view.replace("#", "");
	console.log(`${view}`);

	// hide all others
	for (var key in views) {
		if (views.hasOwnProperty(key)) {
			views[key].style.display = "none";
		}
	}
	views[view].style.display = "block";
	window.location.hash = `${view}`;
}




async function getFires() {
    try {
        const response = await fetch('https://incidents.fire.ca.gov/umbraco/api/IncidentApi/GeoJsonList?inactive=true');
        const firesData = await response.json();
        handleFires(firesData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function handleFires(firesData) {
    console.log(firesData);

    firesData.features.forEach(fire => {
        const fireInfo = getInfo(fire.properties);
        console.log('Fire Info:', fireInfo)
    });
}

function getInfo(properties) {
    const fireName = properties.name;
    const location = properties.location;
    const county = properties.county;
    const link = properties.url;
    const acres = properties.acresBurned;
    const type = properties.datatype;
    const begin = properties.started;
    const end = properties.extinguishedDateOnly;

    return {
        fireName,
        location,
        county,
        link,
        acres,
        type,
        begin,
        end,
    }
}
getFires();