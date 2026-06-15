const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const { Client } = require('pg');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');
const VERIFY_TOKEN = 'crm_nautico_token'; // Token para validar o webhook no Meta Developers Portal

// Configurações do Supabase (PostgreSQL)
const DATABASE_URL = process.env.DATABASE_URL;
let pgClient = null;
let pgError = null;

// Configurações do MongoDB Atlas (Modo Híbrido)
const MONGODB_URI = process.env.MONGODB_URI;
let mongoClient = null;
let mongoDb = null;
const COLLECTION_NAME = 'crm_data';
const DOCUMENT_ID = 'crm_master_data';

async function connectToPostgres() {
  if (!DATABASE_URL) {
    return false;
  }
  try {
    console.log('Tentando conectar ao Supabase (PostgreSQL)...');
    pgClient = new Client({
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    await pgClient.connect();
    console.log('Conectado ao Supabase (PostgreSQL) com sucesso!');
    
    // Cria a tabela de armazenamento se não existir
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS crm_storage (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL
      );
    `);
    
    return true;
  } catch (e) {
    console.error('Falha ao conectar no Supabase. Erro:', e.message);
    pgError = e.message;
    pgClient = null;
    return false;
  }
}

async function connectToMongo() {
  if (!MONGODB_URI) {
    console.log('Modo de Banco de Dados: LOCAL (db.json)');
    return false;
  }
  try {
    console.log('Tentando conectar ao MongoDB Atlas...');
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    
    // Pega o nome do banco de dados da string ou usa crm_db padrão
    const dbName = MONGODB_URI.includes('?') 
      ? MONGODB_URI.split('/').pop().split('?')[0] || 'crm_db'
      : MONGODB_URI.split('/').pop() || 'crm_db';
      
    mongoDb = mongoClient.db(dbName);
    console.log(`Conectado ao MongoDB no banco "${dbName}"!`);
    console.log('Modo de Banco de Dados: NUVEM (MongoDB Atlas)');
    return true;
  } catch (e) {
    console.error('Falha ao conectar no MongoDB Atlas. Mantendo modo local (db.json). Erro:', e.message);
    mongoClient = null;
    mongoDb = null;
    return false;
  }
}

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
  products: [],
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
  ],
  users: [
    { username: 'gabriel.lima', password: '280555', name: 'Gabriel Lima', role: 'admin' }
  ]
};

// Carrega ou inicializa o banco de dados (Modo Híbrido)
async function loadDatabase() {
  if (pgClient) {
    try {
      const res = await pgClient.query('SELECT data FROM crm_storage WHERE id = $1', [DOCUMENT_ID]);
      if (res.rows.length === 0) {
        // Inicializa o Supabase com a massa de dados padrão
        await pgClient.query('INSERT INTO crm_storage (id, data) VALUES ($1, $2)', [DOCUMENT_ID, DEFAULT_STORE_DATA]);
        return DEFAULT_STORE_DATA;
      }
      
      const data = res.rows[0].data;
      
      // Migração automática para adicionar chave de usuários/remover produtos no Supabase
      let pgChanged = false;
      if (!data.users || data.users.length === 0) {
        data.users = DEFAULT_STORE_DATA.users;
        pgChanged = true;
      }
      if (data.products && data.products.length > 0) {
        data.products = [];
        pgChanged = true;
      }
      if (pgChanged) {
        await pgClient.query('UPDATE crm_storage SET data = $2 WHERE id = $1', [DOCUMENT_ID, data]);
        console.log('Migração Supabase: Tabela de usuários/produtos atualizada.');
      }
      
      return data;
    } catch (e) {
      console.error('Erro ao ler dados no Supabase. Usando fallback...', e.message);
    }
  }

  if (mongoDb) {
    try {
      const collection = mongoDb.collection(COLLECTION_NAME);
      const data = await collection.findOne({ _id: DOCUMENT_ID });
      if (!data) {
        // Inicializa o MongoDB com a massa de dados padrão
        const initialDoc = { _id: DOCUMENT_ID, ...DEFAULT_STORE_DATA };
        await collection.insertOne(initialDoc);
        return DEFAULT_STORE_DATA;
      }
      
      // Migração automática para adicionar chave de usuários/remover produtos no MongoDB
      let mongoChanged = false;
      if (!data.users || data.users.length === 0) {
        data.users = DEFAULT_STORE_DATA.users;
        mongoChanged = true;
      }
      if (data.products && data.products.length > 0) {
        data.products = [];
        mongoChanged = true;
      }
      if (mongoChanged) {
        await collection.replaceOne({ _id: DOCUMENT_ID }, data);
        console.log('Migração MongoDB: Tabela de usuários/produtos atualizada.');
      }
      
      delete data._id; // Remove o ID do MongoDB para compatibilidade com o frontend
      return data;
    } catch (e) {
      console.error('Erro ao ler dados no MongoDB Atlas. Usando fallback local...', e.message);
    }
  }

  // Fallback Local (db.json)
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_STORE_DATA, null, 2), 'utf8');
    return DEFAULT_STORE_DATA;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const data = JSON.parse(raw);
    
    // Migração automática local
    let localChanged = false;
    if (!data.users || data.users.length === 0) {
      data.users = DEFAULT_STORE_DATA.users;
      localChanged = true;
    }
    if (data.products && data.products.length > 0) {
      data.products = [];
      localChanged = true;
    }
    if (localChanged) {
      saveDatabaseLocal(data);
      console.log('Migração Local: Dados e produtos atualizados.');
    }
    return data;
  } catch (e) {
    console.error('Erro ao ler banco db.json. Reiniciando banco.', e);
    return DEFAULT_STORE_DATA;
  }
}

// Salva dados localmente no arquivo db.json
function saveDatabaseLocal(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Erro ao salvar no arquivo db.json:', e.message);
    return false;
  }
}

// Salva dados (Modo Híbrido)
async function saveDatabase(data) {
  if (pgClient) {
    try {
      const updateData = { ...data };
      delete updateData._id;
      
      await pgClient.query(`
        INSERT INTO crm_storage (id, data)
        VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
      `, [DOCUMENT_ID, updateData]);
      
      return true;
    } catch (e) {
      console.error('Erro ao salvar no Supabase:', e.message);
      return false;
    }
  }

  if (mongoDb) {
    try {
      const collection = mongoDb.collection(COLLECTION_NAME);
      const updateData = { ...data };
      delete updateData._id; // Garante limpeza de ID antigo para evitar conflito no Atlas
      
      await collection.replaceOne(
        { _id: DOCUMENT_ID },
        { _id: DOCUMENT_ID, ...updateData },
        { upsert: true }
      );
      return true;
    } catch (e) {
      console.error('Erro ao salvar no MongoDB Atlas:', e.message);
      return false;
    }
  }
  return saveDatabaseLocal(data);
}

// Função auxiliar para verificar credenciais via Basic Auth (Assíncrona)
async function isAuthenticated(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return false;
  
  try {
    const token = authHeader.replace('Basic ', '');
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');
    
    const db = await loadDatabase();
    const user = db.users.find(u => u.username === username && u.password === password);
    return user ? user : false;
  } catch (e) {
    return false;
  }
}

// ROTA DE LOGIN: POST /api/login - Autentica usuário e retorna perfil básico
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios.' });
  }

  const db = await loadDatabase();
  const user = db.users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({
      success: true,
      user: {
        name: user.name,
        username: user.username,
        role: user.role
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
  }
});

// ROTA 1: GET STORE - Retorna todo o estado do CRM
app.get('/api/store', async (req, res) => {
  const user = await isAuthenticated(req);
  if (!user) {
    return res.status(401).json({ status: 'error', message: 'Não autorizado.' });
  }
  const data = await loadDatabase();
  res.json(data);
});

// ROTA 2: POST STORE - Atualiza o estado completo do CRM
app.post('/api/store', async (req, res) => {
  const user = await isAuthenticated(req);
  if (!user) {
    return res.status(401).json({ status: 'error', message: 'Não autorizado.' });
  }
  const success = await saveDatabase(req.body);
  if (success) {
    res.json({ status: 'ok', message: 'Dados salvos com sucesso.' });
  } else {
    res.status(500).json({ status: 'error', message: 'Erro ao gravar banco de dados.' });
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

// ROTA 4: POST WEBHOOK - Recebe as notificações de mensagens enviadas por clientes (Assíncrona)
app.post('/api/webhook/whatsapp', async (req, res) => {
  console.log('POST WHATSAPP RECEBIDO');
  console.log(JSON.stringify(req.body, null, 2));  

  const body = req.body;

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
        const db = await loadDatabase();
        
        // Extração inteligente do interesse com base nas palavras-chave no texto recebido
        let matchedProduct = 'Interesse Geral (WhatsApp)';
        let matchedPrice = 0;

        // Expressão regular para procurar termos após palavras-chave de interesse
        const regexKeywords = /(?:conhecer o|conhecer a|saber mais sobre|ver o|ver a|interesse no|interesse na|comprar o|comprar a|quero o|quero a|gostaria de ver)\s+([^?.!,]+)/i;
        const match = messageText.match(regexKeywords);
        if (match && match[1]) {
          const extracted = match[1].trim();
          if (extracted.length > 0) {
            matchedProduct = extracted.substring(0, 80); // Limita tamanho
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
          product: matchedProduct,
          value: matchedPrice,
          temp: 'Quente',
          stage: 'Lead Captado',
          created: todayIso,
          notes: `Lead captado automaticamente via Integração WhatsApp Business.`,
          timeline: [
            { date: todayBr, text: `Lead captado automaticamente via API do WhatsApp Business.`, isSystem: true },
            { date: todayBr, text: `Mensagem enviada: "${messageText}" (Produto associado: ${matchedProduct})`, isSystem: false }
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

        await saveDatabase(db);
        console.log(`Lead "${newLead.name}" criado com sucesso no banco de dados!`);
      }
    }
  }

  // Sempre retorna 200 OK para sinalizar recebimento correto à Meta
  res.status(200).send('EVENT_RECEIVED');
});

// ROTA DE STATUS: GET /api/status - Retorna o status de conexão com o banco de dados
app.get('/api/status', (req, res) => {
  let activeDb = 'Local db.json (Temporário - Sujeito a perdas)';
  if (pgClient) {
    activeDb = 'Supabase (Nuvem - Permanente)';
  } else if (mongoDb) {
    activeDb = 'MongoDB Atlas (Nuvem - Permanente)';
  }
  res.json({
    status: 'ok',
    database: activeDb,
    hasDatabaseUrl: !!DATABASE_URL,
    postgresError: pgError
  });
});

// Inicialização Assíncrona do Servidor (Suporta conexão prévia com MongoDB/Postgres)
async function startServer() {
  const isPostgres = await connectToPostgres();
  if (!isPostgres) {
    await connectToMongo();
  }

  app.listen(PORT, async () => {
    // Inicializa o banco de dados e executa migrações/criação inicial
    await loadDatabase();
    console.log(`=======================================================`);
    console.log(` Servidor CRM Náutico Premium rodando na porta ${PORT} `);
    console.log(` Webhook do WhatsApp disponível em:                   `);
    console.log(` http://localhost:${PORT}/api/webhook/whatsapp         `);
    console.log(`=======================================================`);
  });
}

startServer();
