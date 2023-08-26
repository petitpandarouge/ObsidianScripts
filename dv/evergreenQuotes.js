
const quoteRegex = /\[!quote\] ([^\~]+)\~/m;

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

async function getLinkedQuotes(dv) {
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

async function getRandomLinkedQuote(dv) {
	let quotes = await getLinkedQuotes(dv);
	return quotes[Math.floor(Math.random() * quotes.length)];
}

module.exports = {
	getAll: getLinkedQuotes,
	getRandom: getRandomLinkedQuote
};
	