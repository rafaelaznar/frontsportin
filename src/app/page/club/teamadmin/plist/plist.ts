import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubTeamadminPlist } from '../../../../component/club/teamadmin/plist/plist';

@Component({
  selector: 'app-club-teamadmin-plist-page',
  imports: [ClubTeamadminPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class ClubPlistTeamadminPage {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
