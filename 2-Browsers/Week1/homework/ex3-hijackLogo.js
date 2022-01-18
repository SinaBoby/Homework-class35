'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-3-the-logo-hijack

1. Find out how to select the element that contains the Google logo, and store 
   it in a variable.
2. Modify the `src` and `srcset` of the logo so that it's replaced by the 
   HackYourFuture logo instead.
------------------------------------------------------------------------------*/
function hijackGoogleLogo() {
 
  const image = document.querySelector('.lnXdpd');
  
  image.srcset =
    'https://camo.githubusercontent.com/091736219071224a2d4e781bfe8e09256b70f46bbb5207fd9de01ccaf65a5c88/68747470733a2f2f7777772e6861636b796f75726675747572652e646b2f7374617469632f6c6f676f2d6461726b2e737667';
  image.src =
  'https://camo.githubusercontent.com/091736219071224a2d4e781bfe8e09256b70f46bbb5207fd9de01ccaf65a5c88/68747470733a2f2f7777772e6861636b796f75726675747572652e646b2f7374617469632f6c6f676f2d6461726b2e737667';
}

hijackGoogleLogo();
