import React from 'react';


import BaseComponent from 'libs/components/BaseComponent';

import Purchasor from '../components/Purchasor/Purchasor';



class PurchaseContainer extends BaseComponent {
    render() {
        return (
           <Purchasor />
        );
    }
}

// Don't forget to actually use connect!
export default PurchaseContainer;
