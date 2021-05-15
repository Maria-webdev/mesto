const presets = [
    ['@babel/env', 
    "stage-3", { // какой пресет использовать
      targets: { // какие версии браузеров поддерживать
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1'
      },
  
      // использовать полифиллы для браузеров из свойства target
      // по умолчанию babel использует поллифиллы библиотеки core-js
      useBuiltIns: "entry"
    }]
  ];
  
  module.exports = { presets }; 

  {
    presets: [
        "@babel/preset-env",
        "stage-3"
    ]
}