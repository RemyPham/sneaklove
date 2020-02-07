// FRONT END JS

const addTagBtn = document.getElementById("btn_new_tag");
const tagInput = document.getElementById("new_tag_name")

addTagBtn.onclick = function () {
//Loop to get all the selected labels
//get their ids
// []   
    axios.post("/sec/axios-post", {
        //this become the req.body for the back
        label: tagInput.value,
    })
    .then(dbRes => {
        console.log("HERE", dbRes)
        //dom manipulation to include that new label

    })
    .catch(dbErr => console.log("error", dbErr))
}