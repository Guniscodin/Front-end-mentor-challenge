const box = document.querySelectorAll("input[type=radio]");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".btn");
const notification = document.querySelector("#popup");
const firstName = document.querySelector("#firstname");
const email = document.querySelector("#email");
const lastname = document.querySelector("#lastname");
const msgArea = document.querySelector(".msg-area");
const allInputs = document.querySelectorAll("input[type=text], textarea, input[type=radio]");
const error = document.querySelectorAll(".error-msg");
const errorTextarea = document.querySelector(".text-area-error");
const queryError = document.querySelector(".query-error");
const radios = document.querySelectorAll("input[name=query]");
const checkbox = document.querySelector("#term");
const main = document.querySelector(".main");

// Intersection Observer for animation
let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.add("visiable"));
}, { threshold: 0 });
observer.observe(main);

// Radio validation
function validateradio() {
    let raido = [...radios].some(r => r.checked);
    queryError.classList.toggle("show-error", !raido);
    queryError.classList.toggle("hide-error", raido);
}

// Input focus events
allInputs.forEach(input => {
    input.addEventListener("focus", () => {
        allInputs.forEach(i => i.classList.remove("forredline"));
        error.forEach(er => {
            let div = er.parentElement.querySelector("input");
            if (div) {
                div.addEventListener("click", () => {
                    er.classList.remove("show-error");
                    er.classList.add("hide-error");
                });
            }
        });
        msgArea.classList.remove("forredline");
    });
});

// Textarea focus
msgArea.addEventListener("focus", () => {
    msgArea.classList.remove("forredline");
    errorTextarea.classList.remove("show-error");
    errorTextarea.classList.add("hide-error");
});

// Prevent default form submit
form.addEventListener("submit", e => e.preventDefault());

// Submit button click
submitBtn.addEventListener("click", () => {
    let raidoes = [...radios].some(r => r.checked);

    if (msgArea.value && email.value && firstName.value && lastname.value && checkbox.checked && raidoes) {
        // Show notification
        notification.classList.remove("hide");
        notification.classList.add("pop-up");
        setTimeout(() => {
            notification.classList.remove("pop-up");
            notification.classList.add("hide");
        }, 2000);

        // Reset all inputs
        allInputs.forEach(int => int.value = "");
        checkbox.checked = false;
        box.forEach(eachbx => {
            eachbx.checked = false;
            eachbx.parentElement.style.backgroundColor = "white";
            let er = document.querySelector(`.error-msg[data-for=${eachbx.id}]`);
            er?.classList.remove("show-error");
        });
    } else {
        // Highlight empty fields
        document.querySelectorAll("input:not([type=checkbox]):not([type=radio])").forEach(int => {
            if (!int.value) int.classList.add("forredline");
        });

        allInputs.forEach(int => {
            let datafor = document.querySelector(`.error-msg[data-for=${int.id}]`);
            if (!int.value) {
                datafor?.classList.remove("hide-error");
                datafor?.classList.add("show-error");
            }
        });

        // Checkbox error
        let errorCheckbox = document.querySelector(`.error-msg[data-for=${checkbox.id}]`);
        if (!checkbox.checked) {
            errorCheckbox?.classList.remove("hide-error");
            errorCheckbox?.classList.add("show-error");
        } else {
            errorCheckbox?.classList.add("hide-error");
            errorCheckbox?.classList.remove("show-error");
        }

        // Message area highlight
        if (!msgArea.value) msgArea.classList.add("forredline");
    }

    validateradio();
});

// Radio change event for background
box.forEach(eachbox => {
    eachbox.addEventListener("change", () => {
        box.forEach(r => {
            queryError.classList.remove("show-error");
            queryError.classList.add("hide-error");
            r.parentElement.style.backgroundColor = r.checked ? "hsla(169, 84%, 24%, 0.253)" : "white";
        });
    });
});

