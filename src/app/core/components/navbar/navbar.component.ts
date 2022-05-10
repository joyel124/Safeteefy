import {Component, EventEmitter, OnInit} from '@angular/core';
import {GuardiansService} from "../../../emergencies/guardians/services/guardians.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private guardiansService: GuardiansService) { }
  public guardianCurrent:any;
  ngOnInit(): void {
    this.guardiansService.SetCurrent.subscribe(data=>{
      console.log('Set current', data);
      this.guardianCurrent=data;
    })
  }

}
