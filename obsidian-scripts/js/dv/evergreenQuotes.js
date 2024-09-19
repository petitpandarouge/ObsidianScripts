
const quoteRegex = /\[!quote\] ([^\~]+)\~/m;

if (!input || !input.type) {
	dv.paragraph("Please select the type of quote you want to display.");
	return;
}

if (input.type === "all") {
	await displayLinkedQuotes();
} else if (input.type === "random") {
	await displayRandomLinkedQuote();
}


// UTILS

function getQuote(content) {
	// L'index 0 retourne le match avec [!quote]
	// L'index 1 retourne le match de la première parenthèse
	if (!content.match(quoteRegex)) {
		return 'Please add a "~" at the end of the quote !';
	}
	return content.match(quoteRegex)[1];
}

function formatQuote(quote, page) {
	return `[[${page.file.name}|${quote}]]`;
}

async function getLinkedQuotes() {
	let citationPages = dv.pages('"06 GARDEN" AND #type/citation');
	let quotes = [];
	for (let page of citationPages) {
		let content = await dv.io.load(page.file.path);
		let quote = getQuote(content);
		let formatedQuote = formatQuote(quote, page);
		quotes.push(formatedQuote);
	}
	return quotes;
}

async function displayLinkedQuotes() {
	let quotes = await getLinkedQuotes();
	dv.list(quotes, false);
}

async function getRandomLinkedQuote() {
	let quotes = await getLinkedQuotes();
	return quotes[Math.floor(Math.random() * quotes.length)];
}

async function displayRandomLinkedQuote() {
	let quote = await getRandomLinkedQuote();
	dv.paragraph(quote);
}
	