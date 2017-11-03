import styled from 'styled-components';

const NavBar = styled.div ` 
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    display: -webkit-flex;
    display: flex;
    z-index: 3;
    
    background: ${(props) => props.background };
    height: 60px;
    ul li {
      list-style: none;
      float: left;
    }
     
     @media screen and (min-width: 300px) and (max-width: 749px) {
      position: fixed;
      >span { 
        position: fixed;
        right: 10px;
        top: 10px;
      }

      ul {
        display: none;
       }
       
     }
     

    @media screen and (min-width: 750px) {
      -webkit-flex-direction: row;
       flex-direction: row;
      div {
        position: absolute;
        right: 20px;
      }
      >span { display: none;}
    }
    
`;

export default NavBar;
