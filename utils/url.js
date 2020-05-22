


const API_KEY = 'AIzaSyBec195_3M-GvCsL83hXSwQpaDmQruO3HU';
const RESTURANTS = 'resturants';


class Url{
    constructor(){
        this.url={};
    }
    setApiKey(apiKey=API_KEY){
        this.url.apiKey=apiKey;
        return this;
    }
    setCategory(category=RESTURANTS){
        this.category=category;
        return this;
    }
    setSearchText(searchText){
        this.searchText=searchText;
        return this;
    }
    setCountry(country){
        this.country=country;
        return this;
    }
    setCity(city){
        this.city=city;
        return this;
    }
    build(){
        let urlQueries=Object.keys(this.user);
        
        url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${RESTURANTS}&key=${API_KEY}`;

    }
}

