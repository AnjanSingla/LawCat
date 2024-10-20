function formatText(text) {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    formattedText = formattedText.replace(/\*([^*]+)\*/g, '<ul><li>$1</li></ul>');
    return formattedText;
}

let text = "Describe your problem...";
let typingElement = document.getElementById("typing");
let index = 0;
let isDeleting = false;

function type() {
    if (!isDeleting) {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        } else {
            isDeleting = true;
            setTimeout(type, 1000); // Pause before deleting
        }
    } else {
        if (index > 0) {
            typingElement.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(type, 100); // Deleting speed
        }
    }
    const element=document.getElementById("typing");
    element.style.height=0;
}
type();



fetch("/static/history.txt")
.then((res) => res.text())
.then((text) => {
    let array = text.split("$")
    for (var x of array) {
        if (x == "") break;
        var myarr = x.split("|");
        var outputText = formatText(myarr[0]);

        var outputContainer = document.getElementById('outputText');
        outputContainer.style.display = 'block'; // Show the output text container when there's content

        var userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('user-message');
        userMessageDiv.innerHTML = `
<div class="user-photo"></div>
<div class="message-content">${outputText}</div>
`;
        outputContainer.appendChild(userMessageDiv);
        var outputText = formatText(myarr[1]);

        outputContainer = document.getElementById('outputText');
        outputContainer.style.display = 'block'; // Show the output text container when there's content

        var userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('bot-message');
        userMessageDiv.innerHTML = `
<div class="bot-photo"></div>
<div class="message-content">${outputText}</div>
`;
        outputContainer.appendChild(userMessageDiv);

    }
})
.catch((e) => console.error(e));
let outputText = formatText();

const outputContainer = document.getElementById('outputText');
outputContainer.style.display = 'block'; // Show the output text container when there's content

const userMessageDiv = document.createElement('div');
userMessageDiv.classList.add('user-message');
userMessageDiv.innerHTML = `
<div class="user-photo"></div>
<div class="message-content">${outputText}</div>
`;
outputContainer.appendChild(userMessageDiv);
function type() {
    if (!isDeleting) {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        } else {
            isDeleting = true;
            setTimeout(type, 1000); // Pause before deleting
        }
    } else {
        if (index > 0) {
            typingElement.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(type, 100); // Deleting speed
        }
    }
}


window.onload = function () {
    console.log("chal rah hu")
}


function clicked() {
    let value = document.getElementById('searchQueryInput').value;

    if (value.trim() === "") return; // Do nothing if input is empty

    let outputText = formatText(value);

    const outputContainer = document.getElementById('outputText');
    outputContainer.style.display = 'block'; // Show the output text container when there's content

    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('user-message');
    userMessageDiv.innerHTML = `
        <div class="user-photo"></div>
        <div class="message-content">${outputText}</div>
    `;
    outputContainer.appendChild(userMessageDiv);

    document.getElementById('searchQueryInput').value = '';

    fetch('http://127.0.0.1/search?a=' + value)
        .then((response) => response.json())
        .then((myJson) => {
            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('bot-message');
            botMessageDiv.innerHTML = `
                <div class="bot-photo"></div>
                <div class="message-content">${formatText(myJson.result)}</div>
                <div class="feedback-buttons">
                    <button>👍</button>
                    <button>👎</button>
                </div>
            `;
            outputContainer.appendChild(botMessageDiv);
        });
}


// Automatically focus the cursor in the input field when the page loads
window.onload = function() {
    const searchInput = document.getElementById('searchQueryInput');
    searchInput.focus();

    // Add an event listener for the Enter key
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query); // Call the search function
                searchInput.value = ''; // Clear the input after search (optional)
            }
        }
    });
};