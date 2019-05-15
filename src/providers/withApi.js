import React from 'react';
import { connect } from 'react-redux';
import { startLoading, stopLoading } from '../store/actions/global.actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Api } from '../services/ApiService';

const mapDispatchToProps = dispatch => bindActionCreators({
    startLoading,
    stopLoading,
}, dispatch);

const mapStateToProps = ({global:{loadingState}, session:{userCode}}) => ({
    loading : loadingState,
    userCode,
});

export const propTypes = {
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
};
/**
 * This Wrapper provides the functions to execute ajax requests.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
export default WrappedComponent => (connect(mapStateToProps, mapDispatchToProps)(
    class extends React.PureComponent {

        doPost(path, data={}) {
            return Api.doPost(path, data);
        }

        uploadFile(path, formData) {
            return Api.uploadFile(path, formData);
        }
    
        doGet(path) {
            return Api.doGet(path , data);
        }

        render() {
            return (
                <WrappedComponent 
                    {...this.props}
                    doPost = {  (p, d) => this.doPost(p, d)     }
                    doGet  = {  p => this.doGet(p)              }
                    upload = { (p, d) => this.uploadFile(p, d) }
                />
            )
        }
    }
));