import React from 'react';
import PropTypes from 'prop-types';
import { FullScreenModal } from '../../commons/modals';
import InterestsManager from './index';


/**
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class InterestsManagerModal extends React.PureComponent {
    render() {
        const {
            open,
            onClose,
        } = this.props;

        return (        
            <FullScreenModal 
                open    = { open    }
                onClose = { onClose }
                title   = { "Mis intereses" }
                disableScroll
            >
                <InterestsManager onClose = { onClose } />
            </FullScreenModal>
        );
    }
}

InterestsManagerModal.propTypes = {
    open : PropTypes.bool,
    onClose : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
};

export default InterestsManagerModal;