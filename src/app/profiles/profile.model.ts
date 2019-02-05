export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  pic: { source: string, thumb: string };
  deleted: boolean;
}

export function newProfile(profile) {
  const {id = 'missing id', firstName = 'first name', lastName = 'last name', bio = 'bio', pic = 'assets/images/default.jpg', deleted = false} = profile;
  return {id, firstName, lastName, bio, pic, deleted};
}
