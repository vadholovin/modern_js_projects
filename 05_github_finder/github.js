class GitHub {
  constructor() {
    this.client_id = '9b9f7fdda99af83c583a';
    this.client_secret = '629ecfc9fbea26029da31d1a0cdac9b55c14fa75';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();

    return {
      profile
    };
  }
}