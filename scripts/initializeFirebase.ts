/**
 * Script para inicializar dados no Firebase
 * Execute: npx ts-node scripts/initializeFirebase.ts
 */

import { initializeApp } from 'firebase/app';
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3kMpLDXwv40bxEZuZhOz4tj0_2HO-W3w",
  authDomain: "heritagehunte.firebaseapp.com",
  projectId: "heritagehunte",
  storageBucket: "heritagehunte.firebasestorage.app",
  messagingSenderId: "685069061756",
  appId: "1:685069061756:web:3a3c9247036c0b0a7283f9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Dados dos Monumentos
 */
const monuments = [
  {
    id: "palacio-do-povo",
    name: "Palácio do Povo",
    description: "Antigo palácio do governo colonial, construído em 1874, hoje serve como centro cultural e um dos símbolos mais importantes da história de Cabo Verde.",
    points: 50,
    latitude: 16.8909,
    longitude: -24.9878,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    qrCode: "PALACIO_POVO_CV",
    category: "Histórico",
  },
  {
    id: "farol-dona-amelia",
    name: "Farol de D. Amélia",
    description: "Farol histórico construído em 1886, oferece uma vista panorâmica deslumbrante da cidade e do porto de Mindelo.",
    points: 40,
    latitude: 16.8925,
    longitude: -24.9892,
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=300&fit=crop",
    qrCode: "FAROL_DONA_AMELIA_CV",
    category: "Histórico",
  },
  {
    id: "mercado-municipal",
    name: "Mercado Municipal",
    description: "Centro de comércio tradicional com arquitetura única, onde se encontra desde frutas tropicais até artesanato local.",
    points: 30,
    latitude: 16.8883,
    longitude: -24.9847,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    qrCode: "MERCADO_MUNICIPAL_CV",
    category: "Cultural",
  },
  {
    id: "igreja-nossa-senhora-luz",
    name: "Igreja Nossa Senhora da Luz",
    description: "Igreja histórica no centro da cidade, construída no século XIX, com fachada em estilo colonial português.",
    points: 45,
    latitude: 16.8912,
    longitude: -24.9865,
    imageUrl: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=400&h=300&fit=crop",
    qrCode: "IGREJA_NSA_LUZ_CV",
    category: "Religioso",
  },
  {
    id: "torre-belem",
    name: "Torre de Belém (Réplica)",
    description: "Pequena réplica do famoso monumento de Lisboa, símbolo da ligação histórica entre Cabo Verde e Portugal.",
    points: 35,
    latitude: 16.8931,
    longitude: -24.9883,
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
    qrCode: "TORRE_BELEM_CV",
    category: "Histórico",
  },
  {
    id: "edificio-alfandega",
    name: "Edifício da Alfândega",
    description: "Antigo edifício da alfândega com arquitetura colonial, testemunha do importante passado comercial de Mindelo.",
    points: 30,
    latitude: 16.8876,
    longitude: -24.9859,
    imageUrl: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop",
    qrCode: "ALFANDEGA_CV",
    category: "Histórico",
  },
  {
    id: "casa-da-morna",
    name: "Casa da Morna",
    description: "Museu dedicado à morna, música tradicional de Cabo Verde, onde se homenageia Cesária Évora e outros artistas.",
    points: 40,
    latitude: 16.8902,
    longitude: -24.9871,
    imageUrl: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=400&h=300&fit=crop",
    qrCode: "CASA_MORNA_CV",
    category: "Cultural",
  },
  {
    id: "praca-nova",
    name: "Praça Nova",
    description: "Principal praça da cidade com coreto histórico, local de encontro e eventos culturais ao ar livre.",
    points: 25,
    latitude: 16.8895,
    longitude: -24.9868,
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    qrCode: "PRACA_NOVA_CV",
    category: "Cultural",
  },
  {
    id: "centro-artesanato",
    name: "Centro Nacional de Artesanato",
    description: "Exposição do melhor artesanato cabo-verdiano, desde cerâmica a tecidos coloridos com técnicas tradicionais.",
    points: 35,
    latitude: 16.8928,
    longitude: -24.9886,
    imageUrl: "https://images.unsplash.com/photo-1582126942730-9f6a9a170d6e?w=400&h=300&fit=crop",
    qrCode: "ARTESANATO_CV",
    category: "Cultural",
  },
  {
    id: "casa-da-cultura",
    name: "Casa da Cultura",
    description: "Importante centro cultural de Mindelo que promove exposições, concertos e eventos literários durante todo o ano.",
    points: 40,
    latitude: 16.8918,
    longitude: -24.9874,
    imageUrl: "https://images.unsplash.com/photo-1577985043696-d4f608968c1c?w=400&h=300&fit=crop",
    qrCode: "CASA_CULTURA_CV",
    category: "Cultural",
  },
  {
    id: "porto-mindelo",
    name: "Porto de Mindelo",
    description: "Porto histórico que foi crucial para o desenvolvimento da cidade, ponto de parada de navios transatlânticos no século XIX.",
    points: 50,
    latitude: 16.8867,
    longitude: -24.9839,
    imageUrl: "https://images.unsplash.com/photo-1568341900810-6e0f7aae3f02?w=400&h=300&fit=crop",
    qrCode: "PORTO_MINDELO_CV",
    category: "Histórico",
  },
  {
    id: "fortim-el-rei",
    name: "Fortim d'El Rei",
    description: "Antigo forte que protegia a baía de Mindelo, construído no século XVIII, hoje oferece vistas espetaculares do oceano.",
    points: 45,
    latitude: 16.8942,
    longitude: -24.9895,
    imageUrl: "https://images.unsplash.com/photo-1518757964243-4c63e3e53f75?w=400&h=300&fit=crop",
    qrCode: "FORTIM_EL_REI_CV",
    category: "Histórico",
  },
];

