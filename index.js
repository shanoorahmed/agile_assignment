
fetch('project.json')
.then((res) => res.json())
.then((data) => {
    document.getElementById("task-title").innerText = data.tasks[0].task_title;
    let titleList = document.getElementById("sidebar-title-list");
    titleList.innerHTML = `<li id="sidebar-task-title">${data.tasks[0].task_title}</li><hr>
                            <ul id="sidebar-task-list"></ul>`
    for(let i=0;i<data.tasks[0].assets.length;i++) {
        let asset = data.tasks[0].assets[i];

        // SIDEBAR
        let list = document.getElementById("sidebar-task-list");
        list.innerHTML += `<li>${asset.asset_title}</li><hr>`

        // MAIN CONTENT
        let mainDiv = document.getElementById("expandable-cards");
        let newAsset = document.createElement("div");
        newAsset.classList.add("asset");
        mainDiv.appendChild(newAsset);

        let heading = document.createElement("div");
        heading.classList.add("asset-heading");
        heading.innerHTML = `<p data-bs-toggle="collapse" href="#collapseExample${i}" role="button" aria-expanded="false" aria-controls="collapseExample">
                                ${asset.asset_title}
                            </p>`
        newAsset.appendChild(heading);

        let desc = document.createElement("div");
        desc.classList.add("collapse");
        desc.setAttribute("id", `collapseExample${i}`);
        desc.setAttribute("style", "margin: .5rem")

        if(asset.display_asset_url != null && asset.display_asset_url.length > 0) {
            let element = document.createElement("iframe");
            element.setAttribute("src", `${asset.display_asset_url}`);
            desc.appendChild(element);
        }
        if(asset.display_asset_image != null && asset.display_asset_image.length > 0) {
            let element = document.createElement("img");
            element.setAttribute("src", `${asset.display_asset_image}`);
            desc.appendChild(element);
        }
        if(asset.display_asset_video != null && asset.display_asset_video.length > 0) {
            let element = document.createElement("iframe");
            element.setAttribute("src", `${asset.display_asset_video}`);
            desc.appendChild(element);
        }
        if(asset.display_asset_docs != null && asset.display_asset_docs.length > 0) {
            let element = document.createElement("embed");
            element.setAttribute("src", `${asset.display_asset_docs}`);
            desc.appendChild(element);
        }

        let des = document.createElement("p");
        des.innerHTML = asset.asset_description;
        desc.appendChild(des);
        newAsset.appendChild(desc);
    }
})
.catch((err) => {
    console.log(err);
});

document.getElementById("sidebar-toggle-btn").addEventListener("click",function() {
    document.getElementById("sidebar").classList.toggle("active");
});