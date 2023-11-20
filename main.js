////////////////////////////////////////////////////////    CURSOR ANIMATION    ////////////////////////////////////////////////////////////////////////////

const blob = document.querySelector("#blob");

window.addEventListener("mousemove", (e) => {
	const { clientX, clientY } = e;
	blob.animate(
		{
			left: `${clientX}px`,
			top: `${clientY}px`,
		},
		{ duration: 3000, fill: "forwards" }
	);
});

/////////////////////////////////////////////////////////////  CURSOR ANIMATION  /////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////  REAL TIME CARDS  /////////////////////////////////////////////////////////////////////////////////

const cardContainer = document.querySelector(".container");
const pairs = ["btc", "eth", "sol", "xrp", "ltc", "egld", "doge", "bnb", "ada"];

const createCard = (pair, price = "<div class='spinner-container'><div class='spinner'></div><div>") => {
	const card = document.createElement("div");
	const ticker = pair.toUpperCase();
	card.classList.add("card");
	card.innerHTML = `
		<div class="ticker">
			<img src=https://coinicons-api.vercel.app/api/icon/${ticker.toLowerCase()} alt=${ticker} />
			<span>${ticker}</span>
		</div>
		<div class="price ${pair}">${price}</div>
	`;
	cardContainer.appendChild(card);
};

const setupWebCoketLiveData = (pair) => {
	const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}eur@aggTrade`);
	const priceHtmlNode = document.querySelector(`.${pair}`);
	ws.onmessage = (event) => {
		const obj = JSON.parse(event.data);
		let price = Number(obj.p);
		let prevPrice = priceHtmlNode.childNodes[1] ? Number(priceHtmlNode.childNodes[1].innerText.replace("€", "")) : price;
		const diff = price - prevPrice;

		priceHtmlNode.innerHTML = `
		<span class='animate ${price >= prevPrice ? "green" : "red"}'>${price.toFixed(3)} €</span>
		<small class='animate ${price >= prevPrice ? "green" : "red"}'>${diff >= 0 ? "+ " : ""}${diff.toFixed(2)}€</small>
		`;
	};
};

pairs.forEach((pair) => {
	createCard(pair);
	setupWebCoketLiveData(pair);
});

/////////////////////////////////////////////////////////////  REAL TIME CARDS  /////////////////////////////////////////////////////////////////////////////////
