window.addEventListener('load', ()=>{
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')

    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion = document.getElementById('ubicacion')

    let iconoAnimado = document.getElementById('icono-animado')

    let vientoVelocidad = document.getElementById('viento-velocidad')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion => {
            // console.log(posicion.coords.latitude)
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c27c1e7519d86553d463c93fa96758fe&lang=es`

            // console.log(url)

            fetch(url)
            .then( response => {return response.json() })
            .then( data => {
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} °C`
                let desc =  data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                let nom = data.name
                ubicacion.textContent = nom.toUpperCase()
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                
                //Iconos estáticos

                // let icon = data.weather[0].icon
                // const  urlIcon = `http://openweathermap.org/img/wn/${icon}.png`
                // console.log(urlIcon)

                //Iconos Animados

                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('DEFECTO');
                  }
            })
            .catch( error => {
                console.log(error)
            })
        })
    }
})