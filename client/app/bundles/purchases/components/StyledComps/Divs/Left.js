import styled from 'styled-components';
/* eslint-disable */
const Left = styled.div`
    
    padding: ${(props) => props.noPadding ? '0px' : '30px'};
    flex:${(props) => props.half ? '0.5' : '' };
    flex:${(props) => props.quarter ? '0.25' : '' };
    flex:${(props) => props.three ? '0.75' : '' };
    flex:${(props) => props.six ? '0.60' : '' };
    flex:${(props) => props.four ? '0.40' : '' };
    flex:${(props) => props.third ? '0.30' : '' };
    flex: ${(props) => props.full ? '1' : ''};
    flex: ${(props) => props.flex };
    align-items: center;
    flex-direction: row;
    justify-content: center;
    order: 1;
    
    height: ${(props) => props.height };
    margin: ${(props) => props.center ? '0 auto' : '2px' };
    margin: ${(props) => props.margin };
    box-shadow: ${(props) => props.paper ? '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)' : null};
    background: ${(props) => props.paper ? '#FFF' : null };

    
    @media screen and (min-width: 300px) and (max-width: 600px) {
      padding: 5px 15px 5px 15px;
      ${(props) => props.mobile } !important;
    }
    `;

export default Left;