/**
 * Dados dos Badges
 */
const badges = [
  {
    id: "explorador-iniciante",
    name: "Explorador Iniciante",
    description: "Descobriu 3 monumentos!",
    threshold: 3,
    type: "count",
    icon: "compass",
    color: "#F59E0B",
    message: "Você está no caminho certo! 🌟",
  },
  {
    id: "descobridor-ativo",
    name: "Descobridor Ativo",
    description: "Descobriu 6 monumentos!",
    threshold: 6,
    type: "count",
    icon: "map",
    color: "#3B82F6",
    message: "Você está conhecendo bem Mindelo! 🗺️",
  },
  {
    id: "aventureiro-experiente",
    name: "Aventureiro Experiente",
    description: "Descobriu 9 monumentos!",
    threshold: 9,
    type: "count",
    icon: "navigate",
    color: "#8B5CF6",
    message: "Você conhece muito de Mindelo! 🧭",
  },
  {
    id: "guardiao-patrimonio",
    name: "Guardião do Patrimônio",
    description: "Descobriu todos os 12 monumentos!",
    threshold: 12,
    type: "count",
    icon: "trophy",
    color: "#EF4444",
    message: "Parabéns! Você completou sua jornada! 🏆",
  },
  {
    id: "colecionador-100",
    name: "Colecionador de 100",
    description: "Conseguiu 100 pontos!",
    threshold: 100,
    type: "points",
    icon: "star",
    color: "#10B981",
    message: "Cem pontos! Você é dedicado! ⭐",
  },
  {
    id: "mestre-200",
    name: "Mestre dos 200",
    description: "Conseguiu 200 pontos!",
    threshold: 200,
    type: "points",
    icon: "star-half",
    color: "#F59E0B",
    message: "Duzentos pontos! Incrível! 🌟",
  },
  {
    id: "lenda-300",
    name: "Lenda dos 300",
    description: "Conseguiu 300 pontos ou mais!",
    threshold: 300,
    type: "points",
    icon: "sparkles",
    color: "#EC4899",
    message: "Você é uma lenda viva de Mindelo! ✨",
  },
];

/**
 * Função principal
 */
async function initializeData() {
  try {
    console.log('🔥 Iniciando população do Firebase...\n');

    // Adiciona monumentos
    console.log('📍 Adicionando monumentos...');
    for (const monument of monuments) {
      const monumentRef = doc(db, 'monuments', monument.id);
      await setDoc(monumentRef, {
        ...monument,
        createdAt: serverTimestamp(),
      });
      console.log(`✅ ${monument.name}`);
    }

    console.log('\n🏆 Adicionando badges...');
    // Adiciona badges
    for (const badge of badges) {
      const badgeRef = doc(db, 'badges', badge.id);
      await setDoc(badgeRef, {
        ...badge,
        createdAt: serverTimestamp(),
      });
      console.log(`✅ ${badge.name}`);
    }

    console.log('\n✨ Dados inicializados com sucesso!');
    console.log(`📊 Total: ${monuments.length} monumentos e ${badges.length} badges`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inicializar dados:', error);
    process.exit(1);
  }
}

// Executa
initializeData();