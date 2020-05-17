import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import randomcolor from 'randomcolor';

const defaultSizes = [
  {
    label: 'mbp 15',
    width: 1375,
    height: 948,
    color: randomcolor({ hue: 'green', luminosity: 'light' }),
  },
  {
    label: 'xps 15',
    width: 1357,
    height: 906,
    color: randomcolor({ hue: 'blue', luminosity: 'light' }),
  },
  {
    label: 'xps 17',
    width: 1474,
    height: 976,
    color: randomcolor({ hue: 'red', luminosity: 'light' }),
  },
  {
    label: 'mbp 16',
    width: 1409,
    height: 968,
    color: randomcolor({ hue: 'yellow', luminosity: 'light' }),
  },
];
function App() {
  const [dimension, setDimensions] = useState({ width: 0, height: 0, label: '' });

  let laptops;
  // initialize localStorage
  try {
    let thing = localStorage.getItem('laptopSizes');
    if (!thing) {
      throw 'nope';
    }
    laptops = JSON.parse(thing);
    console.log('inner try', laptops);
  } catch (error) {
    console.error('catch', laptops);
    laptops = defaultSizes;
  }
  console.log('sizes top:', laptops);

  const [sizes, setSizes] = useState(laptops);
  return (
    <div className="App">
      <header>
        <h3>Add a laptop footprint</h3>
        <form className="form-inline" style={formStyle}>
          <div className="row">
            <div className="col">
              <label>label</label>
              <input
                type="text"
                onChange={(e) => {
                  setDimensions({ ...dimension, label: e.target.value });
                }}
                value={dimension.label}
              />
            </div>
            <div className="col">
              <label>width</label>
              <input
                type="text"
                onChange={(e) => {
                  setDimensions({ ...dimension, width: e.target.value });
                }}
                value={dimension.width}
              />
            </div>

            <div className="col">
              <label>height</label>
              <input
                type="text"
                onChange={(e) => {
                  setDimensions({ ...dimension, height: e.target.value });
                }}
                value={dimension.height}
              />
            </div>

            {/* <div className="col"> */}
            <a
              onClick={(e) => {
                e.preventDefault();
                setDimensions({ width: 0, height: 0, label: '' });
                let newSizes = sizes.concat({ ...dimension, color: randomcolor() });

                // save to localstorage
                localStorage.setItem('laptopSizes', JSON.stringify(newSizes));
                setSizes(newSizes);
              }}
              className="btn btn-primary"
              style={{ cursor: 'pointer', color: '#fff' }}
            >
              Add
            </a>
            {/* </div> */}
          </div>
        </form>
      </header>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            localStorage.setItem('laptopSizes', defaultSizes);
            setSizes(defaultSizes);
          }}
        >
          reset
        </button>
      </div>
      <legend style={{ textAlign: 'left' }}>
        <ul style={{ listStyle: 'none', width: '60%' }}>
          {console.log('sizes:', sizes)}
          {sizes.reverse().map((size, i) => {
            return (
              <li style={{ background: `${size.color}`, padding: '.5rem' }} key={i}>
                <label>hide</label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    let value = e.target.checked;
                    console.log(value);
                    size.hide = value;
                    console.log('hiding', size.label);
                    setSizes([...sizes]);
                  }}
                  value={size.visible}
                />
                {size.label} : {size.width / 100}" x {size.height / 100}"
              </li>
            );
          })}
        </ul>
      </legend>
      <div
        className="content"
        style={{ width: '1000px', margin: '10px auto', position: 'relative' }}
      >
        {sizes
          .sort((b, a) => {
            return a.height * a.width - b.height * b.width;
          })
          .map((size, i) => {
            let visibility = size.hide === true ? 'hidden' : 'visible';
            console.log('size:', size.hide, size.hide === true ? 'hidden' : 'visible');
            return (
              <div
                style={{
                  background: `${size.color}`,
                  width: `${size.width * 0.6}px`,
                  height: `${size.height * 0.6}px`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  visibility,
                }}
                key={i}
              ></div>
            );
          })}
      </div>
    </div>
  );
}

const formStyle = {
  marginBottom: '1rem',
};

export default App;
