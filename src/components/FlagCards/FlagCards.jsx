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

  console.log(countryData[249]);
  const sortCountries = countryData.sort((a, b) => {
    if (a.name.common > b.name.common) {
      return 1;
    }
    if (a.name.common < b.name.common) {
      return -1;
    }
    return 0;
  });

  const renderCountries = () => {
    return sortCountries.map((country, index) => (
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
  };

  return (
    <div>
      {renderCountries()}
    </div>
  );
};

export default CountryInfo;
