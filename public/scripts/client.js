// FRONT END JS

const addTagBtn = document.getElementById("btn_new_tag");
const tagInput = document.getElementById("new_tag_name")

addTagBtn.onclick = function () {
//Loop to get all the selected labels
//get their ids
// []   
    axios.post("/sec/axios-post", {
        label: tagInput.value,
    })
    .then(dbRes => {
        const { id, label } = dbRes.data
        const tag = 
        `
        <option value="${id}">${label}</option>
        `;
        document.getElementById("tags").innerHTML += tag;
        

    })
    .catch(dbErr => console.log("error", dbErr))
}