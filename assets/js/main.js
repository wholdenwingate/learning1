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
function handleFires(firesData) {
    console.log(firesData);

    firesData.map(section => {
        console.log(section);
    });
}
async function getFires() {
    try {
        const response = await fetch('https://incidents.fire.ca.gov/umbraco/api/IncidentApi/List?inactive=true');
        const firesData = await response.json();
        handleFires(firesData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getInfo(names) {
    const fireName = names.name;
    const location = names.location;
    const county = names.county;
    const link = names.url;
    const acres = names.acresBurned;
    const type = names.datatype;
    const begin = names.started;
    const end = names.extinguishedDateOnly;

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