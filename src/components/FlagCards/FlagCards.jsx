import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './FlagCards.css';

const CountryInfo = ({ id }) => {
  const [countryData, setCountryData] = useState([]); // Изменено имя переменной для лучшей читаемости

  const getCountries = () => {
    fetch('https://restcountries.com/v3.1/all') // Исправленный URL API
    .then((response) => response.json()) // Правильное использование response.json()
    .then((data) => {
      setCountryData(data); // Сохраняем данные о странах
     })
    .catch(error => console.error('Ошибка при получении данных:', error));
  };

  useEffect(() => {
    getCountries();
  }, [id]); // Указываем зависимости для useEffect

  console.log(countryData);
  const sortCountries = countryData.sort((a, b) => {
    if (a.name.common > b.name.common) {
      return 1;
    }
    if (a.name.common < b.name.common) {
      return -1;
    }
    return 0;
  });

  const [value, setValue] = useState('');

  const filteredCountries = countryData.filter((country) => {
    return country.name.common.toLowerCase().includes(value.toLowerCase());
});


  const renderCountries = () => {
    if (filteredCountries.length === 0) {
      return(
        <h1>No Countries Found</h1>
      ) 
    }
    else{
      return filteredCountries.map((country, index) => (
        <div key={index} className="card-countries">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={country.flags.svg} className="card-img-top"/>
          <Card.Body>
            <Card.Title>{country.name.common}</Card.Title>
            <Card.Text>
              Population: {country.population}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
      ));
    }
  };

  const [mode, setMode] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme === 'dark'? true : false;
  });

  useEffect(() => {
    document.body.style.backgroundColor = mode? 'black' : 'white';
    localStorage.setItem('theme', mode? 'dark' : 'light');
  }, [mode]);

  function darkMode() {
    setMode(prevMode =>!prevMode);
  }

  return (
    <div>
      <div className="form">
        <form className='search-form'>
        <div className="search">
          <input type="text" className="search__input" placeholder="Search Country" onChange={(e) => setValue(e.target.value)}/>
            <button className="dark-mode" type="button" onClick={darkMode}>Dark Mode</button>
        </div>
        </form>
      </div>
      <div className="countries">
        {renderCountries()} 
      </div>
    </div>
  );
};

export default CountryInfo;
