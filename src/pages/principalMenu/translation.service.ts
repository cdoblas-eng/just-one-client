import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: { [key: string]: string } } = {
    'es': {
      'CREATE_GAME': 'Crear partida',
      'JOIN_GAME': 'Unirse a partida',
      'OPTIONS': 'Opciones',
      'SUGGESTIONS': 'Sugerencias',
      'USERNAME': 'Nombre de usuario',
      'GAME_ID': 'Identificador de partida',
    },
    'en': {
      'CREATE_GAME': 'Create Game',
      'JOIN_GAME': 'Join Game',
      'OPTIONS': 'Options',
      'SUGGESTIONS': 'Suggestions',
      'USERNAME': 'Username',
      'GAME_ID': 'Game ID',
    }
  };

  private currentLanguage: string = 'es'; // Por defecto español

  constructor() {
  }

  translate(key: string): string {
    return this.translations[this.currentLanguage][key] || key;
  }

  setLanguage(language: string): void {
    if (this.translations[language]) {
      this.currentLanguage = language;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}
