import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import randomcolor from 'randomcolor';
import classnames from 'classnames';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-82283734-7');
ReactGA.pageview(window.location.pathname + window.location.search);

const defaultSizes = [
  {
    label: 'old xps 15',
    width: 1406,
    height: 970,
    color: '#1ef787',
  },
  {
    label: 'mbp 15',
    width: 1375,
    height: 948,
    color: '#eff229',
  },
  {
    label: 'xps 15',
    width: 1357,
    height: 906,
    color: '#1e82e6',
  },
  {
    label: 'xps 17',
    width: 1474,
    height: 976,
    color: '#ae20f5',
  },
  {
    label: 'mbp 16',
    width: 1409,
    height: 968,
    color: '#e368e1',
  },
  {
    label: 'ms surface 3 15',
    width: '1350',
    height: '987',
    color: '#fc727b',
  },
  {
    width: 1160,
    height: 780,
    label: 'xps 13',
    color: '#ff692e',
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
  } catch (error) {
    laptops = defaultSizes;
  }

  const [sizes, setSizes] = useState(laptops);
  return (
    <div className="App" style={{ paddingBottom: '20px' }}>
      <header style={{ background: '#efefef', border: '1px solid grey', marginTop: '10px' }}>
        <h3>Add a laptop footprint to compare (inches)</h3>
        <div className="row">
          <form className="form-inline" style={formStyle}>
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

            <div className="col">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setDimensions({ width: 0, height: 0, label: '' });
                  let dimensionAdjusted = {
                    ...dimension,
                    width: dimension.width * 100,
                    height: dimension.height * 100,
                    color: randomcolor(),
                  };
                  let newSizes = sizes.concat(dimensionAdjusted);

                  // save to localstorage
                  localStorage.setItem('laptopSizes', JSON.stringify(newSizes));
                  setSizes(newSizes);
                }}
                className="btn btn-primary"
                style={{ cursor: 'pointer', color: '#fff' }}
              >
                Add
              </a>
            </div>
          </form>
        </div>
      </header>
      <div className="row">
        <div className="col-2" style={{ textAlign: 'left', marginTop: '8px' }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.setItem('laptopSizes', defaultSizes);
              setSizes(defaultSizes);
            }}
          >
            reset defaults
          </button>
        </div>
        <div className="col" style={{ height: '125px', overflow: 'auto' }}>
          <legend style={{ textAlign: 'left' }}>
            <ul style={{ listStyle: 'none', width: '60%' }}>
              {sizes.reverse().map((size, i) => {
                return (
                  <li
                    style={{
                      padding: '.5rem',
                      cursor: 'pointer',
                      lineHeight: '.9rem',
                    }}
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      size.hide = !size.hide;
                      setSizes([...sizes]);
                    }}
                    className={classnames({ hidden: size.hide })}
                    title="click to show/hide"
                  >
                    <span
                      className="legendIndicator"
                      style={{
                        background: size.color,
                        width: '14px',
                        height: '10px',
                        display: 'inline-block',
                        marginRight: '4px',
                      }}
                    ></span>
                    {size.label}: {size.width / 100}"x{size.height / 100}"
                  </li>
                );
              })}
            </ul>
          </legend>
        </div>
      </div>
      <div className="row"></div>
      <div className="row" style={{ margin: '10px auto' }}>
        <div className="content col" style={{ width: '1000px', position: 'relative' }}>
          {sizes
            .sort((b, a) => {
              return a.height * a.width - b.height * b.width;
            })
            .map((size, i) => {
              let visibility = size.hide === true ? 'hidden' : 'visible';
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
      <footer style={{ marginTop: '10px' }}></footer>
    </div>
  );
}

const formStyle = {
  marginBottom: '1rem',
};

export default App;
