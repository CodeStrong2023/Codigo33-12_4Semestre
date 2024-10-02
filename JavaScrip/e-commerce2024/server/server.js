const express = require("express");
const cors = require("cors");
const path = require("path");
const mercadopago = require("mercadopago");

// Configura Mercado Pago con tu Access Token
mercadopago.configure({
    access_token: "TEST-4599*********755-11221*********d497ae962*********ecf8d85-1*********" // Reemplaza con tu Access Token
});

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/media/index.html"));
});

// Ruta para crear una preferencia
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
            success: "http://localhost:5500/success",
            failure: "http://localhost:5500/failure",
            pending: "http://localhost:5500/pending"
        },
        auto_return: "approved",
    };

    try {
        const response = await mercadopago.preferences.create(preferenceData);
        res.json({ id: response.body.id });
    } catch (error) {
        console.error("Error al crear la preferencia", error);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});


// Ruta para recibir el feedback
app.get("/feedback", (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id,
    });
});

// Inicia el servidor en el puerto 5500
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});