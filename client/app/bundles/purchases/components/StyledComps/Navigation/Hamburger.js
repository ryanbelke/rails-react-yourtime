import styled from 'styled-components';

const Hamburger = styled.div`
    position: fixed;
    top: -5px;
    left: -10px;
    width: 50px;
    height: 50px;
    z-index: 4;
    
    @media screen and (min-width: 300px) and (max-width: 749px) {
       display: flex;
    }
    @media screen and (min-width: 750px) {
      display: none;
     
     }
      
    
    `;

export default Hamburger;
