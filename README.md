# D&D Spellbook

## Overview

DnD Spell Book is a reference site for Dungeons and Dragons fifth edition, giving users quick and easy access to the rules for spells. It draws data from the Open 5e API, and uses the Google Image API to match the spell titles with appropriate images.

To visit the site, please click [here](https://fearchar.github.io/ga-project-2-react-api/#/)

![Dnd Spell Book](https://i.imgur.com/02MdLXr.png)

## The Project Brief

Over the course of two days, pair programme a site using React which draws data from at least one API.

## Technologies Used

* JavaScript
* React
* Bulma

### Approaches and Features

### Spell Index

The Open 5e API sends data in a series of pages. In order to gather all spells when the user reaches the index page, we created a recursive function which uses the API response’s ‘next’ property to make multiple calls for data.

*getSpells Method*
```JavaScript
getSpells() {
  function makeRequest(url, spells=[]) {
    return axios.get(url)
      .then(res => {
        if(res.data.next) return makeRequest(res.data.next, spells.concat(res.data.results))
        return spells.concat(res.data.results)
      })
  }
```

Users are then able to filter spells by the character classes, schools of magic, spell level and names of the spells. We used the character classes to colour the spell cards which appear on screen and generate icons in the spell cards top right corner.

When the user clicks these icons they get details about the classes associated with them. This is displayed through a modal which overlays the page. This is also true for the schools of magic which appear in the spells details.

Retrieving Google Images

One downside of the Open 5e API for us was that it didn’t have any images to go with the spells. To remedy this, we used the Google Images API in combination with Open 5e API to search for images using the spell names as the search term, adding the word ‘illustration’ to the search get more relevant images.

*getImage Method*
```JavaScript
getImage() {
  console.log(process.env.GOOGLE_API_KEY)
  const client = new GoogleImages('004991023930242296851:9-esw8ey0xs', process.env.GOOGLE_API_KEY)
  client.search(`illustration ${this.state.spell.name}`)
    .then(images => this.setState({ img: images[0].url }))
    // .catch(err => console.log(err))
}
```
## Challenges

Working with the Google Image Search API was one of the more challenging parts of this project. We found the documentation hard to understand and getting it working required two keys and a complicated registration process.

## Future Features

The Open 5E API has a lot more Dungeons and Dragons reference data which could be used to improve our site, and more work could be done to the look and feel of our site to improve user experience. If I were to spend more time on the site, I would make the following changes:

* Add a nav bar
* Make similar index pages for monster and equipment reference materials
* Add a page for dice rolling, a key feature of playing Dungeons and Dragons
