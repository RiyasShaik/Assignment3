window.addEventListener('load', function(event) {
    logEvent(event, 'view', 'page');
});

document.addEventListener('click', function(event) {
    logEvent(event, 'click', event.target);
});

function logEvent(event, type, target) {
    let timestamp = Date.now();
    let eventDetails = {
        timestamp: timestamp,
        type: type,
        target: target,
    };

    if (type === 'click') {
        eventDetails.targetDetails = {
            tagName: target.tagName,
            id: target.id,
            class: target.classList.value
        };
    }

    console.log("Event Captured:", eventDetails);
    // You could also format this output string if needed
    // console.log(`${timestamp}, ${type}, ${target.tagName}, id: ${target.id}, class: ${target.classList.value}`);
}

function analyzeText() {
    let text = document.getElementById('myTextarea').value;

    function countLetters(text) {
        let letters = text.replace(/[^a-zA-Z]/g, '');
        return letters.length;
    }

    function countWords(text) {
        let words = text.split(/\s+/).filter(word => word.length > 0);
        return words.length;
    }

    function countSpaces(text) {
        let spaces = text.split(' ').length - 1;
        return spaces;
    }

    function countNewlines(text) {
        let newlines = text.split('\n').length - 1;
        return newlines;
    }

    function countSpecialSymbols(text) {
        const specialChars = text.replace(/[a-zA-Z0-9\s\n]/g, '');
        return specialChars.length;
    }

    function countPronouns(text) {
        const pronouns = {
            "i": 0, "me": 0, "my": 0, "mine": 0,
            "you": 0, "your": 0, "yours": 0,
            "he": 0, "him": 0, "his": 0,
            "she": 0, "her": 0, "hers": 0,
            "it": 0, "its": 0,
            "we": 0, "us": 0, "our": 0, "ours": 0,
            "they": 0, "them": 0, "their": 0, "theirs": 0
        };
        const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        words.forEach(word => {
            if (pronouns.hasOwnProperty(word)) {
                pronouns[word]++;
            }
        });
        return pronouns;
    }

    function countPrepositions(text) {
        const prepositions = {
            "in": 0, "on": 0, "at": 0, "by": 0, "for": 0, "to": 0, "from": 0, "with": 0,
            "above": 0, "below": 0, "between": 0, "among": 0, "through": 0, "under": 0,
            "behind": 0, "beside": 0, "over": 0, "before": 0, "after": 0
            // Add more prepositions
        };
        const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        words.forEach(word => {
            if (prepositions.hasOwnProperty(word)) {
                prepositions[word]++;
            }
        });
        return prepositions;
    }

    function countIndefiniteArticles(text) {
        const articles = { "a": 0, "an": 0 };
        const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        words.forEach(word => {
            if (articles.hasOwnProperty(word)) {
                articles[word]++;
            }
        });
        return articles;
    }

    let letterCount = countLetters(text);
    let wordCount = countWords(text);
    let spaceCount = countSpaces(text);
    let newlineCount = countNewlines(text);
    let symbolCount = countSpecialSymbols(text);
    let pronounCounts = countPronouns(text);
    let prepositionCounts = countPrepositions(text);
    let articleCounts = countIndefiniteArticles(text);

    document.getElementById('letterCount').textContent = letterCount;
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('spaceCount').textContent = spaceCount;
    document.getElementById('newlineCount').textContent = newlineCount;
    document.getElementById('symbolCount').textContent = symbolCount;

    displayCountsInTable('pronounTable', pronounCounts);
    displayCountsInTable('prepositionTable', prepositionCounts);
    displayCountsInTable('articleTable', articleCounts);
}

function displayCountsInTable(tableId, counts) {
    let tableBody = document.getElementById(tableId).querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous results
    for (const key in counts) {
        if (counts.hasOwnProperty(key)) {
            let row = tableBody.insertRow();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            cell1.textContent = key;
            cell2.textContent = counts[key];
        }
    }
}