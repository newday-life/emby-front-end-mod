(function () {
    'use strict';
    var sort = {
        movies: {
            videos: { sortby: "ProductionYear,PremiereDate,SortName", sortorder: "Descending" },
            collections: { sortby: "DateCreated,SortName", sortorder: "Descending" },
            folders: { sortby: "SortName", sortorder: "Ascending" }
        },
        tvshows: {
            series: { sortby: "ProductionYear,PremiereDate,SortName", sortorder: "Descending" },
            videos: { sortby: "ProductionYear,PremiereDate,SortName", sortorder: "Descending" },
            collections: { sortby: "DateCreated,SortName", sortorder: "Descending" },
            folders: { sortby: "SortName", sortorder: "Ascending" }
        },
        homevideos: {
            videos: { sortby: "DateCreated,SortName", sortorder: "Descending" },
            photos: { sortby: "DateCreated,SortName", sortorder: "Descending" },
            folders: { sortby: "SortName", sortorder: "Ascending" }
        },
        music: {
            albums: { sortby: "ProductionYear,PremiereDate,SortName", sortorder: "Descending" },
            albumartists: { sortby: "SortName", sortorder: "Ascending" },
            artists: { sortby: "SortName", sortorder: "Ascending" },
            composers: { sortby: "SortName", sortorder: "Ascending" },
            songs: { sortby: "ProductionYear,PremiereDate,SortName", sortorder: "Descending" },
            folders: { sortby: "SortName", sortorder: "Ascending" }
        }
    };
    const mutation = new MutationObserver(function () {
        if (window.ApiClient?.connected) {
            setItemSort();
            mutation.disconnect();
        }
    });
    mutation.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true,
    });
    async function setItemSort() {
        let libdata = await ApiClient.getItems(ApiClient.getCurrentUserId());
        for (let item of libdata.Items) {
            let types = sort[item.CollectionType];
            if (types) {
                for (let key in types) {
                    let sortbyId = ApiClient.getCurrentUserId() + "-" + item.Id + "-1-" + key + "-sortby"
                        , sortorderId = ApiClient.getCurrentUserId() + "-" + item.Id + "-1-" + key + "-sortorder";
                    if (!localStorage.getItem(sortbyId)) {
                        localStorage.setItem(sortbyId, types[key].sortby);
                        localStorage.setItem(sortorderId, types[key].sortorder);
                    }
                }
            }
        }
    };
})()
