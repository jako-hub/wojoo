import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
} from 'react-native';
import { View } from 'native-base';
import PrettyButton from './PrettyButton';
import defaultImage from '../../assets/images/default-clan-image.png';
import PickerPlugin from 'react-native-image-crop-picker';
import { SimpleTouch } from '../touchables';

const ImagePreview = ({imgSrc, transparent, onPress}) => (
    <View style = { [
        styles.imagePreviewWrapper,
        (transparent? styles.transparent : null ),
    ] }>
        <SimpleTouch onPress = { onPress } wrapType = "stretch">
            <Image style = { styles.imagePreview } source = { imgSrc } />
        </SimpleTouch>
    </View>
);

/**
 * This component allows to select and cropt an image.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class ImagePicker extends React.PureComponent {
    
    onSelectImage() {    
        PickerPlugin.openPicker({
            width   : 500,
            height  : 500,
            cropping: true
        }).then(({mime:type, path:uri}) => {
            if(this.props.onSelectImage) {
                this.props.onSelectImage({
                        type, uri,
                });
            }
        });
    }

    onClearImage() {
        if(this.props.onSelectImage) {
            this.props.onSelectImage(null);
        }
    }

    render() {
        const {imgSrc} = this.props;
        const withImage = Boolean(imgSrc);
        return (
            <View style = { styles.root }>
                <View style = { styles.wrapper }>
                    <ImagePreview 
                        transparent = { !withImage } 
                        imgSrc      = { imgSrc? {uri : imgSrc} : defaultImage } 
                        onPress     = { () => this.onSelectImage() }
                    />
                    <View style = { styles.buttonsWrapper}>
                        <PrettyButton 
                            onPress = { () => this.onSelectImage() }
                            primary
                            small
                        >
                            Seleccionar imagen
                        </PrettyButton>
                        {withImage && (
                            <PrettyButton 
                                onPress = { () => this.onClearImage() }
                                style   = {styles.buttonWrapper}
                                small
                            >
                                Remover
                            </PrettyButton>
                        )}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flexDirection   : "row",
        justifyContent  : "center",
        marginBottom    : 10,
    },
    buttonWrapper : {
        alignSelf : "center",
    },
    imagePreviewWrapper : {
        borderRadius    : 150,
        backgroundColor : "#e0e0e0",
        alignSelf       : "center",
        padding         : 5,
        marginBottom    : 10,
    },
    imagePreview : {
        width           : 70,
        height          : 70,
        borderRadius    : 150,        
    },
    buttonsWrapper : {
        flexDirection : "column",
        justifyContent     : "center",
    },
    transparent : {
        opacity         : 0.4,
    },
});

ImagePicker.propTypes = {
    onSelectImage   : PropTypes.func,
    imgSrc          : PropTypes.string,
};

export default ImagePicker;