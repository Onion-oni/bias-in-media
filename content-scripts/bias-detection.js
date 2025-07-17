// Load TensorFlow.js

// Load the TensorFlow.js model

// Function to inject CSS

// Function to gather visible text from the page
function gatherPageText() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {

                // skip the text if its detached (no parent), has an invisible parent element, or is whitespace/empty
                if (!node.parentElement || !node.parentElement.offsetParent || !node.nodeValue.trim()) {
                        return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const visibleTextNodes = [];

    while (walker.nextNode()) {
        visibleTextNodes.push(walker.currentNode);
    }

    return visibleTextNodes;
}

// Function to detect bias using the TensorFlow.js model
function detectBias() {}

// Function to highlight biased text based on the results from the model
function addHighlightWrapToBiasedText() {
    const span = document.createElement('span');
    span.className = 'bias-span highlighted';
    span.textContent = textNode.nodeValue;

    // replaces original text node with highlighted span and highlights on page
    textNode.parentNode.replaceChild(span, textNode);

    return span;
}

//TODO: async when tensorflowmodel is added
function main() {
    const textNodes = gatherPageText();
    const highlightedBias = [];

    //TODO: currently set to highlight all text on page. Set up with model!
    for (const node of textNodes) {
        const span = addHighlightWrapToBiasedText(node);
        highlightedBias.push(span);
    }

    const fullPageText = highlightedBias.map(s => s.textContent).join (' ');
    console.log("Extracted Visible Page Text: \n", fullPageText);
}

main();
