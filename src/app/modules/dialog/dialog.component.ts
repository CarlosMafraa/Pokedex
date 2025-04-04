import {Component, input, InputSignal} from '@angular/core';
import {PokemonDetails} from '../../shared/interface/pokemon-details';
import {NgClass, TitleCasePipe} from '@angular/common';
import {ProgressBar} from 'primeng/progressbar';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgClass,
    ProgressBar,
    TabPanel,
    TabPanels,
    Tabs,
    TabList,
    Tab
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  public pokemon: InputSignal<PokemonDetails> = input.required()
  public statColors: string[]= statColors

}

export const statColors: string[] = [
  'red',
  'orange',
  'yellow',
  'blue',
  'green',
  'purple',
  'gray',
  'pink',

];
