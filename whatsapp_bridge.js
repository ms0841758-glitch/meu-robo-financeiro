const express = require('express');
const app = express();

// Configurações para ler mensagens JSON e Formulario (o que a Twilio envia)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIGURAÇÃO: Seu número e seu ID Sync abaixo
const WHATSAPP_USER_MAPPING = {
    "whatsapp:+5521982207815": "USER_5FVMZ2TTG" 
};

app.post('/webhook-whatsapp', async (req, res) => {
    // Agora o robô consegue ler tanto body.Body quanto req.body.Body
    const mensagem = req.body.Body;
    const remetente = req.body.From;
    
    console.log(`Recebi de ${remetente}: "${mensagem}"`);
    
    // Verifica se o número está autorizado
    if (!WHATSAPP_USER_MAPPING[remetente]) {
        res.set('Content-Type', 'text/xml');
        res.send(`<Response><Message>Erro: Seu número (${remetente}) não está autorizado neste robô. Verifique seu ID Sync.</Message></Response>`);
        return;
    }

    res.set('Content-Type', 'text/xml');
    res.send(`<Response><Message>Robô recebido! Entendi sua mensagem: ${mensagem}</Message></Response>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Robô rodando!'));
