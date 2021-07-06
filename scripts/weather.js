const key = '7Jy86UjwYg0EnmMrZs2sWEFagrr6zRyn';

// weather information

const getWeather = async(id)=>{

    const base ='http://dataservice.accuweather.com/currentconditions/v1/';
    const query =`${id}?apikey=${key}`;

    const response = await fetch(base +query);
    const data = await response.json();

    return data[0];
};

// city information
const getCity = async(city) =>{

 const baseurl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
 const query =  `?apikey=${key}&q=${city}`;

 const response = await fetch(baseurl + query);
 const data = await response.json();

 return data[0];


};
