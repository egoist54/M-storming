export type Language = 'ko' | 'en' | 'ja' | 'es' | 'pt';

export const translations = {
  ko: {
    common: {
      start: '시작하기',
      next: '다음',
      retry: '다시 하기',
      otherQuizzes: '다른 퀴즈 보기',
      share: '결과 공유하기',
      visitors: '명이 방문했어요',
      participants: '명 참여',
      backToList: '목록으로',
      enterName: '테스트를 시작하기 전에 이름을 입력해주세요',
      namePlaceholder: '이름 입력',
      yourResult: '님의 결과는',
      koreanLifeMatch: '한국생활 적합성',
    },
    home: {
      title: '나를 알아가는',
      titleHighlight: '재미있는 테스트',
      subtitle: '성격 테스트부터 AI 추천까지, 다양한 퀴즈를 통해 나를 더 잘 알아가보세요!',
      badge: '재미있는 바이럴 퀴즈',
    },
    quiz: {
      question: '질문',
      of: '/',
    },
    result: {
      participants: '명이 이 테스트를 했어요!',
    },
    share: {
      kakao: '카카오톡',
      facebook: '페이스북',
      twitter: '트위터',
      copyLink: '링크 복사',
      copied: '링크 복사 완료!',
      copiedDesc: '친구들에게 공유해보세요 🎉',
    }
  },
  en: {
    common: {
      start: 'Start',
      next: 'Next',
      retry: 'Try Again',
      otherQuizzes: 'More Quizzes',
      share: 'Share Your Result',
      visitors: 'visitors',
      participants: 'participants',
      backToList: 'Back to List',
      enterName: 'Enter your name to start the quiz',
      namePlaceholder: 'Enter your name',
      yourResult: "'s Result",
      koreanLifeMatch: 'Korean Life Compatibility',
    },
    home: {
      title: 'Discover Yourself',
      titleHighlight: 'Fun Quizzes',
      subtitle: 'From personality tests to AI recommendations, explore yourself through various quizzes!',
      badge: 'Viral Quiz Platform',
    },
    quiz: {
      question: 'Question',
      of: 'of',
    },
    result: {
      participants: 'people took this quiz!',
    },
    share: {
      kakao: 'KakaoTalk',
      facebook: 'Facebook',
      twitter: 'Twitter',
      copyLink: 'Copy Link',
      copied: 'Link Copied!',
      copiedDesc: 'Share with your friends 🎉',
    }
  },
  ja: {
    common: {
      start: 'スタート',
      next: '次へ',
      retry: 'もう一度',
      otherQuizzes: '他のクイズ',
      share: '結果をシェア',
      visitors: '人が訪問',
      participants: '人参加',
      backToList: 'リストに戻る',
      enterName: 'テストを始める前に名前を入力してください',
      namePlaceholder: '名前を入力',
      yourResult: 'さんの結果は',
      koreanLifeMatch: '韓国生活適合性',
    },
    home: {
      title: '自分を知る',
      titleHighlight: '楽しいテスト',
      subtitle: '性格テストからAI推薦まで、様々なクイズで自分をもっと知ろう！',
      badge: 'バイラルクイズ',
    },
    quiz: {
      question: '質問',
      of: '/',
    },
    result: {
      participants: '人がこのテストを受けました！',
    },
    share: {
      kakao: 'カカオトーク',
      facebook: 'Facebook',
      twitter: 'Twitter',
      copyLink: 'リンクコピー',
      copied: 'リンクをコピーしました！',
      copiedDesc: '友達とシェアしよう 🎉',
    }
  },
  es: {
    common: {
      start: 'Comenzar',
      next: 'Siguiente',
      retry: 'Intentar de nuevo',
      otherQuizzes: 'Más Cuestionarios',
      share: 'Compartir Resultado',
      visitors: 'visitantes',
      participants: 'participantes',
      backToList: 'Volver a la lista',
      enterName: 'Ingresa tu nombre para comenzar el cuestionario',
      namePlaceholder: 'Ingresa tu nombre',
      yourResult: ': Tu resultado es',
      koreanLifeMatch: 'Compatibilidad con la vida coreana',
    },
    home: {
      title: 'Descúbrete',
      titleHighlight: 'Cuestionarios Divertidos',
      subtitle: '¡Desde tests de personalidad hasta recomendaciones de IA, explora tu ser a través de diversos cuestionarios!',
      badge: 'Plataforma de Quiz Viral',
    },
    quiz: {
      question: 'Pregunta',
      of: 'de',
    },
    result: {
      participants: 'personas hicieron este cuestionario!',
    },
    share: {
      kakao: 'KakaoTalk',
      facebook: 'Facebook',
      twitter: 'Twitter',
      copyLink: 'Copiar Enlace',
      copied: '¡Enlace Copiado!',
      copiedDesc: 'Comparte con tus amigos 🎉',
    }
  },
  pt: {
    common: {
      start: 'Começar',
      next: 'Próximo',
      retry: 'Tentar Novamente',
      otherQuizzes: 'Mais Quizzes',
      share: 'Compartilhar Resultado',
      visitors: 'visitantes',
      participants: 'participantes',
      backToList: 'Voltar à lista',
      enterName: 'Digite seu nome para começar o quiz',
      namePlaceholder: 'Digite seu nome',
      yourResult: ': Seu resultado é',
      koreanLifeMatch: 'Compatibilidade com a vida coreana',
    },
    home: {
      title: 'Descubra-se',
      titleHighlight: 'Quizzes Divertidos',
      subtitle: 'De testes de personalidade a recomendações de IA, explore-se através de vários quizzes!',
      badge: 'Plataforma de Quiz Viral',
    },
    quiz: {
      question: 'Pergunta',
      of: 'de',
    },
    result: {
      participants: 'pessoas fizeram este quiz!',
    },
    share: {
      kakao: 'KakaoTalk',
      facebook: 'Facebook',
      twitter: 'Twitter',
      copyLink: 'Copiar Link',
      copied: 'Link Copiado!',
      copiedDesc: 'Compartilhe com seus amigos 🎉',
    }
  }
};

export const languageNames: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  es: 'Español',
  pt: 'Português'
};
