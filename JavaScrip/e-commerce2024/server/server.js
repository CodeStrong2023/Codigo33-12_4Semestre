const express = require("express");
const cors = require("cors");
const path = require("path");
const { MercadoPagoConfig, Preference } = require("mercadopago");

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
const client = new mercadopago.MercadoPagoConfig({
	access_token: "TEST-7910196691921986-091023-369c13c132989190e4c7be147a6eeb41-1984536597",
});
const preference = new mercadopago.Preference(client);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

app.get("/", function (req, res) {
	res.sendFile(path.resolve(__dirname, "../client/media/index.html"));
});

app.post("/create_preference", async (req, res) => {
	const preferenceData = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			},
		],
		back_urls: {
			"success": "http://localhost:8800/e-commerce2024/client/media/index.html",
			"failure": "http://localhost:8800/e-commerce2024/client/media/index.html",
			"pending": "http://localhost:8800/e-commerce2024/client/media/index.html"
		},
		auto_return: "approved",
	};

	try {
		const response = await preference.create({ body: preferenceData});
		res.json({
			id: response.body.id,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Error al crear la preferencia");
	}
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id,
	});
});

app.listen(8080, () => {
	console.log("El servidor esta corriendo en el puerto 8080");
});