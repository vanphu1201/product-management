// change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            const statusChange = statusCurrent == "active" ? "inactive" : "active"

            const action = path + `/${statusChange}/${id}?_method=PATCH`
            formChangeStatus.action = action
            formChangeStatus.submit()

        })
    })
}

// end change status


// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
        inputsId.forEach(input => {
            input.checked = true
        })
        } else {
        inputsId.forEach(input => {
            input.checked = false
        })

        }
        })


    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true
            } else {
                inputCheckAll.checked = false
            }
        })
    })
}
//end checkbox multi


// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")
        const typeChange = e.target.elements.type.value

        if (typeChange == "delete-all") {
            const isconfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này")

            if (!isconfirm) {
                return
            }
        }

        if (inputsChecked.length) {
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            inputsChecked.forEach(input => {
                const id = input.value
                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    ids.push(`${id}-${position}`)
                } else {
                    ids.push(id)
                }

            inputIds.value = ids.join(", ")
            formChangeMulti.submit()
            })
        } else {
            alert("Vui lòng click ít nhất 1 sản phẩm!")
        }

    })
}
// end form change multi

// delete item
const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete.length) {
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")

    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConform = confirm("Bạn có muốn xóa sản phẩm này không?")
            if (isConform) {
                const id = button.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formDeleteItem.action = action
                formDeleteItem.submit()
            }

        })
    })
}
// end delete item



