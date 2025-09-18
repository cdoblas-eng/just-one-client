import {IonButton, IonContent, IonModal, IonInput, IonLoading} from '@ionic/angular/standalone';
import {Component, ViewChild, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {AppHeaderComponent} from "../../components/app-header/app-header.component";
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MenuOption} from './menu-options.enum';
import {TranslationService} from './translation.service';
import {TranslatePipe} from './translate.pipe';
import { LoadingController } from '@ionic/angular';
import { GameService } from '../../services/game.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-principalMenu',
  templateUrl: 'principalMenu.component.html',
  styleUrls: ['principalMenu.component.scss'],
  imports: [
    IonContent,
    IonButton,
    IonModal,
    IonInput,
    NgForOf,
    FormsModule,
    AppHeaderComponent,
    TranslatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class principalMenu {
  private translationService = inject(TranslationService);
  private gameService = inject(GameService);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);


  @ViewChild(IonModal) modal!: IonModal;
  username: string = "";
  joinUsername: string = "";
  gameId: string = '';
  isCreateGameModalOpen = false;
  isJoinGameModalOpen = false;

  options: MenuOption[] = [
    MenuOption.CREATE_GAME,
    MenuOption.JOIN_GAME,
    MenuOption.OPTIONS,
    MenuOption.SUGGESTIONS
  ];


  constructor() {}


  onOptionClick(option: MenuOption) {
    if (option === MenuOption.CREATE_GAME) {
      this.isCreateGameModalOpen = true;
    } else if (option === MenuOption.JOIN_GAME) {
      this.isJoinGameModalOpen = true;
    }
  }

  onCreateModalDismiss() {
    this.username = '';
    this.isCreateGameModalOpen = false;
  }

  onJoinModalDismiss() {
    this.joinUsername = '';
    this.gameId = '';
    this.isJoinGameModalOpen = false;
  }

  closeCreateGameModal() {
    this.username = '';
    this.isCreateGameModalOpen = false;
  }

  closeJoinGameModal() {
    this.joinUsername = '';
    this.gameId = '';
    this.isJoinGameModalOpen = false;
  }

  async onCreateGame(form: any) {
    if (!form.valid) {
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Creando partida...',
      spinner: 'circles',
    });
    await loading.present();

    this.gameService.createGame(this.username).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe({
      next: (response) => {
        console.log('Partida creada:', response);
        this.closeCreateGameModal();
        // TODO: Navegar a la pantalla de la partida con el ID response.gameId
      },
      error: (err) => {
        console.error('Error al crear la partida:', err);
        // TODO: Mostrar un toast o alerta de error al usuario
      }
    });
  }

  onJoinGame(form: any) {
    if (form.valid) {
      const joinData = {
        username: this.joinUsername,
        gameId: this.gameId
      };

      // TODO: Implement join game logic
      console.log('Joining game with data:', joinData);
      this.closeJoinGameModal();
    }
  }

  async createGame() {
    if (!this.username) return;

    const loading = await this.loadingCtrl.create({
      message: 'Creating game...',
    });
    await loading.present();

    this.gameService.createGame(this.username).pipe(
      finalize(() => loading.dismiss())
    ).subscribe({
      next: (response) => {
        console.log('Game created:', response);
        this.modal.dismiss();
        // Navigate to waiting room
        this.router.navigate(['/waiting-room']);
      },
      error: (err) => {
        console.error('Error creating game:', err);
        // Show error to user
      }
    });
  }

  async joinGame() {
    if (!this.joinUsername || !this.gameId) return;

    const loading = await this.loadingCtrl.create({
      message: 'Joining game...',
    });
    await loading.present();

    this.gameService.joinGame(this.gameId, this.joinUsername).pipe(
      finalize(() => loading.dismiss())
    ).subscribe({
      next: (response) => {
        console.log('Joined game:', response);
        this.modal.dismiss();
        // Navigate to waiting room
        this.router.navigate(['/waiting-room']);
      },
      error: (err) => {
        console.error('Error joining game:', err);
        // Show error to user
      }
    });
  }
}
