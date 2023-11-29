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
    const fires = await fetch("https://incidents.fire.ca.gov/umbraco/api/IncidentApi/List?inactive=true");
    const firesData = await fires.json();
    console.log(firesData)
}

getFires()