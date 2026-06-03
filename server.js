const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');
const VERIFY_TOKEN = 'crm_nautico_token'; // Token para validar o webhook no Meta Developers Portal

app.use(cors());
// Limite alto para suportar uploads de imagens em Base64
app.use(express.json({ limit: '50mb' }));

// Servir arquivos estáticos da pasta atual (index.html, styles.css, app.js, assets/)
app.use(express.static(__dirname));

// Rota raiz para servir o index.html do CRM
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Massa de dados padrão para inicializar o banco se não existir
const DEFAULT_STORE_DATA = {
  products: [
    { id: 'p2', name: 'Jet Ski Yamaha FX Cruiser SVHO', category: 'Jet Skis', line: 'Sport', status: 'Disponível', price: 95000, img: 'assets/jetski.png', gallery: ['assets/jetski.png'], desc: 'Jet ski de alta performance com motor supercharger, capacidade para 3 pessoas e acabamento de luxo.', notes: 'Disponível para entrega imediata no showroom.' },
    { id: 'p3', name: 'Quadriciclo Can-Am Outlander 570', category: 'Quadriciclos', line: 'Sport', status: 'Disponível', price: 65000, img: 'assets/quadriciclo.png', gallery: ['assets/quadriciclo.png'], desc: 'Quadriciclo robusto preparado para qualquer terreno, suspensão independente e motor Rotax de alta potência.', notes: '2 unidades em estoque físico.' },
    { id: 'p4', name: 'UTV Polaris RZR XP 1000', category: 'UTVs', line: 'Sport', status: 'Disponível', price: 120000, img: 'assets/utv.png', gallery: ['assets/utv.png'], desc: 'O máximo em off-road. UTV de alta cilindrada com gaiola de proteção integrada, suspensão ativa de competição.', notes: 'Encomendas com sinal de 30%.' },
    { id: 'p_v_pontoon250', name: 'Pontoon 250', category: 'Embarcações', line: 'Pontoon', status: 'Disponível', price: 180000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Pontoon de 25 pés ideal para águas abrigadas, oferecendo o máximo em espaço, estabilidade e conforto para reuniões familiares.', notes: 'Disponibilidade imediata no showroom.' },
    { id: 'p_v_pontoon320', name: 'Pontoon 320', category: 'Embarcações', line: 'Pontoon', status: 'Disponível', price: 320000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Super pontoon de 32 pés com dois andares (Double Deck), escorregador e capacidade para até 16 passageiros. O clube flutuante definitivo.', notes: 'Prazo de entrega: 60 dias.' },
    { id: 'p_v_v195_c', name: 'V195 Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 130000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'Lancha compacta com proa aberta de 19,5 pés, ideal para passeios rápidos e esportes aquáticos.', notes: 'Disponível em 4 cores de estofamento.' },
    { id: 'p_v_v210_c', name: 'V210 Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 160000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'Evolução natural do mercado de 21 pés. Cockpit otimizado com assentos giratórios e excelente aproveitamento de espaço.', notes: 'Entregue com capota retrátil.' },
    { id: 'p_v_v215_cc', name: 'V215 Cabin Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 195000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Lancha de 21,5 pés com cabine compacta para pernoite de casal. Alia a esportividade com a praticidade de abrigo.', notes: 'Opção de sanitário químico na cabine.' },
    { id: 'p_v_v230_g2c', name: 'V230 GII Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 230000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'Modelo de 23 pés de segunda geração com acabamento aprimorado, lines modernas e casco projetado para navegação suave.', notes: 'Homologada para 8 passageiros.' },
    { id: 'p_v_v250_c', name: 'V250 Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 290000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Lancha de 25 pés com amplo cockpit, solário de popa, acabamento refinado e capacidade para até 11 passageiros.', notes: 'Disponível para test-drive.' },
    { id: 'p_v_v265_cc', name: 'V265 Cabin Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 360000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Uma das cabinadas mais tradicionais da categoria. Cabine espaçosa com cama de casal, banheiro fechado e minicozinha.', notes: 'Prazo médio de laminação: 45 dias.' },
    { id: 'p_v_v250_s', name: 'V250 Sport', category: 'Embarcações', line: 'Sport', status: 'Disponível', price: 280000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'Edição esportiva de 25 pés com layout de assentos otimizado para navegação rápida e design agressivo.', notes: 'Disponível com motor de popa de até 300HP.' },
    { id: 'p_v_v220_surf', name: 'V220 Surf', category: 'Embarcações', line: 'Sport', status: 'Disponível', price: 210000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Desenvolvida especialmente para a prática de wakeboard e wakesurf. Conta com flaps específicos e sistema de lastro.', notes: 'Torre de wakeboard em alumínio inclusa.' },
    { id: 'p_v_v205_cross', name: 'V205 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 180000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'A crossover de entrada da marca. Excelente espaço interno de proa aberta combinada com soluções inteligentes de cabine de apoio.', notes: 'Sucesso de vendas.' },
    { id: 'p_v_v300_cross', name: 'V300 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 480000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Day Cruiser que combina a conveniência de uma proa aberta com o conforto de uma cabine com pé-direito alto.', notes: 'Lancha mais vendida da categoria no Brasil.' },
    { id: 'p_v_v370_cross', name: 'V370 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 780000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Crossover espetacular de 37 pés com solário de proa integrado, cabine luxuosa com pernoite para 4 pessoas e ampla praça de popa.', notes: 'Motorização parelha recomendada.' },
    { id: 'p_v_v400_cross', name: 'V400 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 980000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Embarcação premium de grande porte com cabine de luxo, espaço gourmet na popa e teto rígido elétrico. O máximo de conforto e status.', notes: 'Prazo de entrega: 90 dias.' },
    { id: 'p_v_v550_cross', name: 'V550 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 4500000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Iate Crossover monumental de 55 pés. Layout integrado de convés aberto com suítes de alto luxo abaixo do deck.', notes: 'Faturamento direto de fábrica.' },
    { id: 'p_v_v300_dc', name: 'V300 Day Cruiser', category: 'Embarcações', line: 'Premium', status: 'Disponível', price: 510000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Versão cabinada clássica de 30 pés. Cabine fechada luxuosa, banheiro completo e cockpit perfeito para navegação oceânica.', notes: 'Acabamento interno customizável.' },
    { id: 'p_v_v400_ht', name: 'V400 HT', category: 'Embarcações', line: 'Premium', status: 'Disponível', price: 1100000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Lancha Hard Top de 40 pés com fechamento traseiro em vidro, ar-condicionado de alta capacidade e gerador inclusos.', notes: 'Modelo de showroom disponível.' },
    { id: 'p_v_v450_p', name: 'V450 Premium', category: 'Embarcações', line: 'Premium', status: 'Disponível', price: 1800000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Iate premium de 45 pés com design italiano, plataforma de popa submergível e acabamento interno em couro e madeira nobre.', notes: 'Prazo de construção: 120 dias.' },
    { id: 'p_v_v550_fly', name: 'V550 Flybridge', category: 'Embarcações', line: 'Premium', status: 'Disponível', price: 4800000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Flagship da Ventura Marine com 55 pés e Flybridge gigante. 3 cabines, 2 banheiros e salão principal totalmente integrado.', notes: 'Opção de motorização IPS.' }
  ],
  clients: [
    {
      id: 'c1',
      name: 'João Silva',
      phone: '(11) 98765-4321',
      email: 'joao.silva@gmail.com',
      product: 'V300 Crossover',
      value: 480000,
      temp: 'Quente',
      stage: 'Visita Agendada',
      created: '2026-05-25',
      notes: 'Cliente demonstrou forte interesse em fechar antes do final do mês. Quer test-drive na represa.',
      timeline: [
        { date: '25/05/2026', text: 'Lead captado via formulário do site.', isSystem: true },
        { date: '26/05/2026', text: 'Primeiro contato realizado. Cliente solicitou informações da V300.', isSystem: false },
        { date: '28/05/2026', text: 'Qualificado com sucesso. Renda e perfil de compra validados.', isSystem: true },
        { date: '01/06/2026', text: 'Visita técnica agendada para showroom.', isSystem: false }
      ],
      lastAction: 'Visita agendada para o Showroom'
    },
    {
      id: 'c2',
      name: 'Maria Oliveira',
      phone: '(21) 99887-6655',
      email: 'maria.oliveira@uol.com.br',
      product: 'Jet Ski Yamaha FX Cruiser SVHO',
      value: 95000,
      temp: 'Quente',
      stage: 'Em Negociação',
      created: '2026-05-28',
      notes: 'Negociando parcelamento. Solicitou 5% de desconto à vista.',
      timeline: [
        { date: '28/05/2026', text: 'Lead captado via WhatsApp.', isSystem: true },
        { date: '29/05/2026', text: 'Primeiro contato telefônico. Apresentação das opções de Jet Skis.', isSystem: false },
        { date: '02/06/2026', text: 'Enviada proposta comercial com opção de financiamento.', isSystem: true }
      ],
      lastAction: 'Proposta enviada para análise'
    }
  ],
  sales: [
    { id: 's1', clientName: 'Flávio Augusto', product: 'V300 Crossover', value: 480000, commission: 6000, date: '2026-06-01', status: 'Ganho', notes: 'Venda concluída com motores Mercruiser. Pagamento via Pix.' }
  ],
  agenda: [
    { id: 'a1', clientId: 'c1', clientName: 'João Silva', task: 'Ligar para João Silva', subText: 'V300 Crossover', time: '09:00', date: '2026-06-02', priority: 'medium' },
    { id: 'a2', clientId: 'c2', clientName: 'Maria Oliveira', task: 'Reunião com Maria Oliveira', subText: 'Apresentação de proposta', time: '10:30', date: '2026-06-02', priority: 'high' }
  ],
  scripts: [
    {
      title: 'Abordagem Inicial - Lanchas Crossover',
      category: 'Embarcações',
      script: `Olá [Nome], tudo bem? Aqui é o Gabriel Lima, Consultor Náutico da Ventura.\nVi que você solicitou mais informações sobre a nossa lancha Ventura Crossover no site.\n\nA linha Crossover une o melhor de uma proa aberta com o conforto de uma cabinada luxuosa. Para eu te passar uma proposta ideal, você pretende navegar mais em represa ou mar? E qual seria a lotação ideal para os seus passeios?\n\nFico no aguardo!`
    }
  ],
  config: {
    userName: 'Gabriel Lima',
    userRole: 'Consultor Náutico',
    monthlyGoal: 1000000,
    defaultCommission: 1.25
  },
  notifications: [
    { id: 'n1', title: 'Integração Ativa 🚀', text: 'Servidor backend e Webhook prontos para receber mensagens.', time: 'Agora', unread: true }
  ]
};

// Carrega ou inicializa o db.json
function loadDatabase() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_STORE_DATA, null, 2), 'utf8');
    return DEFAULT_STORE_DATA;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler banco db.json. Reiniciando banco.', e);
    return DEFAULT_STORE_DATA;
  }
}

// Salva dados no db.json
function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Erro ao salvar db.json:', e);
    return false;
  }
}

// ROTA 1: GET STORE - Retorna todo o estado do CRM
app.get('/api/store', (req, res) => {
  const data = loadDatabase();
  res.json(data);
});

// ROTA 2: POST STORE - Atualiza o estado completo do CRM
app.post('/api/store', (req, res) => {
  const success = saveDatabase(req.body);
  if (success) {
    res.json({ status: 'ok', message: 'Dados salvos com sucesso.' });
  } else {
    res.status(500).json({ status: 'error', message: 'Erro ao gravar arquivo db.json.' });
  }
});

// ROTA 3: GET WEBHOOK - Validação de tokens exigida pela Meta (WhatsApp Cloud API)
app.get('/api/webhook/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook do WhatsApp verificado com sucesso no Meta!');
    return res.status(200).send(challenge);
  } else {
    return res.status(403).send('Token de verificação inválido.');
  }
});

// ROTA 4: POST WEBHOOK - Recebe as notificações de mensagens enviadas por clientes
app.post('/api/webhook/whatsapp', (req, res) => {
console.log('POST WHATSAPP RECEBIDO');
console.log(JSON.stringify(req.body, null, 2));  const body = req.body;

  // Verifica se a estrutura é compatível com o payload do WhatsApp
  if (body.object === 'whatsapp_business_account' && body.entry && body.entry[0].changes && body.entry[0].changes[0].value) {
    const value = body.entry[0].changes[0].value;
    
    // Confirma se há mensagens no payload
    if (value.messages && value.messages[0]) {
      const msg = value.messages[0];
      const fromNumber = msg.from; // Número do cliente (ex: "5511999999999")
      const messageText = msg.text ? msg.text.body : ''; // Texto da mensagem
      const profileName = value.contacts && value.contacts[0] ? value.contacts[0].profile.name : ''; // Nome no WhatsApp

      console.log(`Mensagem recebida de ${profileName || fromNumber}: "${messageText}"`);

      // Se a mensagem contiver texto, criamos o Lead no banco
      if (messageText) {
        const db = loadDatabase();
        
        // Tentamos mapear o interesse em algum veículo específico da base
        let matchedProduct = db.products[3]; // Padrão: Pontoon 250
        let matchedPrice = matchedProduct.price;

        for (const p of db.products) {
          // Busca case-insensitive pelo nome do barco na mensagem
          const cleanProdName = p.name.toLowerCase();
          const cleanMsgText = messageText.toLowerCase();
          if (cleanMsgText.includes(cleanProdName) || (p.name.length > 3 && cleanMsgText.includes(p.name.split(' ')[0].toLowerCase()))) {
            matchedProduct = p;
            matchedPrice = p.price;
            break;
          }
        }

        const todayIso = new Date().toISOString().split('T')[0];
        const todayBr = new Date().toLocaleDateString('pt-BR');

        // Formatação simples do WhatsApp para o telefone do lead
        const formattedPhone = `+${fromNumber.slice(0, 2)} (${fromNumber.slice(2, 4)}) ${fromNumber.slice(4, 9)}-${fromNumber.slice(9)}`;

        const newLead = {
          id: 'c_' + Date.now(),
          name: profileName || `WhatsApp Lead (${fromNumber})`,
          phone: formattedPhone,
          email: '',
          product: matchedProduct.name,
          value: matchedPrice,
          temp: 'Quente',
          stage: 'Lead Captado',
          created: todayIso,
          notes: `Lead captado automaticamente via Integração WhatsApp Business.`,
          timeline: [
            { date: todayBr, text: `Lead captado automaticamente via API do WhatsApp Business.`, isSystem: true },
            { date: todayBr, text: `Mensagem enviada: "${messageText}" (Produto associado: ${matchedProduct.name})`, isSystem: false }
          ],
          lastAction: 'Lead recebido via WhatsApp'
        };

        // Adiciona lead à base de clientes
        db.clients.unshift(newLead);

        // Dispara uma notificação interna para alertar o Gabriel Lima
        const newNotif = {
          id: 'n_' + Date.now(),
          title: 'Novo Lead no WhatsApp 💬',
          text: `${newLead.name} - Interessado em ${newLead.product}`,
          time: 'Agora',
          unread: true
        };
        db.notifications.unshift(newNotif);

        saveDatabase(db);
        console.log(`Lead "${newLead.name}" criado com sucesso no banco de dados!`);
      }
    }
  }

  // Sempre retorna 200 OK para sinalizar recebimento correto à Meta
  res.status(200).send('EVENT_RECEIVED');
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Servidor CRM Náutico Premium rodando na porta ${PORT} `);
  console.log(` Webhook do WhatsApp disponível em:                   `);
  console.log(` http://localhost:${PORT}/api/webhook/whatsapp         `);
  console.log(`=======================================================`);
});
