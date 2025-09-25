// Start button sattus
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            let status = button.getAttribute("button-status");
            console.log(status);

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });
};

//End button status


// formSearch
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        console.log(keyword);
        if (keyword) {
            url.searchParams.set("keyword", keyword);
            url.searchParams.delete("page");
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
};

// End formSearch


//button pagination

const buttonPagination = document.querySelectorAll("[button-paginaton]")
if (buttonPagination) {
    let url = new URL(window.location.href);

    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-paginaton")
            url.searchParams.set("page", page);
            window.location.href = url.href;

        })
    })
}



//button pagination


// show alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = document.querySelector("[close-alert]")

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}
// end show alert


// upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", e => {
        const [file] = uploadImageInput.files
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        };
    });
}
// end upload image


// sort
const sort =document.querySelector("[sort]");
if (sort) {
    let url = new URL(window.location.href);
    const sortSelect = document.querySelector("[sort-select]");
    const sortClear = document.querySelector("[sort-clear]");


    // sort select
    sortSelect.addEventListener("change", e => {
        const value = e.target.value;
        const [sortKey, sortValue] = value.split("-");
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        window.location.href = url.href;
    });

    // clear sort
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;

    });

    // add selected for options
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    const stringSort = `${sortKey}-${sortValue}`;
    
    const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`);
    optionSelected.selected = true;
}
// end sort