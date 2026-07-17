

const express = require('express');
const app = express();
app.use(express.json());

// --- CONFIGURAÇÃO DO SEU ROBÔ ---
// Substitua o número abaixo pelo seu celular (ex: whatsapp:+5521999999999)
// e o ID Sync pelo código que aparece na tela do seu index.html
    "const WHATSAPP_USER_MAPPING = {
    "whatsapp:+5521982207815": "USER_5FVMZ2TTG"
};"
};
// --------------------------------

// Este é o robô que recebe a mensagem do WhatsApp (Twilio)
app.post('/webhook-whatsapp', async (req, res) => {
    const mensagem = req.body.Body; // Texto enviado
    const remetente = req.body.From; // Número de quem enviou
    
    console.log(`Recebi: "${mensagem}" de ${remetente}`);
    
    // Verifica se o remetente está na lista autorizada
    const userId = WHATSAPP_USER_MAPPING[remetente];
    
    if (!userId) {
        console.log(`Acesso negado para: ${remetente}`);
        res.set('Content-Type', 'text/xml');
        res.send(`<Response><Message>Erro: Seu número não está autorizado neste robô.</Message></Response>`);
        return;
    }

    // A lógica de interpretação do Gemini e salvamento no Firebase entra aqui...
    
    // Resposta automática para o seu WhatsApp
    res.set('Content-Type', 'text/xml');
    res.send(`<Response><Message>Robô recebeu: ${mensagem}. Registrando para o usuário: ${userId}</Message></Response>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Robô rodando!'));
