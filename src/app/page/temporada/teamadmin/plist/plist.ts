import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemporadaTeamadminPlist } from '../../../../component/temporada/teamadmin/plist/plist';

@Component({
  selector: 'app-temporada-teamadmin-plist-page',
  imports: [TemporadaTeamadminPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class TemporadaTeamadminPlistPage {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
