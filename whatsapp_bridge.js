const express = require('express');
const app = express();
app.use(express.json());

// CONFIGURAÇÃO: Coloque seu número e seu ID Sync abaixo
const WHATSAPP_USER_MAPPING = {
    "whatsapp:+5521982207815": "USER_5FVMZ2TTG"
};

app.post('/webhook-whatsapp', async (req, res) => {
    const mensagem = req.body.Body;
    const remetente = req.body.From;
    
    console.log(`Recebi de ${remetente}: "${mensagem}"`);
    
    // Verifica se o número está autorizado
    if (!WHATSAPP_USER_MAPPING[remetente]) {
        res.set('Content-Type', 'text/xml');
        res.send(`<Response><Message>Erro: Seu número não está autorizado neste robô.</Message></Response>`);
        return;
    }

    res.set('Content-Type', 'text/xml');
    res.send(`<Response><Message>Robô recebido!</Message></Response>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Robô rodando!'));
