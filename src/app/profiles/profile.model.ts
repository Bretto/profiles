export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  pic: { source: string, thumb: string };
  deleted: boolean;
  fullName: Function;
}


export function newProfile(data) {
  return new Profile(data);
}


export class Profile implements IProfile {

  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  pic: { source: string, thumb: string };
  deleted: boolean;

  constructor(data) {

    const {
      id = 'missing id',
      firstName = 'first name',
      lastName = 'last name',
      bio = 'bio',
      pic = {source: 'assets/images/default.jpg', thumb: 'assets/images/default.jpg'},
      deleted = false,
    } = data;

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.bio = bio;
    this.pic = pic;
    this.deleted = deleted;
  }

  fullName() {
    return `${this.firstName}  ${this.lastName}`;
  }

}






