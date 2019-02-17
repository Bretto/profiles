import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {image, lorem, name, random} from 'faker';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../user/auth.service';
import {IProfile} from '../../../profiles/profile.model';
import * as _ from 'lodash';
import {DataGen} from '../../../fire/data-gen.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dataGen: DataGen,
              public auth: AuthService) {
  }

  ngOnInit() {
  }

  async onResetDB() {
    this.dataGen.resetDB();
  }

  onGoogleLogin() {
    this.auth.googleSignin().then(res => {
      this.router.navigate(['profile'], {relativeTo: this.activatedRoute});
    });
  }

}




